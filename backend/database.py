from supabase import create_client, Client
from config import settings

supabase: Client = create_client(settings.supabase_url, settings.supabase_key)


def get_brief_by_date(date: str):
    result = supabase.table("briefs").select("*").eq("date", date).execute()
    if result.data:
        return result.data[0]
    return None


def get_archive(limit: int = 30):
    result = (
        supabase.table("briefs")
        .select("date, content->overall_threat_level, content->summary, content->threat_level_reason")
        .order("date", desc=True)
        .limit(limit)
        .execute()
    )
    return result.data


def upsert_brief(date: str, content: dict):
    result = (
        supabase.table("briefs")
        .upsert({"date": date, "content": content})
        .execute()
    )
    return result.data


def add_subscriber(email: str):
    result = (
        supabase.table("subscribers")
        .upsert({"email": email}, on_conflict="email")
        .execute()
    )
    return result.data


def remove_subscriber(email: str):
    result = (
        supabase.table("subscribers")
        .delete()
        .eq("email", email)
        .execute()
    )
    return result.data


def get_all_subscribers():
    result = supabase.table("subscribers").select("email").execute()
    return [row["email"] for row in result.data]
