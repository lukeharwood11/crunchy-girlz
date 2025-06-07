from typing import List, Optional
from supabase import Client
from ..settings.database import get_supabase_client
from ..models.ingredient import Ingredient, IngredientCreate, IngredientUpdate
from ..models.unit_of_measure import UnitOfMeasure, UnitOfMeasureCreate, UnitOfMeasureType, UnitOfMeasureTypeCreate


class IngredientService:
    def __init__(self):
        self.supabase: Client = get_supabase_client()
        self.table_name = "ingredient"
        self.unit_table_name = "unit_of_measure"
        self.unit_type_table_name = "unit_of_measure_type"
        self.schema = "core"

    async def _upsert_unit_type(self, unit_type_data: UnitOfMeasureTypeCreate | UnitOfMeasureType) -> int:
        """Upsert a unit type and return its ID"""
        try:
            if isinstance(unit_type_data, UnitOfMeasureType):
                return unit_type_data.id
            
            data = unit_type_data.model_dump(exclude_none=True)
            # Check if unit type already exists by name
            existing = (
                self.supabase.schema(self.schema).table(self.unit_type_table_name)
                .select("id")
                .eq("name", data["name"])
                .execute()
            )
            
            if existing.data:
                return existing.data[0]["id"]
            
            # Create new unit type
            response = (
                self.supabase.schema(self.schema).table(self.unit_type_table_name)
                .insert(data)
                .execute()
            )
            
            if not response.data:
                raise Exception("Failed to create unit type")
            
            return response.data[0]["id"]
        except Exception as e:
            raise Exception(f"Failed to upsert unit type: {str(e)}")

    async def _upsert_unit(self, unit_data: UnitOfMeasureCreate | UnitOfMeasure) -> int:
        """Upsert a unit and return its ID"""
        try:
            if isinstance(unit_data, UnitOfMeasure):
                return unit_data.id
            
            type_id = None
            if unit_data.type:
                type_id = await self._upsert_unit_type(unit_data.type)
            elif unit_data.type_id:
                type_id = unit_data.type_id
            
            # Check if unit already exists by name and type
            query = (
                self.supabase.schema(self.schema).table(self.unit_table_name)
                .select("id")
                .eq("name", unit_data.name)
            )
            
            if type_id:
                query = query.eq("type_id", type_id)
            else:
                query = query.is_("type_id", "null")
            
            existing = query.execute()
            
            if existing.data:
                return existing.data[0]["id"]
            
            # Create new unit
            data = {"name": unit_data.name}
            if type_id:
                data["type_id"] = type_id
            
            response = (
                self.supabase.schema(self.schema).table(self.unit_table_name)
                .insert(data)
                .execute()
            )
            
            if not response.data:
                raise Exception("Failed to create unit")
            
            return response.data[0]["id"]
        except Exception as e:
            raise Exception(f"Failed to upsert unit: {str(e)}")

    async def _upsert_ingredient(self, ingredient_data: IngredientCreate | Ingredient) -> Ingredient:
        """Upsert an ingredient and return the full ingredient object"""
        try:
            if isinstance(ingredient_data, Ingredient):
                return ingredient_data
            
            # Check if ingredient already exists by name and category
            query = (
                self.supabase.schema(self.schema).table(self.table_name)
                .select("*")
                .eq("name", ingredient_data.name)
            )
            
            if ingredient_data.category:
                query = query.eq("category", ingredient_data.category)
            else:
                query = query.is_("category", "null")
            
            existing = query.execute()
            
            if existing.data:
                return Ingredient(**existing.data[0])
            
            # Create new ingredient if it doesn't exist
            return await self.create_ingredient(ingredient_data)
        except Exception as e:
            raise Exception(f"Failed to upsert ingredient: {str(e)}")

    async def create_ingredient(self, ingredient_data: IngredientCreate) -> Ingredient:
        """Create a new ingredient with validation and upsert functionality"""
        try:
            data = {
                "name": ingredient_data.name,
                "category": ingredient_data.category,
            }
            response = self.supabase.schema(self.schema).table(self.table_name).insert(data).execute()
            if not response.data:
                raise Exception("Failed to create ingredient")

            return Ingredient(**response.data[0])
        except Exception as e:
            raise Exception(f"Failed to create ingredient: {str(e)}")

    async def get_ingredient(self, ingredient_id: int) -> Optional[Ingredient]:
        """Get ingredient by ID"""
        try:
            response = (
                self.supabase.schema(self.schema).table(self.table_name)
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
            query = self.supabase.schema(self.schema).table(self.table_name).select("*")

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
                self.supabase.schema(self.schema).table(self.table_name)
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
                self.supabase.schema(self.schema).table(self.table_name)
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
                self.supabase.schema(self.schema).table(self.table_name)
                .select("*")
                .text_search("name", query)
                .limit(limit)
                .execute()
            )

            return [Ingredient(**item) for item in response.data]
        except Exception as e:
            raise Exception(f"Failed to search ingredients: {str(e)}")


ingredient_service = IngredientService()
