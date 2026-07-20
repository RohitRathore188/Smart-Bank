import os
from typing import Dict, Any

class SupabaseServerClient:
    """
    Clean Architecture Supabase Server Adapter.
    Verifies users, manages JWT JWKS keys, and interacts with Supabase storage & realtime.
    """
    def __init__(self):
        self.supabase_url = os.getenv("SUPABASE_URL", "https://ldlrzvayqxstmvlxaepi.supabase.co")
        self.publishable_key = os.getenv("SUPABASE_PUBLISHABLE_KEY", "sb_publishable_G7aLD8vgAb06wCnzX1JVyw_-w5RXi3O")
        self.secret_key = os.getenv("SUPABASE_SECRET_KEY", "sb_secret_UXoxg")
        self.jwks_url = os.getenv("SUPABASE_JWKS_URL", "https://ldlrzvayqxstmvlxaepi.supabase.co/auth/v1/.well-known/jwks.json")

    def get_config(self) -> Dict[str, str]:
        return {
            "url": self.supabase_url,
            "publishable_key": self.publishable_key,
            "jwks_url": self.jwks_url
        }

supabase_client = SupabaseServerClient()
