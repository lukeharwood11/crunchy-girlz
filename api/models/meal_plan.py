from datetime import datetime, date
from typing import Optional, List
from pydantic import BaseModel


class MealTypeBase(BaseModel):
    name: str


class MealTypeCreate(MealTypeBase):
    
    class Config:
        json_schema_extra = {
            "example": {
                "name": "Breakfast"
            }
        }


class MealTypeUpdate(BaseModel):
    name: Optional[str] = None

    class Config:
        json_schema_extra = {
            "example": {
                "name": "Morning Meal"
            }
        }


class MealType(MealTypeBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
        json_schema_extra = {
            "example": {
                "id": 1,
                "name": "Breakfast",
                "created_at": "2024-01-15T10:30:00",
                "updated_at": "2024-01-15T10:30:00"
            }
        }


class MealPlanBase(BaseModel):
    name: str
    description: Optional[str] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None


class MealPlanCreate(MealPlanBase):
    user_id: Optional[str] = None
    name_embedding: Optional[List[float]] = None

    class Config:
        json_schema_extra = {
            "example": {
                "name": "Weekly Meal Plan - January",
                "description": "Healthy meal plan for the first week of January",
                "start_date": "2024-01-01",
                "end_date": "2024-01-07",
                "user_id": "user123"
            }
        }


class MealPlanUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    name_embedding: Optional[List[float]] = None

    class Config:
        json_schema_extra = {
            "example": {
                "name": "Updated Weekly Meal Plan - January",
                "description": "Updated healthy meal plan for the first week of January"
            }
        }


class MealPlan(MealPlanBase):
    id: int
    user_id: Optional[str] = None
    name_embedding: Optional[List[float]] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
        json_schema_extra = {
            "example": {
                "id": 1,
                "name": "Weekly Meal Plan - January",
                "description": "Healthy meal plan for the first week of January",
                "start_date": "2024-01-01",
                "end_date": "2024-01-07",
                "user_id": "user123",
                "created_at": "2024-01-15T10:30:00",
                "updated_at": "2024-01-15T10:30:00"
            }
        }


class MealPlanRecipeBase(BaseModel):
    meal_plan_id: int
    recipe_id: int
    day_of_plan: int
    meal_type_id: int
    servings: Optional[int] = 1
    notes: Optional[str] = None


class MealPlanRecipeCreate(MealPlanRecipeBase):
    
    class Config:
        json_schema_extra = {
            "example": {
                "meal_plan_id": 1,
                "recipe_id": 1,
                "day_of_plan": 1,
                "meal_type_id": 1,
                "servings": 4,
                "notes": "Prepare the night before"
            }
        }


class MealPlanRecipeCreateWithObjects(BaseModel):
    meal_plan_id: int
    recipe: 'RecipeCreate'
    day_of_plan: int
    meal_type: MealTypeCreate | MealType
    servings: Optional[int] = 1
    notes: Optional[str] = None

    class Config:
        json_schema_extra = {
            "example": {
                "meal_plan_id": 1,
                "recipe": {
                    "title": "Chicken Alfredo Pasta",
                    "description": "Creamy pasta dish with grilled chicken and parmesan sauce",
                    "instructions": "1. Cook pasta\n2. Grill chicken\n3. Make sauce\n4. Combine",
                    "prep_time_minutes": 15,
                    "cook_time_minutes": 25,
                    "servings": 4,
                    "difficulty_level": "Medium"
                },
                "day_of_plan": 1,
                "meal_type": {
                    "name": "Dinner"
                },
                "servings": 4,
                "notes": "Family favorite"
            }
        }


class MealPlanRecipeUpdate(BaseModel):
    day_of_plan: Optional[int] = None
    meal_type_id: Optional[int] = None
    servings: Optional[int] = None
    notes: Optional[str] = None

    class Config:
        json_schema_extra = {
            "example": {
                "day_of_plan": 2,
                "servings": 6,
                "notes": "Updated for larger group"
            }
        }


class MealPlanRecipe(MealPlanRecipeBase):
    id: int

    class Config:
        from_attributes = True
        json_schema_extra = {
            "example": {
                "id": 1,
                "meal_plan_id": 1,
                "recipe_id": 1,
                "day_of_plan": 1,
                "meal_type_id": 1,
                "servings": 4,
                "notes": "Prepare the night before"
            }
        }


# Import here to avoid circular imports
from .recipe import RecipeCreate

# Update forward references
MealPlanRecipeCreateWithObjects.model_rebuild()
