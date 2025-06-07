from fastapi import APIRouter
from .ingredients import router as ingredients_router
from .recipes import router as recipes_router
from .units import router as units_router
from .meal_plans import router as meal_plans_router

# Create v1 API router
v1_router = APIRouter(prefix="/api/v1")

# Include all routers (auth is handled separately as unprotected)
v1_router.include_router(ingredients_router)
v1_router.include_router(recipes_router)
v1_router.include_router(units_router)
v1_router.include_router(meal_plans_router)
