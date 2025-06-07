from typing import List, Optional
from fastapi import APIRouter, HTTPException, status, Depends, Query
from ...models.meal_plan import (
    MealPlan,
    MealPlanCreate,
    MealPlanUpdate,
    MealType,
    MealTypeCreate,
    MealTypeUpdate,
    MealPlanRecipe,
    MealPlanRecipeCreate,
    MealPlanRecipeUpdate,
)
from ...services.meal_plan_service import meal_plan_service
from ...settings.auth import get_current_user, get_current_user_id, get_optional_user
from ...contracts import SuccessResponse, ErrorResponse

router = APIRouter(prefix="/meal-plans", tags=["meal-plans"])


# Meal Type endpoints
@router.post(
    "/types", response_model=SuccessResponse, status_code=status.HTTP_201_CREATED
)
async def create_meal_type(
    type_data: MealTypeCreate, current_user: dict = Depends(get_current_user)
):
    """Create a new meal type (authenticated users only)"""
    try:
        meal_type = await meal_plan_service.create_meal_type(type_data)
        return SuccessResponse(message="Meal type created successfully", data=meal_type)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@router.get("/types/{type_id}", response_model=SuccessResponse)
async def get_meal_type(
    type_id: int, current_user: Optional[dict] = Depends(get_optional_user)
):
    """Get meal type by ID (public endpoint)"""
    try:
        meal_type = await meal_plan_service.get_meal_type(type_id)
        if not meal_type:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Meal type not found"
            )

        return SuccessResponse(
            message="Meal type retrieved successfully", data=meal_type
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.get("/types", response_model=SuccessResponse)
async def get_meal_types(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    current_user: Optional[dict] = Depends(get_optional_user),
):
    """Get all meal types (public endpoint)"""
    try:
        meal_types = await meal_plan_service.get_meal_types(skip=skip, limit=limit)

        return SuccessResponse(
            message="Meal types retrieved successfully", data=meal_types
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.put("/types/{type_id}", response_model=SuccessResponse)
async def update_meal_type(
    type_id: int,
    type_data: MealTypeUpdate,
    current_user: dict = Depends(get_current_user),
):
    """Update a meal type (authenticated users only)"""
    try:
        meal_type = await meal_plan_service.update_meal_type(type_id, type_data)
        if not meal_type:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Meal type not found"
            )

        return SuccessResponse(message="Meal type updated successfully", data=meal_type)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@router.delete("/types/{type_id}", response_model=SuccessResponse)
async def delete_meal_type(
    type_id: int, current_user: dict = Depends(get_current_user)
):
    """Delete a meal type (authenticated users only)"""
    try:
        success = await meal_plan_service.delete_meal_type(type_id)
        if not success:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Meal type not found"
            )

        return SuccessResponse(message="Meal type deleted successfully")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


# Meal Plan endpoints
@router.post("/", response_model=SuccessResponse, status_code=status.HTTP_201_CREATED)
async def create_meal_plan(
    plan_data: MealPlanCreate, user_id: str = Depends(get_current_user_id)
):
    """Create a new meal plan (authenticated users only)"""
    try:
        meal_plan = await meal_plan_service.create_meal_plan(plan_data, user_id)
        return SuccessResponse(message="Meal plan created successfully", data=meal_plan)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@router.get("/{plan_id}", response_model=SuccessResponse)
