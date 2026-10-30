# Ajit Birajdar — Portfolio

Personal portfolio site: a React single-page app with a Spring Boot API behind it,
deployed as **Vercel** (static frontend) + **Render** (Docker backend).

**Live:** https://ajit-birajdar.vercel.app
**API:** https://portfolio-q2np.onrender.com
**Repo:** https://github.com/ajit1108/portfolio

```
Portfolio/
├── frontend/          React 18 + TypeScript + Vite  → Vercel
├── backend/           Spring Boot 3 + Java 21       → Render (Docker)
├── render.yaml        Render Blueprint for the backend
├── vercel.json        Build config for Git-connected deploys
└── .env.example files document every variable (in frontend/ and backend/)
```

There is **no database**. Content lives in `frontend/src/data/portfolio.ts`; the
backend is stateless.

---

## Architecture

| Piece | Technology | Host | Notes |
|---|---|---|---|
| UI | React 18, Vite 5, TypeScript | Vercel (Hobby) | Static build in `frontend/dist` |
| API | Spring Boot 3.3, Java 21 | Render (Free, Docker) | Sleeps after ~15 min idle |
| AI | Google Gemini REST API | Server-side only | `GEMINI_API_KEY` on Render |
| Contact | Brevo HTTPS API, SMTP fallback (`spring-boot-starter-mail`) | Server-side only | HTTPS works on Render's free tier |

API endpoints:

- `GET  /api/health` — liveness probe, returns `{"status":"UP"}`
- `POST /api/chat` — `{message, context}` → `{reply, source}`; 503 when `GEMINI_API_KEY` is unset
- `POST /api/contact` — `{name, email, subject, message}` → `{status:"sent"}`; 503 when neither `BREVO_API_KEY` nor SMTP is configured

When the AI key or mail settings are absent the site still works: the chatbot falls
back to keyword answers and the contact form reports an honest error with a mailto link.

---

## Local development

Terminal 1 — backend:

```bash
cd backend
mvn spring-boot:run          # http://localhost:8080
```

Terminal 2 — frontend:

```bash
cd frontend
npm install
npm run dev                  # http://localhost:5173, proxies /api to :8080
```

Production build check:

```bash
cd frontend && npm run build
cd backend  && mvn -DskipTests package
```

---

## Environment variables

### Vercel (frontend)

| Variable | Example | Purpose |
|---|---|---|
| `VITE_API_BASE_URL` | `https://portfolio-api-xxxx.onrender.com` | Backend origin. Leave empty for same-origin dev. No trailing slash. |

Vite inlines this at build time, so **redeploy after changing it**.

### Render (backend)

| Variable | Required | Purpose |
|---|---|---|
| `FRONTEND_ORIGINS` | yes | Comma-separated browser origins allowed by CORS, e.g. `https://your-site.vercel.app` |
| `GEMINI_API_KEY` | optional | Free key from https://aistudio.google.com/apikey |
| `GEMINI_MODEL` | optional | Defaults to `gemini-2.0-flash` |
| `BREVO_API_KEY` | optional | Brevo API key (v3). Preferred mail path — HTTPS, works on the free tier |
| `CONTACT_FROM` | optional | Verified Brevo sender address (falls back to `MAIL_USERNAME`) |
| `CONTACT_TO` | optional | Inbox that receives contact messages |
| `MAIL_HOST` / `MAIL_PORT` | optional | SMTP fallback, only reachable on paid Render instances |
| `MAIL_USERNAME` / `MAIL_PASSWORD` | optional | SMTP credentials |

`PORT` is injected by Render automatically. Never commit real values — only the
`.env.example` files belong in git.

#### Enabling the contact form (Brevo HTTPS API)

Render's free tier blocks outbound SMTP (ports 25, 465, 587), so production
delivers mail through Brevo's HTTPS API. If `BREVO_API_KEY` is set it wins;
otherwise the service falls back to SMTP (local dev or a paid instance).

1. Create a free Brevo account (300 emails/day): https://www.brevo.com
2. Verify the sender address: **Senders, Domains & IPs** → add your email →
   confirm the code Brevo sends you.
3. Create an API key: **SMTP & API → API Keys → Create** (v3).
4. In Render → `portfolio-q2np` → Environment, set `BREVO_API_KEY`,
   `CONTACT_FROM` (the verified address) and `CONTACT_TO` (your inbox).
5. Save and let the service redeploy. `POST /api/contact` then returns
   `{"status":"sent"}`, and the reply-to address is the visitor's email.

SMTP (Gmail App Password) remains available as a fallback on paid instances:
`MAIL_HOST=smtp.gmail.com`, `MAIL_PORT=587`, `MAIL_USERNAME`, `MAIL_PASSWORD`
(App Password, not the account password), plus `CONTACT_TO`.

---

## Deploying

Both hosts build from `main`, so a push is all that's normally needed:

1. **Render** — service `portfolio-q2np`, Docker, health check `/api/health`.
   Free instances sleep after ~15 min idle; the first request then takes 30–60 s.
2. **Vercel** — project `portfolio`, production domain `ajit-birajdar.vercel.app`.
   `VITE_API_BASE_URL` is a build-time variable, so changing it requires a redeploy.
3. Changing the frontend domain means updating `FRONTEND_ORIGINS` on Render, since
   CORS matches origins exactly (scheme + host, no trailing slash).

Manual frontend deploy without waiting for a push:

```bash
cd frontend && npx vercel --prod
```

## Troubleshooting

| Symptom | Cause |
|---|---|
| Chat replies look canned | `GEMINI_API_KEY` unset — the keyword fallback is running |
| Contact form shows "Couldn't send your message" | No mail path configured (`BREVO_API_KEY` unset and SMTP unreachable) — check Render logs |
| 503 `mail_send_failed` with `SMTP` in logs | Free-tier SMTP block; switch to Brevo HTTPS (`BREVO_API_KEY`) |
| First request takes ~45 s | Render free instance was asleep |
| 403 on `/api/*` from the browser | `FRONTEND_ORIGINS` doesn't match the site's exact origin |

## Updating the portfolio

- **Content** (bio, projects, skills, education): edit `frontend/src/data/portfolio.ts`,
  commit, push — Vercel redeploys automatically.
- **Styles**: `frontend/src/index.css`.
- **API behaviour**: `backend/src/main/java/com/ajit/portfolio/**` — Render rebuilds
  the Docker image on push.
- **New secrets**: add them in the Render/Vercel dashboards, never in git.
