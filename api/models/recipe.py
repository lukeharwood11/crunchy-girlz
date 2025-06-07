from datetime import datetime
from decimal import Decimal
from pydantic import BaseModel
from enum import Enum
from .ingredient import IngredientCreate, Ingredient
from .unit_of_measure import UnitOfMeasureCreate, UnitOfMeasure

class RecipeInstructionType(str, Enum):
    INSTRUCTION = "instruction"
    NOTE = "note"

class RecipeInstruction(BaseModel):
    step: int
    description: str
    type: RecipeInstructionType

class RecipeBase(BaseModel):
    title: str
    description: str | None = None
    instructions: list[RecipeInstruction] | None = None
    prep_time_minutes: int | None = None
    cook_time_minutes: int | None = None
    servings: int | None = None
    difficulty_level: str | None = None


class RecipeCreate(RecipeBase):
    user_id: str | None = None
    title_embedding: list[float] | None = None

    class Config:
        json_schema_extra = {
            "example": {
                "title": "Chicken Alfredo Pasta",
                "description": "Creamy pasta dish with grilled chicken and parmesan sauce",
                "prep_time_minutes": 15,
                "cook_time_minutes": 25,
                "servings": 4,
                "difficulty_level": "Medium",
            }
        }


class RecipeUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    instructions: list[RecipeInstruction] | None = None
    prep_time_minutes: int | None = None
    cook_time_minutes: int | None = None
    servings: int | None = None
    difficulty_level: str | None = None
    title_embedding: list[float] | None = None

    class Config:
        json_schema_extra = {
            "example": {
                "title": "Chicken Alfredo Pasta - Updated",
                "servings": 6,
                "prep_time_minutes": 20
            }
        }


class Recipe(RecipeBase):
    id: int
    user_id: str | None = None
    title_embedding: list[float] | None = None
    ingredients: list["RecipeIngredientLinkExpanded"] | None = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
        json_schema_extra = {
            "example": {
                "id": 1,
                "title": "Chicken Alfredo Pasta",
                "description": "Creamy pasta dish with grilled chicken and parmesan sauce",
                "instructions": "1. Cook pasta according to package directions\n2. Grill chicken breast and slice\n3. Prepare alfredo sauce\n4. Combine all ingredients",
                "prep_time_minutes": 15,
                "cook_time_minutes": 25,
                "servings": 4,
                "difficulty_level": "Medium",
                "user_id": 1,
                "created_at": "2024-01-15T10:30:00",
                "updated_at": "2024-01-15T10:30:00"
            }
        }


class RecipeIngredientLinkBase(BaseModel):
    recipe_id: int
    ingredient_id: int | None = None
    quantity: Decimal
    unit_id: int | None = None
    preparation: str | None = None
    notes: str | None = None


class RecipeIngredientLinkCreate(RecipeIngredientLinkBase):
    # Support either ingredient_id or ingredient object
    ingredient: IngredientCreate | None = None
    
    # Support either unit_id or unit object  
    unit: UnitOfMeasureCreate | None = None
    
    class Config:
        json_schema_extra = {
            "example": {
                "recipe_id": 1,
                "ingredient_id": 5,
                "quantity": "2.5",
                "unit_id": 3,
                "preparation": "diced",
                "notes": "Use fresh ingredients when possible"
            }
        }


class RecipeIngredientLinkUpdate(BaseModel):
    quantity: Decimal | None = None
    unit_id: int | None = None
    preparation: str | None = None
    notes: str | None = None

    class Config:
        json_schema_extra = {
            "example": {
                "quantity": "3.0",
                "preparation": "finely chopped"
            }
        }


class RecipeIngredientLink(RecipeIngredientLinkBase):
    id: int

    class Config:
        from_attributes = True
        json_schema_extra = {
            "example": {
                "id": 1,
                "recipe_id": 1,
                "ingredient_id": 5,
                "quantity": "2.5",
                "unit_id": 3,
                "preparation": "diced",
                "notes": "Use fresh ingredients when possible"
            }
        }


class RecipeIngredientLinkExpanded(RecipeIngredientLinkBase):
    id: int
    ingredient: Ingredient | None = None
    unit: UnitOfMeasure | None = None

    class Config:
        from_attributes = True


# Import here to avoid circular imports

# Update forward references
RecipeIngredientLinkCreate.model_rebuild()
Recipe.model_rebuild()
RecipeIngredientLinkExpanded.model_rebuild()
