import anthropic
import json
from datetime import date
from config import settings

client = anthropic.Anthropic(api_key=settings.anthropic_api_key)

BRIEF_SCHEMA = """
{
  "date": "YYYY-MM-DD",
  "overall_threat_level": "low | medium | high | critical",
  "threat_level_reason": "one sentence explaining today's overall level",
  "summary": "2-3 sentence paragraph overview of today's threat landscape",
  "cves": [
    {
      "id": "CVE-YYYY-XXXXX",
      "title": "short descriptive title",
      "severity": "critical | high | medium | low",
      "cvss_score": 9.8,
      "description": "technical description",
      "plain_english": "explain this like you're teaching a Security+ student - what is it, why does it matter, what could an attacker do with it",
      "affected_systems": ["Windows 11", "Apache 2.4.x"],
      "recommendation": "what should admins/defenders do right now",
      "mitre_tactic": "e.g. Initial Access, Execution, Privilege Escalation",
      "mitre_technique": "e.g. T1190 - Exploit Public-Facing Application",
      "security_plus_domain": "e.g. Threats, Vulnerabilities, and Mitigations",
      "security_plus_objective": "e.g. 2.4 - Given a scenario, analyze indicators of malicious activity"
    }
  ],
  "threat_intel": [
    {
      "title": "descriptive title",
      "source": "CISA / BleepingComputer / etc",
      "severity": "critical | high | medium | low",
      "description": "what happened",
      "plain_english": "Security+ student explanation - what tactic/technique is being used and why it matters",
      "threat_actor": "group name if known, else null",
      "mitre_tactics": ["Reconnaissance", "Initial Access"],
      "security_plus_domain": "domain name",
      "security_plus_objective": "objective code and description"
    }
  ],
  "breaches": [
    {
      "title": "Organization / Incident Name",
      "organization": "company or entity",
      "severity": "critical | high | medium | low",
      "description": "what happened",
      "plain_english": "explain what went wrong, what the attacker did, what defenders missed - frame it as a Security+ case study",
      "attack_vector": "e.g. phishing, unpatched vulnerability, credential stuffing",
      "records_affected": "e.g. 2.3 million records, or null if unknown",
      "security_plus_domain": "domain name",
      "security_plus_objective": "objective code and description",
      "lessons_learned": "one concrete takeaway a defender should internalize"
    }
  ],
  "security_plus_mappings": [
    {
      "domain": "full domain name e.g. Threats, Vulnerabilities, and Mitigations",
      "domain_number": "e.g. 2.0",
      "exam_weight": "e.g. 22%",
      "items_covered": ["brief description of what today's events covered in this domain"],
      "study_tip": "one specific actionable study tip based on today's events",
      "key_concept": "the single most important Security+ concept illustrated by today's news"
    }
  ]
}
"""

SECURITY_PLUS_DOMAINS = """
Security+ SY0-701 Exam Domains:
1.0 General Security Concepts (12%)
2.0 Threats, Vulnerabilities, and Mitigations (22%)
3.0 Security Architecture (18%)
4.0 Security Operations (28%)
5.0 Security Program Management and Oversight (20%)
"""


async def synthesize_brief(raw_data: dict, today: str) -> dict:
    cves_text = json.dumps(raw_data.get("cves", []), indent=2)
    kev_text = json.dumps(raw_data.get("kev", []), indent=2)
    news_text = json.dumps(raw_data.get("news", []), indent=2)

    prompt = f"""You are a senior cybersecurity analyst and CompTIA Security+ instructor. Your job is to analyze today's threat landscape and produce a structured daily brief that is both informationally rich and educational for someone actively studying for the Security+ SY0-701 exam.

Today's date: {today}

{SECURITY_PLUS_DOMAINS}

## New CVEs from the last 24 hours (HIGH/CRITICAL severity):
{cves_text}

## CISA Known Exploited Vulnerabilities (recently added to KEV catalog):
{kev_text}

## Security News, Advisories, and Breach Reports (last 48 hours):
{news_text}

Your task:
1. Select the 4-6 most impactful CVEs to feature (prioritize actively exploited, high CVSS, widely deployed systems)
2. Select the 2-4 most significant threat intel / advisory items
3. Select the 1-3 most notable breach or incident reports
4. Map everything to Security+ SY0-701 exam objectives - be specific with objective codes
5. Write plain_english explanations that would help a student understand the real-world context
6. Only include Security+ domain mappings for domains actually represented in today's data

If any data category is empty or thin, still produce a brief - note low activity for that category and map what you can. Never return an empty brief.

Return ONLY valid JSON matching this exact schema (no markdown, no extra text):
{BRIEF_SCHEMA}"""

    message = client.messages.create(
        model="claude-opus-4-6",
        max_tokens=8000,
        thinking={"type": "enabled", "budget_tokens": 5000},
        messages=[{"role": "user", "content": prompt}],
    )

    # Extract text from response (skip thinking blocks)
    result_text = ""
    for block in message.content:
        if block.type == "text":
            result_text = block.text
            break

    # Strip any accidental markdown fences
    result_text = result_text.strip()
    if result_text.startswith("```"):
        result_text = result_text.split("```")[1]
        if result_text.startswith("json"):
            result_text = result_text[4:]
    if result_text.endswith("```"):
        result_text = result_text[:-3]

    return json.loads(result_text.strip())
