from typing import List, Optional
from fastapi import APIRouter, HTTPException, status, Depends, Query
from ...models.unit_of_measure import (
    UnitOfMeasure,
    UnitOfMeasureCreate,
    UnitOfMeasureCreateWithType,
    UnitOfMeasureUpdate,
    UnitOfMeasureType,
    UnitOfMeasureTypeCreate,
    UnitOfMeasureTypeUpdate,
)
from ...services.unit_of_measure_service import unit_service
from ...settings.auth import get_current_user, get_optional_user
from ...contracts import SuccessResponse, ErrorResponse

router = APIRouter(prefix="/units", tags=["units"])


# Unit of Measure Type endpoints
@router.post(
    "/types", response_model=SuccessResponse, status_code=status.HTTP_201_CREATED
)
async def create_unit_type(
    type_data: UnitOfMeasureTypeCreate, current_user: dict = Depends(get_current_user)
):
    """Create a new unit of measure type (authenticated users only)"""
    try:
        unit_type = await unit_service.create_unit_type(type_data)
        return SuccessResponse(message="Unit type created successfully", data=unit_type)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@router.get("/types/{type_id}", response_model=SuccessResponse)
async def get_unit_type(
    type_id: int, current_user: Optional[dict] = Depends(get_optional_user)
):
    """Get unit type by ID (public endpoint)"""
    try:
        unit_type = await unit_service.get_unit_type(type_id)
        if not unit_type:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Unit type not found"
            )

        return SuccessResponse(
            message="Unit type retrieved successfully", data=unit_type
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.get("/types", response_model=SuccessResponse)
async def get_unit_types(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    current_user: Optional[dict] = Depends(get_optional_user),
):
    """Get all unit types (public endpoint)"""
    try:
        unit_types = await unit_service.get_unit_types(skip=skip, limit=limit)

        return SuccessResponse(
            message="Unit types retrieved successfully", data=unit_types
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.put("/types/{type_id}", response_model=SuccessResponse)
async def update_unit_type(
    type_id: int,
    type_data: UnitOfMeasureTypeUpdate,
    current_user: dict = Depends(get_current_user),
):
    """Update a unit type (authenticated users only)"""
    try:
        unit_type = await unit_service.update_unit_type(type_id, type_data)
        if not unit_type:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Unit type not found"
            )

        return SuccessResponse(message="Unit type updated successfully", data=unit_type)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@router.delete("/types/{type_id}", response_model=SuccessResponse)
async def delete_unit_type(
    type_id: int, current_user: dict = Depends(get_current_user)
):
    """Delete a unit type (authenticated users only)"""
    try:
        success = await unit_service.delete_unit_type(type_id)
        if not success:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Unit type not found"
            )

        return SuccessResponse(message="Unit type deleted successfully")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


# Unit of Measure endpoints
@router.post("/", response_model=SuccessResponse, status_code=status.HTTP_201_CREATED)
async def create_unit(
    unit_data: UnitOfMeasureCreate, current_user: dict = Depends(get_current_user)
):
    """Create a new unit of measure (authenticated users only)"""
    try:
        unit = await unit_service.create_unit(unit_data)
        return SuccessResponse(message="Unit created successfully", data=unit)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@router.post("/with-type", response_model=SuccessResponse, status_code=status.HTTP_201_CREATED)
async def create_unit_with_type(
    unit_data: UnitOfMeasureCreateWithType, current_user: dict = Depends(get_current_user)
):
    """Create a new unit of measure with full type object (authenticated users only)"""
    try:
        unit = await unit_service.create_unit_with_type(unit_data)
        return SuccessResponse(message="Unit created successfully with type", data=unit)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@router.get("/{unit_id}", response_model=SuccessResponse)
async def get_unit(
    unit_id: int, current_user: Optional[dict] = Depends(get_optional_user)
):
    """Get unit by ID (public endpoint)"""
    try:
        unit = await unit_service.get_unit(unit_id)
        if not unit:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Unit not found"
            )

        return SuccessResponse(message="Unit retrieved successfully", data=unit)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.get("/", response_model=SuccessResponse)
async def get_units(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    type_id: Optional[int] = Query(None),
    current_user: Optional[dict] = Depends(get_optional_user),
):
    """Get all units with optional type filtering (public endpoint)"""
    try:
        units = await unit_service.get_units(skip=skip, limit=limit, type_id=type_id)

        return SuccessResponse(message="Units retrieved successfully", data=units)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.put("/{unit_id}", response_model=SuccessResponse)
async def update_unit(
    unit_id: int,
    unit_data: UnitOfMeasureUpdate,
    current_user: dict = Depends(get_current_user),
):
    """Update a unit (authenticated users only)"""
    try:
        unit = await unit_service.update_unit(unit_id, unit_data)
        if not unit:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Unit not found"
            )

        return SuccessResponse(message="Unit updated successfully", data=unit)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@router.delete("/{unit_id}", response_model=SuccessResponse)
async def delete_unit(unit_id: int, current_user: dict = Depends(get_current_user)):
    """Delete a unit (authenticated users only)"""
    try:
        success = await unit_service.delete_unit(unit_id)
        if not success:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Unit not found"
            )

        return SuccessResponse(message="Unit deleted successfully")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
