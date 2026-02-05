from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import Dict, Any
from app.services.telegram import send_telegram_alert
import os

router = APIRouter(prefix="/leads", tags=["Leads"])

class LeadRequest(BaseModel):
    name: str
    phone: str
    audit_data: Dict[str, Any]

@app_router_post := router.post("/capture")
async def capture_lead(data: LeadRequest):
    try:
        # 1. Prepare Telegram Message
        msg = (
            f"<b>🚀 YANGI AUDIT LEAD</b>\n\n"
            f"👤 Ism: {data.name}\n"
            f"📞 Tel: {data.phone}\n"
            f"💰 Maqsad: ${data.audit_data.get('monthly_revenue_goal')}\n"
            f"❌ Yo'qotish: ${data.audit_data.get('waste_money')}\n"
            f"⚠️ Xavf Level: {data.audit_data.get('risk_level')}"
        )
        
        # 2. Send Telegram Alert
        await send_telegram_alert(msg)
        
        # 3. Save to Supabase (Logic to be added when keys are ready)
        # TODO: supabase.table("leads").insert({...}).execute()
        
        return {"status": "success", "message": "Lead captured and notification sent"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
