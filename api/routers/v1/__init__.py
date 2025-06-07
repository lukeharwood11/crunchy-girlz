from fastapi import APIRouter, Depends
from .ingredients import router as ingredients_router
from .recipes import router as recipes_router
from .units import router as units_router
from .meal_plans import router as meal_plans_router
from api.settings import auth

protected_router = APIRouter(
    dependencies=[Depends(auth.verify_jwt)],
    responses={401: {"description": "Unauthorized"}},
)
unprotected_router = APIRouter()

# Create v1 API router
v1_router = APIRouter(prefix="/api/v1")

# Include all routers (auth is handled separately as unprotected)
protected_router.include_router(ingredients_router)
protected_router.include_router(recipes_router)
protected_router.include_router(units_router)
protected_router.include_router(meal_plans_router)

v1_router.include_router(unprotected_router)
v1_router.include_router(protected_router)
