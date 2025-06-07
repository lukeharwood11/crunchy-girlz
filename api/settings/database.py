from supabase import create_client, Client
from .config import config


# Create Supabase client
def get_supabase_client() -> Client:
    """Get Supabase client instance"""
    return create_client(config.SUPABASE_URL, config.SUPABASE_ANON_KEY)


def get_supabase_admin_client() -> Client:
    """Get Supabase admin client instance with service key"""
    return create_client(config.SUPABASE_URL, config.SUPABASE_SERVICE_ROLE_KEY)


# Default client instance
supabase: Client = get_supabase_client()
supabase_admin: Client = get_supabase_admin_client()