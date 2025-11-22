from fastapi import APIRouter
from server.core import init_server


router = APIRouter()


@router.get("/{full_path:path}")
async def serve_frontend(full_path: str):
    """Serves static files in production or proxy to Vite in development."""
    return await init_server(full_path)
