from fastapi import FastAPI, Header, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from datetime import date
import logging

from config import settings
from routers import brief, subscribe
from services.fetcher import fetch_all
from services.claude_service import synthesize_brief
from services.emailer import send_brief_to_subscribers
from database import upsert_brief, get_all_subscribers

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Vigil API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(brief.router)
app.include_router(subscribe.router)


@app.get("/health")
async def health():
    return {"status": "ok", "service": "vigil-api"}


@app.post("/api/generate")
async def generate_brief(x_api_key: str = Header(...)):
    if x_api_key != settings.api_key:
        raise HTTPException(status_code=401, detail="Invalid API key.")

    today = date.today().isoformat()
    logger.info(f"Generating brief for {today}")

    try:
        raw_data = await fetch_all()
        logger.info(f"Fetched: {len(raw_data['cves'])} CVEs, {len(raw_data['kev'])} KEV, {len(raw_data['news'])} news")

        brief_content = await synthesize_brief(raw_data, today)
        logger.info("Claude synthesis complete")

        upsert_brief(today, brief_content)
        logger.info("Brief saved to database")

        subscribers = get_all_subscribers()
        logger.info(f"Sending to {len(subscribers)} subscribers")

        email_result = await send_brief_to_subscribers(brief_content, subscribers)

        return {
            "status": "success",
            "date": today,
            "threat_level": brief_content.get("overall_threat_level"),
            "cves_found": len(brief_content.get("cves", [])),
            "email_result": email_result,
        }

    except Exception as e:
        logger.error(f"Brief generation failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))
