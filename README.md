# Vigil - Daily Security Brief

An autonomous cybersecurity agent that monitors CVEs, threat intel, and breaches daily - synthesizes everything with Claude AI, maps it to Security+ SY0-701 exam objectives, and delivers a morning briefing via email and a public dashboard.

## Stack

- **Frontend:** React + TypeScript + Vite (Vercel)
- **Backend:** FastAPI Python (Render)
- **Database:** Supabase (Postgres)
- **AI:** Claude Opus 4.6 with extended thinking
- **Email:** Resend
- **Data Sources:** NVD CVE API, CISA KEV feed, BleepingComputer RSS, CISA Alerts RSS

---

## Setup

### 1. Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run the contents of `supabase_schema.sql`
3. Copy your Project URL and `anon` key from Settings > API

### 2. Resend

1. Create an account at [resend.com](https://resend.com)
2. Get your API key from the dashboard
3. On the free tier, you can send from `onboarding@resend.dev` without domain verification
4. To use your own domain later, verify it in Resend and update `FROM_EMAIL` in your env

### 3. Backend (local)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Fill in your .env values
uvicorn main:app --reload
```

### 4. Frontend (local)

```bash
cd frontend
npm install
# Create frontend/.env.local with:
# VITE_API_URL=http://localhost:8000/api
npm run dev
```

---

## Triggering the Daily Brief

The agent runs via a POST request to `/api/generate` protected by your `API_KEY`.

### Option A: cron-job.org (recommended for free hosting)

1. Go to [cron-job.org](https://cron-job.org) and create a free account
2. Create a new cron job:
   - URL: `https://your-vigil-backend.onrender.com/api/generate`
   - Method: POST
   - Header: `X-API-Key: your_api_key`
   - Schedule: `0 8 * * *` (8am UTC) - adjust timezone as needed for 8am ET use `0 13 * * *`
3. Enable the job

### Option B: Render Cron Job

In your Render dashboard, you can create a Cron Job service that calls the generate endpoint on a schedule.

### Manual trigger (testing)

```bash
curl -X POST https://your-vigil-backend.onrender.com/api/generate \
  -H "X-API-Key: your_api_key"
```

---

## Deployment

### Backend (Render)

1. Push code to GitHub
2. Create a new **Web Service** on Render, connect your repo
3. Set root directory to `backend`
4. Build command: `pip install -r requirements.txt`
5. Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
6. Add all environment variables from `.env.example`

### Frontend (Vercel)

1. Create a new project on Vercel, connect your repo
2. Set root directory to `frontend`
3. Add environment variable: `VITE_API_URL=https://your-vigil-backend.onrender.com/api`
4. Deploy

---

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Health check |
| GET | `/api/brief/today` | Today's brief |
| GET | `/api/brief/archive` | List of past briefs |
| GET | `/api/brief/{date}` | Brief for specific date (YYYY-MM-DD) |
| POST | `/api/subscribe` | Subscribe email |
| GET | `/api/unsubscribe?email=...` | Unsubscribe (linked from emails) |
| POST | `/api/generate` | Generate today's brief (requires X-API-Key header) |

---

## Project Structure

```
vigil/
├── backend/
│   ├── main.py                    # FastAPI app + /generate endpoint
│   ├── config.py                  # Settings from env vars
│   ├── database.py                # Supabase queries
│   ├── requirements.txt
│   ├── .env.example
│   ├── routers/
│   │   ├── brief.py               # GET brief endpoints
│   │   └── subscribe.py           # Subscribe/unsubscribe
│   └── services/
│       ├── fetcher.py             # NVD, CISA, RSS data fetching
│       ├── claude_service.py      # Claude AI synthesis
│       └── emailer.py             # Resend email delivery
├── frontend/
│   └── src/
│       ├── components/            # All UI components
│       ├── pages/                 # Home, Archive, BriefPage
│       ├── api.ts                 # API calls
│       └── types.ts               # TypeScript types
└── supabase_schema.sql            # Run this in Supabase SQL editor
```
