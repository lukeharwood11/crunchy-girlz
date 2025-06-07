from typing import List, Optional
from supabase import Client
from ..settings.database import get_supabase_client
from ..models.meal_plan import MealPlan, MealPlanCreate, MealPlanUpdate, MealType, MealTypeCreate, MealTypeUpdate, MealPlanRecipe, MealPlanRecipeCreate, MealPlanRecipeUpdate

class MealPlanService:
    def __init__(self):
        self.supabase: Client = get_supabase_client()
        self.table_name = "meal_plan"
        self.type_table_name = "meal_type"
        self.recipe_table_name = "meal_plan_recipes"
        self.schema = "core"

    # Meal Type methods
    async def create_meal_type(self, type_data: MealTypeCreate) -> MealType:
        """Create a new meal type"""
        try:
            data = type_data.model_dump(exclude_none=True)
            
            response = self.supabase.table(self.type_table_name).insert(data).execute()
            
            if not response.data:
                raise Exception("Failed to create meal type")
                
            return MealType(**response.data[0])
        except Exception as e:
            raise Exception(f"Failed to create meal type: {str(e)}")

    async def get_meal_type(self, type_id: int) -> Optional[MealType]:
        """Get meal type by ID"""
        try:
            response = self.supabase.table(self.type_table_name).select("*").eq("id", type_id).execute()
            
            if not response.data:
                return None
                
            return MealType(**response.data[0])
        except Exception as e:
            raise Exception(f"Failed to get meal type: {str(e)}")

    async def get_meal_types(self, skip: int = 0, limit: int = 100) -> List[MealType]:
        """Get all meal types"""
        try:
            response = self.supabase.table(self.type_table_name).select("*").range(skip, skip + limit - 1).execute()
            
            return [MealType(**item) for item in response.data]
        except Exception as e:
            raise Exception(f"Failed to get meal types: {str(e)}")

    async def update_meal_type(self, type_id: int, type_data: MealTypeUpdate) -> Optional[MealType]:
        """Update a meal type"""
        try:
            data = type_data.model_dump(exclude_none=True)
            if not data:
                return await self.get_meal_type(type_id)
            
            response = self.supabase.table(self.type_table_name).update(data).eq("id", type_id).execute()
            
            if not response.data:
                return None
                
            return MealType(**response.data[0])
        except Exception as e:
            raise Exception(f"Failed to update meal type: {str(e)}")

    async def delete_meal_type(self, type_id: int) -> bool:
        """Delete a meal type"""
        try:
            response = self.supabase.table(self.type_table_name).delete().eq("id", type_id).execute()
            return len(response.data) > 0
        except Exception as e:
            raise Exception(f"Failed to delete meal type: {str(e)}")

    # Meal Plan methods
    async def create_meal_plan(self, plan_data: MealPlanCreate, user_id: str) -> MealPlan:
        """Create a new meal plan"""
        try:
            data = plan_data.model_dump(exclude_none=True)
            data["user_id"] = user_id
            
            response = self.supabase.table(self.table_name).insert(data).execute()
            
            if not response.data:
                raise Exception("Failed to create meal plan")
                
            return MealPlan(**response.data[0])
        except Exception as e:
            raise Exception(f"Failed to create meal plan: {str(e)}")

    async def get_meal_plan(self, plan_id: int, user_id: str) -> Optional[MealPlan]:
        """Get meal plan by ID (user-specific)"""
        try:
            response = self.supabase.table(self.table_name).select("*").eq("id", plan_id).eq("user_id", user_id).execute()
            
            if not response.data:
                return None
                
            return MealPlan(**response.data[0])
        except Exception as e:
            raise Exception(f"Failed to get meal plan: {str(e)}")

    async def get_meal_plans(self, user_id: str, skip: int = 0, limit: int = 100) -> List[MealPlan]:
        """Get user's meal plans"""
        try:
            response = self.supabase.table(self.table_name).select("*").eq("user_id", user_id).range(skip, skip + limit - 1).order("created_at", desc=True).execute()
            
            return [MealPlan(**item) for item in response.data]
        except Exception as e:
            raise Exception(f"Failed to get meal plans: {str(e)}")

    async def update_meal_plan(self, plan_id: int, plan_data: MealPlanUpdate, user_id: str) -> Optional[MealPlan]:
        """Update a meal plan (user-specific)"""
        try:
            data = plan_data.model_dump(exclude_none=True)
            if not data:
                return await self.get_meal_plan(plan_id, user_id)
            
            response = self.supabase.table(self.table_name).update(data).eq("id", plan_id).eq("user_id", user_id).execute()
            
            if not response.data:
                return None
                
            return MealPlan(**response.data[0])
        except Exception as e:
            raise Exception(f"Failed to update meal plan: {str(e)}")

    async def delete_meal_plan(self, plan_id: int, user_id: str) -> bool:
        """Delete a meal plan (user-specific)"""
        try:
            response = self.supabase.table(self.table_name).delete().eq("id", plan_id).eq("user_id", user_id).execute()
            return len(response.data) > 0
        except Exception as e:
            raise Exception(f"Failed to delete meal plan: {str(e)}")

    async def search_meal_plans(self, query: str, user_id: str, limit: int = 10) -> List[MealPlan]:
        """Search user's meal plans by name"""
        try:
            response = self.supabase.table(self.table_name).select("*").text_search("name", query).eq("user_id", user_id).limit(limit).execute()
            
            return [MealPlan(**item) for item in response.data]
        except Exception as e:
            raise Exception(f"Failed to search meal plans: {str(e)}")

    # Meal Plan Recipe methods
    async def add_recipe_to_meal_plan(self, recipe_data: MealPlanRecipeCreate) -> MealPlanRecipe:
        """Add recipe to meal plan"""
        try:
            data = recipe_data.model_dump(exclude_none=True)
            
            response = self.supabase.table(self.recipe_table_name).insert(data).execute()
            
            if not response.data:
                raise Exception("Failed to add recipe to meal plan")
                
            return MealPlanRecipe(**response.data[0])
        except Exception as e:
            raise Exception(f"Failed to add recipe to meal plan: {str(e)}")

    async def get_meal_plan_recipes(self, plan_id: int) -> List[MealPlanRecipe]:
        """Get all recipes for a meal plan"""
        try:
            response = self.supabase.table(self.recipe_table_name).select("*").eq("meal_plan_id", plan_id).order("day_of_plan").execute()
            
            return [MealPlanRecipe(**item) for item in response.data]
        except Exception as e:
            raise Exception(f"Failed to get meal plan recipes: {str(e)}")

    async def update_meal_plan_recipe(self, recipe_id: int, recipe_data: MealPlanRecipeUpdate) -> Optional[MealPlanRecipe]:
        """Update meal plan recipe"""
        try:
            data = recipe_data.model_dump(exclude_none=True)
            if not data:
                return None
            
            response = self.supabase.table(self.recipe_table_name).update(data).eq("id", recipe_id).execute()
            
            if not response.data:
                return None
                
            return MealPlanRecipe(**response.data[0])
        except Exception as e:
            raise Exception(f"Failed to update meal plan recipe: {str(e)}")

    async def remove_recipe_from_meal_plan(self, recipe_id: int) -> bool:
        """Remove recipe from meal plan"""
        try:
            response = self.supabase.table(self.recipe_table_name).delete().eq("id", recipe_id).execute()
            return len(response.data) > 0
        except Exception as e:
            raise Exception(f"Failed to remove recipe from meal plan: {str(e)}")

meal_plan_service = MealPlanService() 