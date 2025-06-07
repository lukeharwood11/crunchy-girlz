from datetime import datetime
from typing import Optional
from pydantic import BaseModel
from enum import Enum


class UnitOfMeasureTypeBase(BaseModel):
    name: str


class UnitOfMeasureTypeCreate(UnitOfMeasureTypeBase):
    
    class Config:
        json_schema_extra = {
            "example": {
                "name": "Volume"
            }
        }


class UnitOfMeasureTypeUpdate(BaseModel):
    name: Optional[str] = None

    class Config:
        json_schema_extra = {
            "example": {
                "name": "Liquid Volume"
            }
        }


class UnitOfMeasureTypeEnum(str, Enum):
    VOLUME = "volume"
    WEIGHT = "weight"
    COUNT = "count"


class UnitOfMeasureType(UnitOfMeasureTypeBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
        json_schema_extra = {
            "example": {
                "id": 1,
                "name": "Volume",
                "created_at": "2024-01-15T10:30:00",
                "updated_at": "2024-01-15T10:30:00"
            }
        }


class UnitOfMeasureBase(BaseModel):
    name: str
    type_id: int | None = None
    type: UnitOfMeasureType | None = None


class UnitOfMeasureCreate(UnitOfMeasureBase):
    name: str
    type_id: int | None = None
    type: UnitOfMeasureTypeCreate | None = None

    class Config:
        json_schema_extra = {
            "example": {
                "name": "cup",
                "type_id": 1
            }
        }

class UnitOfMeasureUpdate(BaseModel):
    name: Optional[str] = None
    type_id: Optional[int] = None

    class Config:
        json_schema_extra = {
            "example": {
                "name": "cups",
                "type_id": 2
            }
        }


class UnitOfMeasure(UnitOfMeasureBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
        json_schema_extra = {
            "example": {
                "id": 1,
                "name": "cup",
                "type_id": 1,
                "type": {
                    "id": 1,
                    "name": "Volume",
                    "created_at": "2024-01-15T10:30:00",
                    "updated_at": "2024-01-15T10:30:00"
                },
                "created_at": "2024-01-15T10:30:00",
                "updated_at": "2024-01-15T10:30:00"
            }
        }


