from typing import List, Optional
from supabase import Client
from ..settings.database import get_supabase_client
from ..models.recipe import (
    Recipe,
    RecipeCreate,
    RecipeUpdate,
    RecipeIngredientLink,
    RecipeIngredientLinkCreate,
    RecipeIngredientLinkUpdate,
)


class RecipeService:
    def __init__(self):
        self.supabase: Client = get_supabase_client()
        self.table_name = "recipe"
        self.ingredient_link_table = "recipe_ingredient_link"
        self.schema = "core"

    async def create_recipe(self, recipe_data: RecipeCreate, user_id: str) -> Recipe:
        """Create a new recipe"""
        try:
            data = recipe_data.model_dump(exclude_none=True)
            data["user_id"] = user_id

            response = self.supabase.table(self.table_name).insert(data).execute()

            if not response.data:
                raise Exception("Failed to create recipe")

            return Recipe(**response.data[0])
        except Exception as e:
            raise Exception(f"Failed to create recipe: {str(e)}")

    async def get_recipe(
        self, recipe_id: int, user_id: Optional[str] = None
    ) -> Optional[Recipe]:
        """Get recipe by ID"""
        try:
            query = self.supabase.table(self.table_name).select("*").eq("id", recipe_id)

            # If user_id is provided, ensure the recipe belongs to the user
            if user_id:
                query = query.eq("user_id", user_id)

            response = query.execute()

            if not response.data:
                return None

            return Recipe(**response.data[0])
        except Exception as e:
            raise Exception(f"Failed to get recipe: {str(e)}")

    async def get_recipes(
        self,
        user_id: str,
        skip: int = 0,
        limit: int = 100,
        difficulty_level: Optional[str] = None,
    ) -> List[Recipe]:
        """Get user's recipes with optional filtering"""
        try:
            query = (
                self.supabase.table(self.table_name).select("*").eq("user_id", user_id)
            )

            if difficulty_level:
                query = query.eq("difficulty_level", difficulty_level)

            response = (
                query.range(skip, skip + limit - 1)
                .order("created_at", desc=True)
                .execute()
            )

            return [Recipe(**item) for item in response.data]
        except Exception as e:
            raise Exception(f"Failed to get recipes: {str(e)}")

    async def update_recipe(
        self, recipe_id: int, recipe_data: RecipeUpdate, user_id: str
    ) -> Optional[Recipe]:
        """Update a recipe (only if owned by user)"""
        try:
            data = recipe_data.model_dump(exclude_none=True)
            if not data:
                return await self.get_recipe(recipe_id, user_id)

            response = (
                self.supabase.table(self.table_name)
                .update(data)
                .eq("id", recipe_id)
                .eq("user_id", user_id)
                .execute()
            )

            if not response.data:
                return None

            return Recipe(**response.data[0])
        except Exception as e:
            raise Exception(f"Failed to update recipe: {str(e)}")

    async def delete_recipe(self, recipe_id: int, user_id: str) -> bool:
        """Delete a recipe (only if owned by user)"""
        try:
            response = (
                self.supabase.table(self.table_name)
                .delete()
                .eq("id", recipe_id)
                .eq("user_id", user_id)
                .execute()
            )
            return len(response.data) > 0
        except Exception as e:
            raise Exception(f"Failed to delete recipe: {str(e)}")

    async def search_recipes(
        self, query: str, user_id: Optional[str] = None, limit: int = 10
    ) -> List[Recipe]:
        """Search recipes by title"""
        try:
            supabase_query = (
                self.supabase.table(self.table_name)
                .select("*")
                .text_search("title", query)
            )

            if user_id:
                supabase_query = supabase_query.eq("user_id", user_id)

            response = supabase_query.limit(limit).execute()

            return [Recipe(**item) for item in response.data]
        except Exception as e:
            raise Exception(f"Failed to search recipes: {str(e)}")

    # Recipe Ingredient Link methods
    async def add_ingredient_to_recipe(
        self, link_data: RecipeIngredientLinkCreate
    ) -> RecipeIngredientLink:
        """Add ingredient to recipe"""
        try:
            data = link_data.model_dump(exclude_none=True)

            response = (
                self.supabase.table(self.ingredient_link_table).insert(data).execute()
            )

            if not response.data:
                raise Exception("Failed to add ingredient to recipe")

            return RecipeIngredientLink(**response.data[0])
        except Exception as e:
            raise Exception(f"Failed to add ingredient to recipe: {str(e)}")

    async def get_recipe_ingredients(
        self, recipe_id: int
    ) -> List[RecipeIngredientLink]:
        """Get all ingredients for a recipe"""
        try:
            response = (
                self.supabase.table(self.ingredient_link_table)
                .select("*")
                .eq("recipe_id", recipe_id)
                .execute()
            )

            return [RecipeIngredientLink(**item) for item in response.data]
        except Exception as e:
            raise Exception(f"Failed to get recipe ingredients: {str(e)}")

    async def update_recipe_ingredient(
        self, link_id: int, link_data: RecipeIngredientLinkUpdate
    ) -> Optional[RecipeIngredientLink]:
        """Update recipe ingredient link"""
        try:
            data = link_data.model_dump(exclude_none=True)
            if not data:
                return None

            response = (
                self.supabase.table(self.ingredient_link_table)
                .update(data)
                .eq("id", link_id)
                .execute()
            )

            if not response.data:
                return None

            return RecipeIngredientLink(**response.data[0])
        except Exception as e:
            raise Exception(f"Failed to update recipe ingredient: {str(e)}")

    async def remove_ingredient_from_recipe(self, link_id: int) -> bool:
        """Remove ingredient from recipe"""
        try:
            response = (
                self.supabase.table(self.ingredient_link_table)
                .delete()
                .eq("id", link_id)
                .execute()
            )
            return len(response.data) > 0
        except Exception as e:
            raise Exception(f"Failed to remove ingredient from recipe: {str(e)}")


recipe_service = RecipeService()
