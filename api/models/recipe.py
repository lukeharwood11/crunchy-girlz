from datetime import datetime
from typing import Optional, List
from decimal import Decimal
from pydantic import BaseModel


class RecipeBase(BaseModel):
    title: str
    description: Optional[str] = None
    instructions: str
    prep_time_minutes: Optional[int] = None
    cook_time_minutes: Optional[int] = None
    servings: Optional[int] = None
    difficulty_level: Optional[str] = None


class RecipeCreate(RecipeBase):
    user_id: Optional[int] = None
    title_embedding: Optional[List[float]] = None


class RecipeUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    instructions: Optional[str] = None
    prep_time_minutes: Optional[int] = None
    cook_time_minutes: Optional[int] = None
    servings: Optional[int] = None
    difficulty_level: Optional[str] = None
    title_embedding: Optional[List[float]] = None


class Recipe(RecipeBase):
    id: int
    user_id: Optional[int] = None
    title_embedding: Optional[List[float]] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class RecipeIngredientLinkBase(BaseModel):
    recipe_id: int
    ingredient_id: int
    quantity: Decimal
    unit_id: Optional[int] = None
    preparation: Optional[str] = None
    notes: Optional[str] = None


class RecipeIngredientLinkCreate(RecipeIngredientLinkBase):
    pass


class RecipeIngredientLinkCreateWithObjects(BaseModel):
    recipe_id: int
    ingredient: 'IngredientCreateWithUnit'
    quantity: Decimal
    unit: Optional['UnitOfMeasureCreateWithType'] = None
    preparation: Optional[str] = None
    notes: Optional[str] = None


class RecipeIngredientLinkUpdate(BaseModel):
    quantity: Optional[Decimal] = None
    unit_id: Optional[int] = None
    preparation: Optional[str] = None
    notes: Optional[str] = None


class RecipeIngredientLink(RecipeIngredientLinkBase):
    id: int

    class Config:
        from_attributes = True


# Import here to avoid circular imports
from .ingredient import IngredientCreateWithUnit
from .unit_of_measure import UnitOfMeasureCreateWithType

# Update forward references
RecipeIngredientLinkCreateWithObjects.model_rebuild()
