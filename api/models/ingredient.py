from datetime import datetime
from typing import Optional
from pydantic import BaseModel
from .unit_of_measure import UnitOfMeasure, UnitOfMeasureCreate


class IngredientBase(BaseModel):
    name: str
    category: str | None = None
    unit_id: int | None = None


class IngredientCreate(IngredientBase): ...


class IngredientCreateWithUnit(BaseModel):
    name: str
    category: str | None = None
    unit: Optional[UnitOfMeasureCreate | UnitOfMeasure] = None


class IngredientUpdate(BaseModel):
    name: str | None = None
    category: str | None = None
    unit_id: int | None = None
    name_embedding: list[float] | None = None


class Ingredient(IngredientBase):
    id: int
    name_embedding: list[float] | None = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
