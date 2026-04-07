from fastapi import APIRouter, HTTPException
from datetime import date
from database import get_brief_by_date, get_archive

router = APIRouter(prefix="/api/brief", tags=["brief"])


@router.get("/today")
async def get_today():
    today = date.today().isoformat()
    brief = get_brief_by_date(today)
    if not brief:
        raise HTTPException(status_code=404, detail="No brief generated yet for today. Check back after 8am ET.")
    return brief


@router.get("/archive")
async def get_archive_list(limit: int = 30):
    archive = get_archive(limit=limit)
    return {"briefs": archive}


@router.get("/{brief_date}")
async def get_brief(brief_date: str):
    brief = get_brief_by_date(brief_date)
    if not brief:
        raise HTTPException(status_code=404, detail=f"No brief found for {brief_date}.")
    return brief
