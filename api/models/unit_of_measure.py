from datetime import datetime
from typing import Optional
from pydantic import BaseModel


class UnitOfMeasureTypeBase(BaseModel):
    name: str


class UnitOfMeasureTypeCreate(UnitOfMeasureTypeBase):
    pass


class UnitOfMeasureTypeUpdate(BaseModel):
    name: Optional[str] = None


class UnitOfMeasureType(UnitOfMeasureTypeBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class UnitOfMeasureBase(BaseModel):
    name: str
    type_id: Optional[int] = None


class UnitOfMeasureCreate(UnitOfMeasureBase):
    pass


class UnitOfMeasureUpdate(BaseModel):
    name: Optional[str] = None
    type_id: Optional[int] = None


class UnitOfMeasure(UnitOfMeasureBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
