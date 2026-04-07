import httpx
import feedparser
from datetime import datetime, timedelta, timezone
from typing import Optional
import logging

logger = logging.getLogger(__name__)

NVD_BASE = "https://services.nvd.nist.gov/rest/json/cves/2.0"
CISA_KEV_URL = "https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json"
CISA_ALERTS_RSS = "https://www.cisa.gov/news.xml"
BLEEPING_RSS = "https://www.bleepingcomputer.com/feed/"
DARK_READING_RSS = "https://www.darkreading.com/rss.xml"


async def fetch_nvd_cves(api_key: Optional[str] = None) -> list[dict]:
    now = datetime.now(timezone.utc)
    start = (now - timedelta(hours=24)).strftime("%Y-%m-%dT%H:%M:%S.000")
    end = now.strftime("%Y-%m-%dT%H:%M:%S.000")

    headers = {}
    if api_key:
        headers["apiKey"] = api_key

    params = {
        "pubStartDate": start,
        "pubEndDate": end,
        "cvssV3Severity": "HIGH",
    }

    results = []

    try:
        async with httpx.AsyncClient(timeout=30) as client:
            # Fetch HIGH and CRITICAL
            for severity in ["HIGH", "CRITICAL"]:
                params["cvssV3Severity"] = severity
                resp = await client.get(NVD_BASE, params=params, headers=headers)
                resp.raise_for_status()
                data = resp.json()
                vulnerabilities = data.get("vulnerabilities", [])

                for vuln in vulnerabilities[:30]:
                    cve = vuln.get("cve", {})
                    cve_id = cve.get("id", "")
                    descriptions = cve.get("descriptions", [])
                    desc = next((d["value"] for d in descriptions if d["lang"] == "en"), "")
                    metrics = cve.get("metrics", {})

                    cvss_score = None
                    cvss_vector = None
                    for key in ["cvssMetricV31", "cvssMetricV30", "cvssMetricV2"]:
                        metric_list = metrics.get(key, [])
                        if metric_list:
                            cvss_data = metric_list[0].get("cvssData", {})
                            cvss_score = cvss_data.get("baseScore")
                            cvss_vector = cvss_data.get("vectorString")
                            break

                    affected = []
                    for config in cve.get("configurations", []):
                        for node in config.get("nodes", []):
                            for match in node.get("cpeMatch", []):
                                cpe = match.get("criteria", "")
                                parts = cpe.split(":")
                                if len(parts) >= 5:
                                    affected.append(f"{parts[3]} {parts[4]}")

                    results.append({
                        "id": cve_id,
                        "description": desc[:500],
                        "cvss_score": cvss_score,
                        "cvss_vector": cvss_vector,
                        "severity": severity.lower(),
                        "published": cve.get("published", ""),
                        "affected_products": list(set(affected))[:5],
                        "references": [r["url"] for r in cve.get("references", [])[:3]],
                    })

    except Exception as e:
        logger.error(f"NVD fetch failed: {e}")

    return results


async def fetch_cisa_kev() -> list[dict]:
    try:
        async with httpx.AsyncClient(timeout=20) as client:
            resp = await client.get(CISA_KEV_URL)
            resp.raise_for_status()
            data = resp.json()

        cutoff = (datetime.now() - timedelta(days=7)).strftime("%Y-%m-%d")
        recent = [
            v for v in data.get("vulnerabilities", [])
            if v.get("dateAdded", "") >= cutoff
        ]

        return [
            {
                "id": v.get("cveID", ""),
                "name": v.get("vulnerabilityName", ""),
                "description": v.get("shortDescription", ""),
                "date_added": v.get("dateAdded", ""),
                "vendor": v.get("vendorProject", ""),
                "product": v.get("product", ""),
                "required_action": v.get("requiredAction", ""),
                "due_date": v.get("dueDate", ""),
            }
            for v in recent[:10]
        ]
    except Exception as e:
        logger.error(f"CISA KEV fetch failed: {e}")
        return []


async def fetch_security_news() -> list[dict]:
    feeds = [BLEEPING_RSS, CISA_ALERTS_RSS]
    articles = []
    cutoff = datetime.now() - timedelta(hours=48)

    for url in feeds:
        try:
            feed = feedparser.parse(url)
            source = feed.feed.get("title", url)

            for entry in feed.entries[:15]:
                published = entry.get("published_parsed")
                if published:
                    pub_dt = datetime(*published[:6])
                    if pub_dt < cutoff:
                        continue

                title = entry.get("title", "")
                summary = entry.get("summary", "")[:400]
                link = entry.get("link", "")

                security_keywords = [
                    "breach", "hack", "ransomware", "malware", "vulnerability",
                    "exploit", "attack", "phishing", "zero-day", "CVE", "threat",
                    "leak", "stolen", "compromised", "advisory", "alert"
                ]
                combined = (title + " " + summary).lower()
                if any(kw in combined for kw in security_keywords):
                    articles.append({
                        "title": title,
                        "summary": summary,
                        "link": link,
                        "source": source,
                        "published": str(entry.get("published", "")),
                    })
        except Exception as e:
            logger.error(f"RSS feed {url} failed: {e}")

    return articles[:20]


async def fetch_all():
    from config import settings
    import asyncio

    cves, kev, news = await asyncio.gather(
        fetch_nvd_cves(api_key=settings.nvd_api_key),
        fetch_cisa_kev(),
        fetch_security_news(),
    )

    return {"cves": cves, "kev": kev, "news": news}
