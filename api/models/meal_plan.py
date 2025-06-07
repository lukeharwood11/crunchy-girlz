from datetime import datetime, date
from typing import Optional, List
from pydantic import BaseModel


class MealTypeBase(BaseModel):
    name: str


class MealTypeCreate(MealTypeBase):
    pass


class MealTypeUpdate(BaseModel):
    name: Optional[str] = None


class MealType(MealTypeBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class MealPlanBase(BaseModel):
    name: str
    description: Optional[str] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None


class MealPlanCreate(MealPlanBase):
    user_id: Optional[str] = None
    name_embedding: Optional[List[float]] = None


class MealPlanUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    name_embedding: Optional[List[float]] = None


class MealPlan(MealPlanBase):
    id: int
    user_id: Optional[str] = None
    name_embedding: Optional[List[float]] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class MealPlanRecipeBase(BaseModel):
    meal_plan_id: int
    recipe_id: int
    day_of_plan: int
    meal_type_id: int
    servings: Optional[int] = 1
    notes: Optional[str] = None


class MealPlanRecipeCreate(MealPlanRecipeBase):
    pass


class MealPlanRecipeCreateWithObjects(BaseModel):
    meal_plan_id: int
    recipe: 'RecipeCreate'
    day_of_plan: int
    meal_type: MealTypeCreate | MealType
    servings: Optional[int] = 1
    notes: Optional[str] = None


class MealPlanRecipeUpdate(BaseModel):
    day_of_plan: Optional[int] = None
    meal_type_id: Optional[int] = None
    servings: Optional[int] = None
    notes: Optional[str] = None


class MealPlanRecipe(MealPlanRecipeBase):
    id: int

    class Config:
        from_attributes = True


# Import here to avoid circular imports
from .recipe import RecipeCreate

# Update forward references
MealPlanRecipeCreateWithObjects.model_rebuild()
