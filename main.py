import os

import uvicorn
from fastapi import FastAPI

from server import frontend, api

app = FastAPI(title="Firebug")

app.include_router(api.router)
app.include_router(frontend.router)  # catch-all

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    dev_mode = os.getenv("ENVIRONMENT", "development") == "development"

    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=dev_mode, log_level="info")
