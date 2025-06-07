import jwt
from datetime import datetime, timezone
from typing import Optional, Dict, Any
from fastapi import HTTPException, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from .database import get_supabase_admin_client
from .config import config

security = HTTPBearer()


async def verify_jwt(
    credentials: HTTPAuthorizationCredentials = Depends(security),
) -> Dict[str, Any]:
    """
    Verify JWT token using Supabase
    """
    try:
        token = credentials.credentials

        # Use Supabase admin client to verify the token
        supabase = get_supabase_admin_client()

        # Verify the JWT token
        response = supabase.auth.get_user(token)

        if not response.user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication token",
                headers={"WWW-Authenticate": "Bearer"},
            )

        return {
            "user_id": response.user.id,
            "email": response.user.email,
            "user": response.user,
        }

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication token",
            headers={"WWW-Authenticate": "Bearer"},
        )


async def get_current_user(
    auth_data: Dict[str, Any] = Depends(verify_jwt),
) -> Dict[str, Any]:
    """
    Get current authenticated user
    """
    return auth_data


async def get_current_user_id(auth_data: Dict[str, Any] = Depends(verify_jwt)) -> str:
    """
    Get current authenticated user ID
    """
    return auth_data["user_id"]


# Optional auth dependency (for endpoints that can work with or without auth)
async def get_optional_user(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(
        HTTPBearer(auto_error=False)
    ),
) -> Optional[Dict[str, Any]]:
    """
    Get current user if authenticated, None otherwise
    """
    if not credentials:
        return None

    try:
        return await verify_jwt(credentials)
    except HTTPException:
        return None
