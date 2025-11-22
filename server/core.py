import os
import httpx
from fastapi.responses import Response
from server.utils import get_content_type, get_file_path, is_production


async def init_server(full_path: str):
    """Serve static files in production or proxy to Vite in development."""
    if is_production():
        file_path = get_file_path(full_path)

        if file_path.exists() and file_path.is_file():
            content = file_path.read_bytes()
            content_type = get_content_type(str(full_path))
            return Response(content=content, media_type=content_type)
        else:
            return Response(
                content=b"File not found", status_code=404, media_type="text/plain"
            )
    else:
        vite_url = os.getenv("VITE_DEV_SERVER", "http://localhost:5173")
        async with httpx.AsyncClient() as client:
            try:
                response = await client.get(
                    f"{vite_url}/{full_path}", follow_redirects=True
                )
                return Response(
                    content=response.content,
                    status_code=response.status_code,
                    headers=dict(response.headers),
                )
            except httpx.ConnectError:
                return Response(
                    content=b"Vite dev server not running on port 5173",
                    status_code=502,
                    media_type="text/plain",
                )
