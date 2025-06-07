from typing import List, Optional
from supabase import Client
from ..settings.database import get_supabase_client
from ..models.unit_of_measure import (
    UnitOfMeasure,
    UnitOfMeasureCreate,
    UnitOfMeasureUpdate,
    UnitOfMeasureType,
    UnitOfMeasureTypeCreate,
    UnitOfMeasureTypeUpdate,
)


class UnitOfMeasureService:
    def __init__(self):
        self.supabase: Client = get_supabase_client()
        self.table_name = "unit_of_measure"
        self.type_table_name = "unit_of_measure_type"
        self.schema = "core"

    # Unit of Measure Type methods
    async def create_unit_type(
        self, type_data: UnitOfMeasureTypeCreate
    ) -> UnitOfMeasureType:
        """Create a new unit of measure type"""
        try:
            data = type_data.model_dump(exclude_none=True)

            response = self.supabase.table(self.type_table_name).insert(data).execute()

            if not response.data:
                raise Exception("Failed to create unit type")

            return UnitOfMeasureType(**response.data[0])
        except Exception as e:
            raise Exception(f"Failed to create unit type: {str(e)}")

    async def get_unit_type(self, type_id: int) -> Optional[UnitOfMeasureType]:
        """Get unit type by ID"""
        try:
            response = (
                self.supabase.table(self.type_table_name)
                .select("*")
                .eq("id", type_id)
                .execute()
            )

            if not response.data:
                return None

            return UnitOfMeasureType(**response.data[0])
        except Exception as e:
            raise Exception(f"Failed to get unit type: {str(e)}")

    async def get_unit_types(
        self, skip: int = 0, limit: int = 100
    ) -> List[UnitOfMeasureType]:
        """Get all unit types"""
        try:
            response = (
                self.supabase.table(self.type_table_name)
                .select("*")
                .range(skip, skip + limit - 1)
                .execute()
            )

            return [UnitOfMeasureType(**item) for item in response.data]
        except Exception as e:
            raise Exception(f"Failed to get unit types: {str(e)}")

    async def update_unit_type(
        self, type_id: int, type_data: UnitOfMeasureTypeUpdate
    ) -> Optional[UnitOfMeasureType]:
        """Update a unit type"""
        try:
            data = type_data.model_dump(exclude_none=True)
            if not data:
                return await self.get_unit_type(type_id)

            response = (
                self.supabase.table(self.type_table_name)
                .update(data)
                .eq("id", type_id)
                .execute()
            )

            if not response.data:
                return None

            return UnitOfMeasureType(**response.data[0])
        except Exception as e:
            raise Exception(f"Failed to update unit type: {str(e)}")

    async def delete_unit_type(self, type_id: int) -> bool:
        """Delete a unit type"""
        try:
            response = (
                self.supabase.table(self.type_table_name)
                .delete()
                .eq("id", type_id)
                .execute()
            )
            return len(response.data) > 0
        except Exception as e:
            raise Exception(f"Failed to delete unit type: {str(e)}")

    # Unit of Measure methods
    async def create_unit(self, unit_data: UnitOfMeasureCreate) -> UnitOfMeasure:
        """Create a new unit of measure"""
        try:
            data = unit_data.model_dump(exclude_none=True)

            response = self.supabase.table(self.table_name).insert(data).execute()

            if not response.data:
                raise Exception("Failed to create unit")

            return UnitOfMeasure(**response.data[0])
        except Exception as e:
            raise Exception(f"Failed to create unit: {str(e)}")

    async def get_unit(self, unit_id: int) -> Optional[UnitOfMeasure]:
        """Get unit by ID"""
        try:
            response = (
                self.supabase.table(self.table_name)
                .select("*")
                .eq("id", unit_id)
                .execute()
            )

            if not response.data:
                return None

            return UnitOfMeasure(**response.data[0])
        except Exception as e:
            raise Exception(f"Failed to get unit: {str(e)}")

    async def get_units(
        self, skip: int = 0, limit: int = 100, type_id: Optional[int] = None
    ) -> List[UnitOfMeasure]:
        """Get all units with optional type filtering"""
        try:
            query = self.supabase.table(self.table_name).select("*")

            if type_id:
                query = query.eq("type_id", type_id)

            response = query.range(skip, skip + limit - 1).execute()

            return [UnitOfMeasure(**item) for item in response.data]
        except Exception as e:
            raise Exception(f"Failed to get units: {str(e)}")

    async def update_unit(
        self, unit_id: int, unit_data: UnitOfMeasureUpdate
    ) -> Optional[UnitOfMeasure]:
        """Update a unit"""
        try:
            data = unit_data.model_dump(exclude_none=True)
            if not data:
                return await self.get_unit(unit_id)

            response = (
                self.supabase.table(self.table_name)
                .update(data)
                .eq("id", unit_id)
                .execute()
            )

            if not response.data:
                return None

            return UnitOfMeasure(**response.data[0])
        except Exception as e:
            raise Exception(f"Failed to update unit: {str(e)}")

    async def delete_unit(self, unit_id: int) -> bool:
        """Delete a unit"""
        try:
            response = (
                self.supabase.table(self.table_name)
                .delete()
                .eq("id", unit_id)
                .execute()
            )
            return len(response.data) > 0
        except Exception as e:
            raise Exception(f"Failed to delete unit: {str(e)}")


unit_service = UnitOfMeasureService()
