import resend
from config import settings
import logging

logger = logging.getLogger(__name__)

resend.api_key = settings.resend_api_key

SEVERITY_COLORS = {
    "critical": "#ef4444",
    "high": "#f97316",
    "medium": "#eab308",
    "low": "#22c55e",
}

THREAT_LEVEL_COLORS = {
    "critical": "#ef4444",
    "high": "#f97316",
    "medium": "#eab308",
    "low": "#22c55e",
}


def severity_badge(severity: str) -> str:
    color = SEVERITY_COLORS.get(severity.lower(), "#94a3b8")
    return f'<span style="background:{color};color:#fff;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em">{severity.upper()}</span>'


def build_email_html(brief: dict, subscriber_email: str) -> str:
    date = brief.get("date", "")
    threat_level = brief.get("overall_threat_level", "low").upper()
    threat_color = THREAT_LEVEL_COLORS.get(brief.get("overall_threat_level", "low"), "#94a3b8")
    threat_reason = brief.get("threat_level_reason", "")
    summary = brief.get("summary", "")

    cves_html = ""
    for cve in brief.get("cves", []):
        cves_html += f"""
        <div style="background:#111827;border:1px solid #1f2937;border-radius:8px;padding:16px;margin-bottom:12px">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
                <span style="font-family:monospace;color:#4f9cf9;font-weight:700">{cve.get('id','')}</span>
                {severity_badge(cve.get('severity','low'))}
                <span style="color:#94a3b8;font-size:12px">CVSS {cve.get('cvss_score','N/A')}</span>
            </div>
            <div style="font-weight:600;color:#e2e8f0;margin-bottom:6px">{cve.get('title','')}</div>
            <div style="color:#94a3b8;font-size:13px;margin-bottom:8px">{cve.get('plain_english','')}</div>
            <div style="background:#1f2937;border-radius:4px;padding:8px;font-size:12px;color:#64748b">
                <strong style="color:#94a3b8">Security+:</strong> {cve.get('security_plus_domain','')} - {cve.get('security_plus_objective','')}
            </div>
        </div>"""

    threat_intel_html = ""
    for item in brief.get("threat_intel", []):
        threat_intel_html += f"""
        <div style="background:#111827;border:1px solid #1f2937;border-left:3px solid #8b5cf6;border-radius:8px;padding:16px;margin-bottom:12px">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
                {severity_badge(item.get('severity','low'))}
                <span style="color:#64748b;font-size:12px">{item.get('source','')}</span>
            </div>
            <div style="font-weight:600;color:#e2e8f0;margin-bottom:6px">{item.get('title','')}</div>
            <div style="color:#94a3b8;font-size:13px">{item.get('plain_english','')}</div>
        </div>"""

    breaches_html = ""
    for item in brief.get("breaches", []):
        breaches_html += f"""
        <div style="background:#111827;border:1px solid #1f2937;border-left:3px solid #ef4444;border-radius:8px;padding:16px;margin-bottom:12px">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
                {severity_badge(item.get('severity','low'))}
                <span style="color:#64748b;font-size:12px">{item.get('organization','')}</span>
            </div>
            <div style="font-weight:600;color:#e2e8f0;margin-bottom:6px">{item.get('title','')}</div>
            <div style="color:#94a3b8;font-size:13px;margin-bottom:8px">{item.get('plain_english','')}</div>
            <div style="color:#ef4444;font-size:12px"><strong>Lesson:</strong> {item.get('lessons_learned','')}</div>
        </div>"""

    sp_html = ""
    for domain in brief.get("security_plus_mappings", []):
        sp_html += f"""
        <div style="background:#111827;border:1px solid #1f2937;border-radius:8px;padding:16px;margin-bottom:12px">
            <div style="color:#4f9cf9;font-weight:700;font-size:13px">{domain.get('domain_number','')} {domain.get('domain','')}</div>
            <div style="color:#64748b;font-size:11px;margin-bottom:8px">{domain.get('exam_weight','')} of exam</div>
            <div style="color:#e2e8f0;font-size:13px;margin-bottom:8px"><strong>Key Concept:</strong> {domain.get('key_concept','')}</div>
            <div style="background:#1f2937;border-radius:4px;padding:8px;font-size:12px;color:#94a3b8">
                <strong>Study Tip:</strong> {domain.get('study_tip','')}
            </div>
        </div>"""

    unsubscribe_url = f"https://vigil-szs8.onrender.com/api/unsubscribe?email={subscriber_email}"

    return f"""<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#060810;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
<div style="max-width:680px;margin:0 auto;padding:24px 16px">

  <!-- Header -->
  <div style="text-align:center;padding:32px 0 24px">
    <div style="font-size:28px;font-weight:900;letter-spacing:0.15em;color:#4f9cf9">VIGIL</div>
    <div style="color:#475569;font-size:12px;letter-spacing:0.1em;text-transform:uppercase;margin-top:4px">Daily Security Brief</div>
    <div style="color:#64748b;font-size:13px;margin-top:8px">{date}</div>
  </div>

  <!-- Threat Level Banner -->
  <div style="background:{threat_color}18;border:1px solid {threat_color}40;border-radius:10px;padding:16px 20px;margin-bottom:24px;text-align:center">
    <div style="color:{threat_color};font-weight:800;font-size:16px;letter-spacing:0.1em">TODAY'S THREAT LEVEL: {threat_level}</div>
    <div style="color:#94a3b8;font-size:13px;margin-top:4px">{threat_reason}</div>
  </div>

  <!-- Summary -->
  <div style="background:#0c1220;border:1px solid #1a2744;border-radius:10px;padding:20px;margin-bottom:24px">
    <div style="color:#94a3b8;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:10px">Overview</div>
    <div style="color:#e2e8f0;font-size:14px;line-height:1.6">{summary}</div>
  </div>

  <!-- CVEs -->
  <div style="margin-bottom:24px">
    <div style="color:#94a3b8;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:12px;padding-bottom:8px;border-bottom:1px solid #1a2744">CVE Alerts</div>
    {cves_html}
  </div>

  <!-- Threat Intel -->
  <div style="margin-bottom:24px">
    <div style="color:#94a3b8;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:12px;padding-bottom:8px;border-bottom:1px solid #1a2744">Threat Intelligence</div>
    {threat_intel_html}
  </div>

  <!-- Breaches -->
  <div style="margin-bottom:24px">
    <div style="color:#94a3b8;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:12px;padding-bottom:8px;border-bottom:1px solid #1a2744">Breach Report</div>
    {breaches_html}
  </div>

  <!-- Security+ Map -->
  <div style="margin-bottom:32px">
    <div style="color:#94a3b8;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:12px;padding-bottom:8px;border-bottom:1px solid #1a2744">Security+ Study Map</div>
    {sp_html}
  </div>

  <!-- Footer -->
  <div style="text-align:center;padding:24px 0;border-top:1px solid #1a2744">
    <div style="color:#475569;font-size:12px">You're receiving this because you subscribed at vigil.security</div>
    <div style="margin-top:8px">
      <a href="{unsubscribe_url}" style="color:#475569;font-size:11px;text-decoration:underline">Unsubscribe</a>
    </div>
  </div>

</div>
</body>
</html>"""


async def send_brief_to_subscribers(brief: dict, subscribers: list[str]):
    if not subscribers:
        return

    date = brief.get("date", "today")
    threat_level = brief.get("overall_threat_level", "").upper()
    subject = f"Vigil Daily Brief - {date} | Threat Level: {threat_level}"

    success = 0
    failed = 0

    for email in subscribers:
        try:
            html = build_email_html(brief, email)
            resend.Emails.send({
                "from": f"Vigil <{settings.from_email}>",
                "to": [email],
                "subject": subject,
                "html": html,
            })
            success += 1
        except Exception as e:
            logger.error(f"Failed to send to {email}: {e}")
            failed += 1

    logger.info(f"Email delivery: {success} sent, {failed} failed")
    return {"sent": success, "failed": failed}
