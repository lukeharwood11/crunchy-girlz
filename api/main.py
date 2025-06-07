from fastapi import FastAPI, APIRouter, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.templating import Jinja2Templates
from fastapi import Request
from .settings.config import config
from .routers.v1 import v1_router
import api.settings.auth as auth
from api.settings.config import config

import logging

logging.basicConfig(level=logging.INFO)
log = logging.getLogger(__name__)
log.info("Starting Crunchy Girlz API")

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

    # Apply BearerAuth security to protected endpoints
    for path, path_item in openapi_schema["paths"].items():
        # Check if this is a protected endpoint (starts with /api/v1/ and not auth/health)
        if path.startswith("/api/v1/") and not any(unprotected in path for unprotected in ["/auth", "/health"]):
            for method, operation in path_item.items():
                if isinstance(operation, dict) and "operationId" in operation:
                    operation["security"] = [{"BearerAuth": []}]

    app.openapi_schema = openapi_schema
    return app.openapi_schema


app.openapi = custom_openapi

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure this properly for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(v1_router)

@app.get("/")
async def root():
    return {"message": "Welcome to Crunchy Girlz API"}

auth_templates = Jinja2Templates(directory="api/api_files")
# static serve api_files/get_token.html
@app.get("/auth")
async def get_token(request: Request):
    return auth_templates.TemplateResponse(
        "get_token.html", 
        {
            "request": request,
            "supabase_url": config.SUPABASE_URL,
            "supabase_anon_key": config.SUPABASE_ANON_KEY
        }
    )



@app.get("/health")
async def health():
    return {"status": "healthy"}
