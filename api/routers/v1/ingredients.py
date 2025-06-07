from typing import List, Optional
from fastapi import APIRouter, HTTPException, status, Depends, Query
from ...models.ingredient import Ingredient, IngredientCreate, IngredientUpdate
from ...services.ingredient_service import ingredient_service
from ...settings.auth import get_current_user, get_optional_user
from ...contracts import SuccessResponse, ErrorResponse

router = APIRouter(prefix="/ingredients", tags=["ingredients"])


@router.post("", response_model=SuccessResponse, status_code=status.HTTP_201_CREATED)
async def create_ingredient(
    ingredient_data: IngredientCreate, current_user: dict = Depends(get_current_user)
):
    """Create a new ingredient with upsert functionality (authenticated users only)"""
    try:
        ingredient = await ingredient_service.create_ingredient(ingredient_data)
        return SuccessResponse(
            message="Ingredient created successfully", data=ingredient
        )
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@router.get("/{ingredient_id}", response_model=SuccessResponse)
async def get_ingredient(
    ingredient_id: int, current_user: Optional[dict] = Depends(get_optional_user)
):
    """Get ingredient by ID (public endpoint)"""
    try:
        ingredient = await ingredient_service.get_ingredient(ingredient_id)
        if not ingredient:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Ingredient not found"
            )

        return SuccessResponse(
            message="Ingredient retrieved successfully", data=ingredient
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.get("", response_model=SuccessResponse)
async def get_ingredients(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    category: Optional[str] = Query(None),
    current_user: Optional[dict] = Depends(get_optional_user),
):
    """Get all ingredients with optional filtering (public endpoint)"""
    try:
        ingredients = await ingredient_service.get_ingredients(
            skip=skip, limit=limit, category=category
        )

        return SuccessResponse(
            message="Ingredients retrieved successfully", data=ingredients
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.put("/{ingredient_id}", response_model=SuccessResponse)
async def update_ingredient(
    ingredient_id: int,
    ingredient_data: IngredientUpdate,
    current_user: dict = Depends(get_current_user),
):
    """Update an ingredient (authenticated users only)"""
    try:
        ingredient = await ingredient_service.update_ingredient(
            ingredient_id, ingredient_data
        )
        if not ingredient:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Ingredient not found"
            )

        return SuccessResponse(
            message="Ingredient updated successfully", data=ingredient
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@router.delete("/{ingredient_id}", response_model=SuccessResponse)
async def delete_ingredient(
    ingredient_id: int, current_user: dict = Depends(get_current_user)
):
    """Delete an ingredient (authenticated users only)"""
    try:
        success = await ingredient_service.delete_ingredient(ingredient_id)
        if not success:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Ingredient not found"
            )

        return SuccessResponse(message="Ingredient deleted successfully")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@router.get("/search", response_model=SuccessResponse)
async def search_ingredients(
    q: str = Query(..., min_length=1),
    limit: int = Query(10, ge=1, le=100),
    current_user: Optional[dict] = Depends(get_optional_user),
):
    """Search ingredients by name (public endpoint)"""
    try:
        ingredients = await ingredient_service.search_ingredients(q, limit)

        return SuccessResponse(
            message="Search completed successfully", data=ingredients
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )
