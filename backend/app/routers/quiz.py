from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
from app.services.calculator import calculate_audit

router = APIRouter(prefix="/audit", tags=["Audit"])

class AuditRequest(BaseModel):
    monthly_revenue_goal: float
    average_check: float
    conversion_rate: Optional[float] = 5.0
    has_crm: bool = False
    has_sales_team: bool = False
    has_social_trust: bool = False

@app_router_post := router.post("/calculate")
async def get_audit_calculation(data: AuditRequest):
    try:
        results = calculate_audit(data.model_dump())
        return results
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
