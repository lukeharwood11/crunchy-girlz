from pydantic import BaseModel
from typing import Optional, List, Any, TypeVar, Generic

T = TypeVar("T")


class SuccessResponse(BaseModel, Generic[T]):
    success: bool = True
    message: str
    data: Optional[T] = None


class ErrorResponse(BaseModel):
    success: bool = False
    message: str
    error: Optional[str] = None


class PaginatedResponse(BaseModel):
    success: bool = True
    data: List[Any]
    total: int
    page: int
    limit: int
    has_next: bool
    has_prev: bool