async def get_meal_plan(plan_id: int, user_id: str = Depends(get_current_user_id)):
    """Get meal plan by ID (authenticated users only, own plans only)"""
    try:
        meal_plan = await meal_plan_service.get_meal_plan(plan_id, user_id)
        if not meal_plan:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Meal plan not found or you don't have permission to access it",
            )

        return SuccessResponse(
            message="Meal plan retrieved successfully", data=meal_plan
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.get("/", response_model=SuccessResponse)
async def get_meal_plans(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    user_id: str = Depends(get_current_user_id),
):
    """Get user's meal plans (authenticated users only)"""
    try:
        meal_plans = await meal_plan_service.get_meal_plans(
            user_id=user_id, skip=skip, limit=limit
        )

        return SuccessResponse(
            message="Meal plans retrieved successfully", data=meal_plans
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.put("/{plan_id}", response_model=SuccessResponse)
async def update_meal_plan(
    plan_id: int, plan_data: MealPlanUpdate, user_id: str = Depends(get_current_user_id)
):
    """Update a meal plan (authenticated users only, own plans only)"""
    try:
        meal_plan = await meal_plan_service.update_meal_plan(
            plan_id, plan_data, user_id
        )
        if not meal_plan:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Meal plan not found or you don't have permission to update it",
            )

        return SuccessResponse(message="Meal plan updated successfully", data=meal_plan)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@router.delete("/{plan_id}", response_model=SuccessResponse)
async def delete_meal_plan(plan_id: int, user_id: str = Depends(get_current_user_id)):
    """Delete a meal plan (authenticated users only, own plans only)"""
    try:
        success = await meal_plan_service.delete_meal_plan(plan_id, user_id)
        if not success:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Meal plan not found or you don't have permission to delete it",
            )

        return SuccessResponse(message="Meal plan deleted successfully")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@router.get("/search", response_model=SuccessResponse)
async def search_meal_plans(
    q: str = Query(..., min_length=1),
    limit: int = Query(10, ge=1, le=100),
    user_id: str = Depends(get_current_user_id),
):
    """Search user's meal plans by name (authenticated users only)"""
    try:
        meal_plans = await meal_plan_service.search_meal_plans(q, user_id, limit)

        return SuccessResponse(message="Search completed successfully", data=meal_plans)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


# Meal Plan Recipe endpoints
@router.post(
    "/{plan_id}/recipes",
    response_model=SuccessResponse,
    status_code=status.HTTP_201_CREATED,
)
async def add_recipe_to_meal_plan(
    plan_id: int,
    recipe_data: MealPlanRecipeCreate,
    user_id: str = Depends(get_current_user_id),
):
    """Add recipe to meal plan (authenticated users only)"""
    try:
        # Verify meal plan ownership
        meal_plan = await meal_plan_service.get_meal_plan(plan_id, user_id)
        if not meal_plan:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Meal plan not found or you don't have permission to modify it",
            )

        # Ensure meal_plan_id matches
        recipe_data.meal_plan_id = plan_id

        meal_plan_recipe = await meal_plan_service.add_recipe_to_meal_plan(recipe_data)
        return SuccessResponse(
            message="Recipe added to meal plan successfully", data=meal_plan_recipe
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@router.get("/{plan_id}/recipes", response_model=SuccessResponse)
async def get_meal_plan_recipes(
    plan_id: int, user_id: str = Depends(get_current_user_id)
):
    """Get all recipes for a meal plan (authenticated users only, own plans only)"""
    try:
        # Verify meal plan ownership
        meal_plan = await meal_plan_service.get_meal_plan(plan_id, user_id)
        if not meal_plan:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Meal plan not found or you don't have permission to access it",
            )

        recipes = await meal_plan_service.get_meal_plan_recipes(plan_id)

        return SuccessResponse(
            message="Meal plan recipes retrieved successfully", data=recipes
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.put("/recipes/{recipe_id}", response_model=SuccessResponse)
async def update_meal_plan_recipe(
    recipe_id: int,
    recipe_data: MealPlanRecipeUpdate,
    current_user: dict = Depends(get_current_user),
):
    """Update meal plan recipe (authenticated users only)"""
    try:
        meal_plan_recipe = await meal_plan_service.update_meal_plan_recipe(
            recipe_id, recipe_data
        )
        if not meal_plan_recipe:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Meal plan recipe not found",
            )

        return SuccessResponse(
            message="Meal plan recipe updated successfully", data=meal_plan_recipe
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@router.delete("/recipes/{recipe_id}", response_model=SuccessResponse)
async def remove_recipe_from_meal_plan(
    recipe_id: int, current_user: dict = Depends(get_current_user)
):
    """Remove recipe from meal plan (authenticated users only)"""
    try:
        success = await meal_plan_service.remove_recipe_from_meal_plan(recipe_id)
        if not success:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Meal plan recipe not found",
            )

        return SuccessResponse(message="Recipe removed from meal plan successfully")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
