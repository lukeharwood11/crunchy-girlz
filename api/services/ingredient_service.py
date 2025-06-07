from typing import List, Optional
from supabase import Client
from ..settings.database import get_supabase_client
from ..models.ingredient import Ingredient, IngredientCreate, IngredientUpdate


class IngredientService:
    def __init__(self):
        self.supabase: Client = get_supabase_client()
        self.table_name = "ingredient"
        self.schema = "core"

    async def create_ingredient(self, ingredient_data: IngredientCreate) -> Ingredient:
        """Create a new ingredient"""
        try:
            data = ingredient_data.model_dump(exclude_none=True)

            response = self.supabase.table(self.table_name).insert(data).execute()

            if not response.data:
                raise Exception("Failed to create ingredient")

            return Ingredient(**response.data[0])
        except Exception as e:
            raise Exception(f"Failed to create ingredient: {str(e)}")

    async def get_ingredient(self, ingredient_id: int) -> Optional[Ingredient]:
        """Get ingredient by ID"""
        try:
            response = (
                self.supabase.table(self.table_name)
                .select("*")
                .eq("id", ingredient_id)
                .execute()
            )

            if not response.data:
                return None

            return Ingredient(**response.data[0])
        except Exception as e:
            raise Exception(f"Failed to get ingredient: {str(e)}")

    async def get_ingredients(
        self, skip: int = 0, limit: int = 100, category: Optional[str] = None
    ) -> List[Ingredient]:
        """Get all ingredients with optional filtering"""
        try:
            query = self.supabase.table(self.table_name).select("*")

            if category:
                query = query.eq("category", category)

            response = query.range(skip, skip + limit - 1).execute()

            return [Ingredient(**item) for item in response.data]
        except Exception as e:
            raise Exception(f"Failed to get ingredients: {str(e)}")

    async def update_ingredient(
        self, ingredient_id: int, ingredient_data: IngredientUpdate
    ) -> Optional[Ingredient]:
        """Update an ingredient"""
        try:
            data = ingredient_data.model_dump(exclude_none=True)
            if not data:
                return await self.get_ingredient(ingredient_id)

            response = (
                self.supabase.table(self.table_name)
                .update(data)
                .eq("id", ingredient_id)
                .execute()
            )

            if not response.data:
                return None

            return Ingredient(**response.data[0])
        except Exception as e:
            raise Exception(f"Failed to update ingredient: {str(e)}")

    async def delete_ingredient(self, ingredient_id: int) -> bool:
        """Delete an ingredient"""
        try:
            response = (
                self.supabase.table(self.table_name)
                .delete()
                .eq("id", ingredient_id)
                .execute()
            )
            return len(response.data) > 0
        except Exception as e:
            raise Exception(f"Failed to delete ingredient: {str(e)}")

    async def search_ingredients(self, query: str, limit: int = 10) -> List[Ingredient]:
        """Search ingredients by name using text search"""
        try:
            response = (
                self.supabase.table(self.table_name)
                .select("*")
                .text_search("name", query)
                .limit(limit)
                .execute()
            )

            return [Ingredient(**item) for item in response.data]
        except Exception as e:
            raise Exception(f"Failed to search ingredients: {str(e)}")


ingredient_service = IngredientService()
