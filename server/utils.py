import os
from pathlib import Path


def is_production() -> bool:
    return os.getenv("ENVIRONMENT") == "production"


def get_content_type(path: str) -> str:
    """Determine content type based on file extension."""
    if path.endswith(".js"):
        return "application/javascript"
    elif path.endswith(".css"):
        return "text/css"
    elif path.endswith(".json"):
        return "application/json"
    elif path.endswith(".png"):
        return "image/png"
    elif path.endswith(".jpg") or path.endswith(".jpeg"):
        return "image/jpeg"
    elif path.endswith(".svg"):
        return "image/svg+xml"
    else:
        return "text/html"


def get_file_path(path: str) -> Path:
    """Get the file path for static file serving."""
    if path == "/" or path == "":
        return Path("app/dist/index.html")
    else:
        clean_path = path.lstrip("/")
        return Path(f"app/dist/{clean_path}")
