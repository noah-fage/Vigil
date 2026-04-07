from fastapi import APIRouter, HTTPException
from fastapi.responses import HTMLResponse
from pydantic import BaseModel, EmailStr
from database import add_subscriber, remove_subscriber

router = APIRouter(prefix="/api", tags=["subscribe"])


class SubscribeRequest(BaseModel):
    email: EmailStr


@router.post("/subscribe")
async def subscribe(request: SubscribeRequest):
    try:
        add_subscriber(request.email)
        return {"message": "You're subscribed. Vigil will arrive in your inbox every morning at 8am ET."}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Subscription failed. Please try again.")


@router.get("/unsubscribe")
async def unsubscribe(email: str):
    try:
        remove_subscriber(email)
        return HTMLResponse(content="""
        <html><body style="background:#060810;color:#e2e8f0;font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0">
        <div style="text-align:center">
            <div style="font-size:24px;font-weight:700;color:#4f9cf9;letter-spacing:0.1em">VIGIL</div>
            <div style="margin-top:16px;font-size:16px">You've been unsubscribed.</div>
            <div style="margin-top:8px;color:#64748b">You won't receive any more daily briefs.</div>
            <a href="/" style="display:inline-block;margin-top:24px;color:#4f9cf9;font-size:13px">Return to Vigil</a>
        </div>
        </body></html>
        """)
    except Exception as e:
        raise HTTPException(status_code=500, detail="Could not process unsubscribe request.")
