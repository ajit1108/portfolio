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
| Contact | SMTP (`spring-boot-starter-mail`) | Server-side only | Any SMTP provider |

API endpoints:

- `GET  /api/health` — liveness probe, returns `{"status":"UP"}`
- `POST /api/chat` — `{message, context}` → `{reply, source}`; 503 when `GEMINI_API_KEY` is unset
- `POST /api/contact` — `{name, email, subject, message}` → `{status:"sent"}`; 503 when SMTP is unset

When the AI key or SMTP settings are absent the site still works: the chatbot falls
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
| `MAIL_HOST` / `MAIL_PORT` | optional | SMTP server, e.g. `smtp.gmail.com` / `587` |
| `MAIL_USERNAME` / `MAIL_PASSWORD` | optional | SMTP credentials. Gmail needs an **App Password**, not your login password |
| `CONTACT_TO` | optional | Inbox that receives contact messages |

`PORT` is injected by Render automatically. Never commit real values — only the
`.env.example` files belong in git.

---

## Deploying

Both hosts build from `main`, so a push is all that's normally needed:

1. **Render** — service `portfolio-api`, Docker, health check `/api/health`.
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
| Contact form shows "Couldn't send your message" | SMTP vars unset, so nothing can be delivered |
| First request takes ~45 s | Render free instance was asleep |
| 403 on `/api/*` from the browser | `FRONTEND_ORIGINS` doesn't match the site's exact origin |

## Updating the portfolio

- **Content** (bio, projects, skills, education): edit `frontend/src/data/portfolio.ts`,
  commit, push — Vercel redeploys automatically.
- **Styles**: `frontend/src/index.css`.
- **API behaviour**: `backend/src/main/java/com/ajit/portfolio/**` — Render rebuilds
  the Docker image on push.
- **New secrets**: add them in the Render/Vercel dashboards, never in git.
