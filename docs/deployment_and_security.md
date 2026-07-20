# SmartBank Bharat AI — Production Deployment, Security & Monitoring Guide

**Author**: Chief Cloud Architect & DevOps Infrastructure Board  
**Target Infrastructure**: Vercel Edge (Frontend) + Render Docker (Backend) + Supabase (Database & Storage)  

---

## 1. Production Topology Overview

```
                      ┌────────────────────────────────────────────────────────┐
                      │          FRONTEND EDGE LAYER (Vercel CDN)              │
                      │  - React 18 SPA Assets                                 │
                      │  - Automatic Global Edge Distribution                 │
                      │  - Security Headers (HSTS, CSP, Frame-Options)         │
                      └───────────────────────────┬────────────────────────────┘
                                                  │
                                                  ▼ HTTPS (TLS 1.3)
                      ┌────────────────────────────────────────────────────────┐
                      │          BACKEND COMPUTE LAYER (Render Cluster)        │
                      │  - FastAPI Python 3.12 Docker Web Service              │
                      │  - Auto-scaling 4-worker instance pool                 │
                      │  - Health checks & zero-downtime rolling deploys       │
                      └───────────────────────────┬────────────────────────────┘
                                                  │
                                                  ▼ Postgres Protocol / WSS
                      ┌────────────────────────────────────────────────────────┐
                      │       DATABASE & STORAGE LAYER (Supabase Platform)     │
                      │  - Managed PostgreSQL 15 with RLS Policies             │
                      │  - Supabase Storage (Identity Document Vault)          │
                      │  - Supabase Realtime CDC Event Stream                  │
                      └────────────────────────────────────────────────────────┘
```

---

## 2. Step-by-Step Deployment Walkthrough

### Step 1: Database Provisioning on Supabase
1. Create a production PostgreSQL project in [Supabase](https://supabase.com).
2. Retrieve connection string (`postgresql+asyncpg://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres`).
3. Run Alembic schema migrations: `alembic upgrade head`.

### Step 2: Backend Deployment on Render
1. Connect GitHub repository `RohitRathore188/Smart-Bank.git` to [Render](https://render.com).
2. Deploy via Render Blueprint using `render.yaml`.
3. Configure secret environment variables (`DATABASE_URL`, `JWT_SECRET_KEY`, `GEMINI_API_KEY`, `SUPABASE_SECRET_KEY`).

### Step 3: Frontend Deployment on Vercel
1. Import repository into [Vercel](https://vercel.com) with root `apps/frontend`.
2. Configure `VITE_API_BASE_URL=https://smartbank-backend.onrender.com/api/v1`.
3. Vercel processes `vercel.json` and deploys edge SPA routing with security headers.

---

## 3. Production Readiness & Security Checklist

- [x] **Multi-Stage Docker Container**: Python 3.12 slim image with non-root `appuser` execution.
- [x] **Connection Pooler**: Configured with `asyncpg` pool size = 20, max overflow = 10.
- [x] **Rate Limiting Guard**: Token Bucket algorithm capping requests at 100 req/min per IP.
- [x] **AES-256 Field Encryption**: Sensitive customer PII encrypted at rest.
- [x] **Row Level Security (RLS)**: Enforced across all PostgreSQL tables bound to `auth.uid()`.
- [x] **HSTS Preload & Secure Headers**: Enforced via `vercel.json`.

---

## 4. Enterprise Monitoring Strategy

1. **Uvicorn Health Endpoint**: `/health` polled every 30 seconds by Render auto-healing triggers.
2. **Telemetry & Metrics**: Structured JSON logging (`structlog`) tracing request duration, HTTP status codes, and database query latencies.
3. **Alerting System**: Webhook notifications triggered on HTTP 5xx errors or CPU utilization &gt; 80%.

---

## 5. Automated Backup & Disaster Recovery Strategy

1. **Point-in-Time Recovery (PITR)**: Supabase continuous WAL archiving allowing recovery to any millisecond within 30 days.
2. **Disaster Recovery SLA**:
   - **Recovery Time Objective (RTO)**: &lt; 15 Minutes.
   - **Recovery Point Objective (RPO)**: &lt; 1 Minute.

---

*Master Deployment Guide | SmartBank Bharat AI DevOps Board*
