from typing import List, Optional
from fastapi import APIRouter, HTTPException, status, Depends, Query
from ...models.recipe import (
    Recipe,
    RecipeCreate,
    RecipeUpdate,
    RecipeIngredientLink,
    RecipeIngredientLinkCreate,
    RecipeIngredientLinkCreateWithObjects,
    RecipeIngredientLinkUpdate,
)
from ...services.recipe_service import recipe_service
from ...settings.auth import get_current_user, get_current_user_id, get_optional_user
from ...contracts import SuccessResponse, ErrorResponse

router = APIRouter(prefix="/recipes", tags=["recipes"])


@router.post("", response_model=SuccessResponse, status_code=status.HTTP_201_CREATED)
async def create_recipe(
    recipe_data: RecipeCreate, user_id: str = Depends(get_current_user_id)
):
    """Create a new recipe (authenticated users only)"""
    try:
        recipe = await recipe_service.create_recipe(recipe_data, user_id)
        return SuccessResponse(message="Recipe created successfully", data=recipe)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@router.get("/{recipe_id}", response_model=SuccessResponse)
async def get_recipe(
    recipe_id: int, current_user: Optional[dict] = Depends(get_optional_user)
):
    """Get recipe by ID (public endpoint, but user-specific if authenticated)"""
    try:
        user_id = current_user["user_id"] if current_user else None
        recipe = await recipe_service.get_recipe(recipe_id, user_id)

        if not recipe:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Recipe not found"
            )

        return SuccessResponse(message="Recipe retrieved successfully", data=recipe)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.get("/", response_model=SuccessResponse)
async def get_recipes(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    difficulty_level: Optional[str] = Query(None),
    user_id: str = Depends(get_current_user_id),
):
    """Get user's recipes with optional filtering (authenticated users only)"""
    try:
        recipes = await recipe_service.get_recipes(
            user_id=user_id, skip=skip, limit=limit, difficulty_level=difficulty_level
        )

        return SuccessResponse(message="Recipes retrieved successfully", data=recipes)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.put("/{recipe_id}", response_model=SuccessResponse)
async def update_recipe(
    recipe_id: int,
    recipe_data: RecipeUpdate,
    user_id: str = Depends(get_current_user_id),
):
    """Update a recipe (authenticated users only, own recipes only)"""
    try:
        recipe = await recipe_service.update_recipe(recipe_id, recipe_data, user_id)
        if not recipe:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Recipe not found or you don't have permission to update it",
            )

        return SuccessResponse(message="Recipe updated successfully", data=recipe)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@router.delete("/{recipe_id}", response_model=SuccessResponse)
async def delete_recipe(recipe_id: int, user_id: str = Depends(get_current_user_id)):
    """Delete a recipe (authenticated users only, own recipes only)"""
    try:
        success = await recipe_service.delete_recipe(recipe_id, user_id)
        if not success:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Recipe not found or you don't have permission to delete it",
            )

        return SuccessResponse(message="Recipe deleted successfully")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@router.get("/search", response_model=SuccessResponse)
async def search_recipes(
    q: str = Query(..., min_length=1),
    limit: int = Query(10, ge=1, le=100),
    current_user: Optional[dict] = Depends(get_optional_user),
):
    """Search recipes by title (public endpoint, but user-specific if authenticated)"""
    try:
        user_id = current_user["user_id"] if current_user else None
        recipes = await recipe_service.search_recipes(q, user_id, limit)

        return SuccessResponse(message="Search completed successfully", data=recipes)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


# Recipe Ingredient Link endpoints
@router.post(
    "/{recipe_id}/ingredients",
    response_model=SuccessResponse,
    status_code=status.HTTP_201_CREATED,
)
async def add_ingredient_to_recipe(
    recipe_id: int,
    ingredient_data: RecipeIngredientLinkCreate,
    user_id: str = Depends(get_current_user_id),
):
    """Add ingredient to recipe (authenticated users only)"""
    try:
        # Verify recipe ownership
        recipe = await recipe_service.get_recipe(recipe_id, user_id)
        if not recipe:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Recipe not found or you don't have permission to modify it",
            )

        # Ensure recipe_id matches
        ingredient_data.recipe_id = recipe_id

        ingredient_link = await recipe_service.add_ingredient_to_recipe(ingredient_data)
        return SuccessResponse(
            message="Ingredient added to recipe successfully", data=ingredient_link
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@router.post(
    "/{recipe_id}/ingredients/with-objects",
    response_model=SuccessResponse,
    status_code=status.HTTP_201_CREATED,
)
async def add_ingredient_to_recipe_with_objects(
    recipe_id: int,
    ingredient_data: RecipeIngredientLinkCreateWithObjects,
    user_id: str = Depends(get_current_user_id),
):
    """Add ingredient to recipe with full ingredient and unit objects (authenticated users only)"""
    try:
        # Verify recipe ownership
        recipe = await recipe_service.get_recipe(recipe_id, user_id)
        if not recipe:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Recipe not found or you don't have permission to modify it",
            )

        # Ensure recipe_id matches
        ingredient_data.recipe_id = recipe_id

        ingredient_link = await recipe_service.add_ingredient_to_recipe_with_objects(ingredient_data)
        return SuccessResponse(
            message="Ingredient added to recipe successfully with objects", data=ingredient_link
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@router.get("/{recipe_id}/ingredients", response_model=SuccessResponse)
async def get_recipe_ingredients(
    recipe_id: int, current_user: Optional[dict] = Depends(get_optional_user)
):
    """Get all ingredients for a recipe (public endpoint)"""
    try:
        ingredients = await recipe_service.get_recipe_ingredients(recipe_id)

        return SuccessResponse(
            message="Recipe ingredients retrieved successfully", data=ingredients
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.put("/ingredients/{link_id}", response_model=SuccessResponse)
async def update_recipe_ingredient(
    link_id: int,
    ingredient_data: RecipeIngredientLinkUpdate,
    current_user: dict = Depends(get_current_user),
):
    """Update recipe ingredient link (authenticated users only)"""
    try:
        ingredient_link = await recipe_service.update_recipe_ingredient(
            link_id, ingredient_data
        )
        if not ingredient_link:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Recipe ingredient link not found",
            )

        return SuccessResponse(
            message="Recipe ingredient updated successfully", data=ingredient_link
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@router.delete("/ingredients/{link_id}", response_model=SuccessResponse)
async def remove_ingredient_from_recipe(
    link_id: int, current_user: dict = Depends(get_current_user)
):
    """Remove ingredient from recipe (authenticated users only)"""
    try:
        success = await recipe_service.remove_ingredient_from_recipe(link_id)
        if not success:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Recipe ingredient link not found",
            )

        return SuccessResponse(message="Ingredient removed from recipe successfully")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
