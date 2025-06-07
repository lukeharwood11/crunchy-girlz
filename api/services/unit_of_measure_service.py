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
    async def create_unit_type(self, type_data: UnitOfMeasureTypeCreate) -> UnitOfMeasureType:
        """Create a new unit of measure type"""
        try:
            data = type_data.model_dump(exclude_none=True)

            response = self.supabase.schema(self.schema).table(self.type_table_name).insert(data).execute()

            if not response.data:
                raise Exception("Failed to create unit of measure type")

            return UnitOfMeasureType(**response.data[0])
        except Exception as e:
            raise Exception(f"Failed to create unit of measure type: {str(e)}")

    # Alias for backwards compatibility
    async def create_unit_of_measure_type(self, type_data: UnitOfMeasureTypeCreate) -> UnitOfMeasureType:
        return await self.create_unit_type(type_data)

    async def get_unit_type(self, type_id: int) -> Optional[UnitOfMeasureType]:
        """Get unit of measure type by ID"""
        try:
            response = (
                self.supabase.schema(self.schema).table(self.type_table_name)
                .select("*")
                .eq("id", type_id)
                .execute()
            )

            if not response.data:
                return None

            return UnitOfMeasureType(**response.data[0])
        except Exception as e:
            raise Exception(f"Failed to get unit of measure type: {str(e)}")

    # Alias for backwards compatibility
    async def get_unit_of_measure_type(self, type_id: int) -> Optional[UnitOfMeasureType]:
        return await self.get_unit_type(type_id)

    async def get_unit_types(self, skip: int = 0, limit: int = 100) -> List[UnitOfMeasureType]:
        """Get all unit of measure types"""
        try:
            response = (
                self.supabase.schema(self.schema).table(self.type_table_name)
                .select("*")
                .range(skip, skip + limit - 1)
                .execute()
            )

            return [UnitOfMeasureType(**item) for item in response.data]
        except Exception as e:
            raise Exception(f"Failed to get unit of measure types: {str(e)}")

    # Alias for backwards compatibility
    async def get_unit_of_measure_types(self, skip: int = 0, limit: int = 100) -> List[UnitOfMeasureType]:
        return await self.get_unit_types(skip, limit)

    async def update_unit_type(self, type_id: int, type_data: UnitOfMeasureTypeUpdate) -> Optional[UnitOfMeasureType]:
        """Update a unit of measure type"""
        try:
            data = type_data.model_dump(exclude_none=True)
            if not data:
                return await self.get_unit_type(type_id)

            response = (
                self.supabase.schema(self.schema).table(self.type_table_name)
                .update(data)
                .eq("id", type_id)
                .execute()
            )

            if not response.data:
                return None

            return UnitOfMeasureType(**response.data[0])
        except Exception as e:
            raise Exception(f"Failed to update unit of measure type: {str(e)}")

    # Alias for backwards compatibility
    async def update_unit_of_measure_type(self, type_id: int, type_data: UnitOfMeasureTypeUpdate) -> Optional[UnitOfMeasureType]:
        return await self.update_unit_type(type_id, type_data)

    async def delete_unit_type(self, type_id: int) -> bool:
        """Delete a unit of measure type"""
        try:
            response = (
                self.supabase.schema(self.schema).table(self.type_table_name)
                .delete()
                .eq("id", type_id)
                .execute()
            )
            return len(response.data) > 0
        except Exception as e:
            raise Exception(f"Failed to delete unit of measure type: {str(e)}")

    # Alias for backwards compatibility
    async def delete_unit_of_measure_type(self, type_id: int) -> bool:
        return await self.delete_unit_type(type_id)

    async def _upsert_unit_type(self, unit_type_data: UnitOfMeasureTypeCreate | UnitOfMeasureType) -> int:
        """Upsert a unit type and return its ID"""
        try:
            if isinstance(unit_type_data, UnitOfMeasureType):
                return unit_type_data.id
            
            data = unit_type_data.model_dump(exclude_none=True)
            # Check if unit type already exists by name
            existing = (
                self.supabase.schema(self.schema).table(self.type_table_name)
                .select("id")
                .eq("name", data["name"])
                .execute()
            )
            
            if existing.data:
                return existing.data[0]["id"]
            
            # Create new unit type
            response = await self.create_unit_type(unit_type_data)
            return response.id
        except Exception as e:
            raise Exception(f"Failed to upsert unit type: {str(e)}")

    # Unit of Measure methods
    async def create_unit(self, unit_data: UnitOfMeasureCreate) -> UnitOfMeasure:
        """Create a new unit of measure with validation and upsert functionality"""
        try:
            type_id = None
            
            # Validate type: must have either type_id or type object
            if unit_data.type_id and unit_data.type:
                raise Exception("Cannot provide both type_id and type object")
            
            if unit_data.type_id:
                # Use provided type_id directly
                type_id = unit_data.type_id
            elif unit_data.type:
                # Upsert type from object
                type_id = await self._upsert_unit_type(unit_data.type)
            # If neither is provided, type_id remains None (allowed for units without types)
            
            # Create unit
            data = {
                "name": unit_data.name,
                "type_id": type_id
            }
            
            response = self.supabase.schema(self.schema).table(self.table_name).insert(data).execute()

            if not response.data:
                raise Exception("Failed to create unit of measure")

            return UnitOfMeasure(**response.data[0])
        except Exception as e:
            raise Exception(f"Failed to create unit of measure: {str(e)}")

    # Alias for backwards compatibility
    async def create_unit_of_measure(self, unit_data: UnitOfMeasureCreate) -> UnitOfMeasure:
        return await self.create_unit(unit_data)

    async def get_unit(self, unit_id: int) -> Optional[UnitOfMeasure]:
        """Get unit of measure by ID"""
        try:
            response = (
                self.supabase.schema(self.schema).table(self.table_name)
                .select("*")
                .eq("id", unit_id)
                .execute()
            )

            if not response.data:
                return None

            return UnitOfMeasure(**response.data[0])
        except Exception as e:
            raise Exception(f"Failed to get unit of measure: {str(e)}")

    # Alias for backwards compatibility
    async def get_unit_of_measure(self, unit_id: int) -> Optional[UnitOfMeasure]:
        return await self.get_unit(unit_id)

    async def get_units(self, skip: int = 0, limit: int = 100, type_id: Optional[int] = None) -> List[UnitOfMeasure]:
        """Get all units of measure with optional filtering by type"""
        try:
            query = self.supabase.schema(self.schema).table(self.table_name).select("*")

            if type_id:
                query = query.eq("type_id", type_id)

            response = query.range(skip, skip + limit - 1).execute()

            return [UnitOfMeasure(**item) for item in response.data]
        except Exception as e:
            raise Exception(f"Failed to get units of measure: {str(e)}")

    # Alias for backwards compatibility
    async def get_units_of_measure(self, skip: int = 0, limit: int = 100, type_id: Optional[int] = None) -> List[UnitOfMeasure]:
        return await self.get_units(skip, limit, type_id)

    async def update_unit(self, unit_id: int, unit_data: UnitOfMeasureUpdate) -> Optional[UnitOfMeasure]:
        """Update a unit of measure"""
        try:
            data = unit_data.model_dump(exclude_none=True)
            if not data:
                return await self.get_unit(unit_id)

            response = (
                self.supabase.schema(self.schema).table(self.table_name)
                .update(data)
                .eq("id", unit_id)
                .execute()
            )

            if not response.data:
                return None

            return UnitOfMeasure(**response.data[0])
        except Exception as e:
            raise Exception(f"Failed to update unit of measure: {str(e)}")

    # Alias for backwards compatibility
    async def update_unit_of_measure(self, unit_id: int, unit_data: UnitOfMeasureUpdate) -> Optional[UnitOfMeasure]:
        return await self.update_unit(unit_id, unit_data)

    async def delete_unit(self, unit_id: int) -> bool:
        """Delete a unit of measure"""
        try:
            response = (
                self.supabase.schema(self.schema).table(self.table_name)
                .delete()
                .eq("id", unit_id)
                .execute()
            )
            return len(response.data) > 0
        except Exception as e:
            raise Exception(f"Failed to delete unit of measure: {str(e)}")

    # Alias for backwards compatibility
    async def delete_unit_of_measure(self, unit_id: int) -> bool:
        return await self.delete_unit(unit_id)


unit_service = UnitOfMeasureService()
