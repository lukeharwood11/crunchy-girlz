from fastapi import FastAPI, APIRouter, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.models import OAuthFlows as OAuthFlowsModel
from fastapi.security import HTTPBearer
from .routers.v1 import v1_router
import api.settings.auth as auth
from api.settings.config import config

app = FastAPI(
    title="Crunchy Girlz API",
    description="A comprehensive recipe and meal planning API",
    version="1.0.0",
    openapi_tags=[
        {"name": "auth", "description": "Authentication endpoints"},
        {"name": "recipes", "description": "Recipe management operations"},
    ],
)


# Configure OpenAPI security scheme
def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema

    from fastapi.openapi.utils import get_openapi

    openapi_schema = get_openapi(
        title=app.title,
        version=app.version,
        description=app.description,
        routes=app.routes,
    )

    # Add security scheme for JWT Bearer token authentication
    openapi_schema["components"]["securitySchemes"] = {
        "BearerAuth": {
            "type": "http",
            "scheme": "bearer",
            "bearerFormat": "JWT",
            "description": "Get your JWT token by signing in with Google at: "
            + config.SUPABASE_URL
            + "/auth/v1/authorize?provider=google&redirect_to=http://localhost:8000/docs",
        }
    }

    # Apply security to all protected endpoints (those with dependencies)
    if "paths" in openapi_schema:
        for path, methods in openapi_schema["paths"].items():
            for method, details in methods.items():
                # Apply security to all v1 API endpoints
                if path.startswith("/api/v1"):
                    if "security" not in details:
                        details["security"] = [{"BearerAuth": []}]

    app.openapi_schema = openapi_schema
    return app.openapi_schema


app.openapi = custom_openapi

protected_router = APIRouter()
unprotected_router = APIRouter()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure this properly for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routers
protected_router.include_router(v1_router)

app.include_router(unprotected_router)
app.include_router(
    protected_router,
    dependencies=[Depends(auth.verify_jwt)],
    # This adds the security requirement to all endpoints in the protected router
    responses={
        401: {"description": "Unauthorized - Invalid or missing JWT token"},
        403: {"description": "Forbidden - Token valid but insufficient permissions"},
    },
)


@app.get("/")
async def root():
    return {"message": "Welcome to Crunchy Girlz API"}


@app.get("/auth/callback")
async def auth_callback():
    """Handle OAuth callback and show token extraction instructions"""
    return {
        "message": "OAuth callback received",
        "instructions": [
            "1. Check your browser's URL for the access_token parameter",
            "2. Copy the value after 'access_token='",
            "3. Go back to /docs and click 'Authorize'",
            "4. Paste the token in the BearerAuth field",
            "5. Now you can test protected endpoints!",
        ],
    }


@app.get("/health")
async def health():
    return {"status": "healthy"}
