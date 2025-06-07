from datetime import datetime
from pydantic import BaseModel


class IngredientBase(BaseModel):
    name: str
    category: str | None = None


class IngredientCreate(IngredientBase):
    name: str
    category: str | None = None

    class Config:
        json_schema_extra = {
            "example": {
                "name": "Chicken Breast",
                "category": "Protein"
            }
        }


class IngredientUpdate(BaseModel):
    name: str | None = None
    category: str | None = None
    name_embedding: list[float] | None = None

    class Config:
        json_schema_extra = {
            "example": {
                "name": "Organic Chicken Breast",
                "category": "Organic Protein"
            }
        }

class Ingredient(IngredientBase):
    id: int
    name_embedding: list[float] | None = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
        json_schema_extra = {
            "example": {
                "id": 1,
                "name": "Chicken Breast",
                "category": "Protein",
                "created_at": "2024-01-15T10:30:00",
                "updated_at": "2024-01-15T10:30:00"
            }
        }
