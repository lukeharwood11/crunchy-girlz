import jwt
from datetime import datetime, timezone
from typing import Optional, Dict, Any
from fastapi import HTTPException, status, Depends, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from .database import get_supabase_admin_client
from .config import config

import logging

log = logging.getLogger(__name__)

class DebugHTTPBearer(HTTPBearer):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        
    async def __call__(self, request: Request) -> HTTPAuthorizationCredentials:
        log.info("=== HTTPBearer.__call__ invoked ===")
        try:
            result = await super().__call__(request)
            log.info(f"HTTPBearer success, got credentials: {result}")
            return result
        except Exception as e:
            log.error(f"HTTPBearer failed: {str(e)}")
            log.error(f"HTTPBearer exception type: {type(e)}")
            print(f"DEBUG: HTTPBearer failed: {str(e)}")
            raise


async def verify_jwt(
    request: Request,
    credentials: HTTPAuthorizationCredentials = Depends(HTTPBearer()),
) -> Dict[str, Any]:
    """
    Verify JWT token using Supabase and cache user data in request state
    """
    try:
        token = credentials.credentials
        cache_key = f"user_data_{token[:20]}"
        if hasattr(request.state, cache_key):
            return getattr(request.state, cache_key)

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

        user_data = {
            "user_id": response.user.id,
            "email": response.user.email,
            "user": response.user,
        }
        
        # Cache the user data in request state
        setattr(request.state, cache_key, user_data)
        
        return user_data

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
    request: Request,
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
        return await verify_jwt(request, credentials)
    except HTTPException:
        return None
