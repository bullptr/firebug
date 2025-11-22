from typing import Dict, Any, Optional
from fastapi import APIRouter, Body
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from server.FirebugDatabase import FirebugDatabase


router = APIRouter(prefix="/api", tags=["wildfire-data"])
db = FirebugDatabase()


class PredictedRequest(BaseModel):
    min_lat: Optional[float] = Field(None, description="Minimum latitude")
    max_lat: Optional[float] = Field(None, description="Maximum latitude")
    min_lon: Optional[float] = Field(None, description="Minimum longitude")
    max_lon: Optional[float] = Field(None, description="Maximum longitude")
    min_probability: Optional[float] = Field(
        0.2, ge=0, le=1, description="Minimum probability threshold"
    )
    zoom: Optional[int] = Field(None, ge=4, le=18, description="Current zoom level")


@router.post("/predicted")
async def get_predicted(request: PredictedRequest = Body(...)) -> Dict[str, Any]:
    data = db.get_predicted_filtered(
        min_lat=request.min_lat,
        max_lat=request.max_lat,
        min_lon=request.min_lon,
        max_lon=request.max_lon,
        min_probability=request.min_probability,
        zoom=request.zoom,
    )
    return JSONResponse(content=data)


@router.post("/historical")
async def get_historical() -> Dict[str, Any]:
    data = db.get_historical()
    return JSONResponse(content=data)
