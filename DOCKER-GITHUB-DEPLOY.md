# Docker & GitHub deployment — information checklist

Use this document to collect the values you need before adding Dockerfiles, Compose stacks, or GitHub Actions. Fill in the templates and keep secrets out of git (use GitHub Secrets, Docker secrets, or your host’s env UI).

For VPS/Plesk-style deploy without containers, see **`HOSTING.md`**.

---

## Docker — what to decide and provide

### 1. Image and registry

| Item | Your value |
|------|------------|
| Registry | e.g. Docker Hub, `ghcr.io`, AWS ECR, Azure ACR, private URL |
| Image name(s) | e.g. `your-org/vuleits-api`, `your-org/vuleits-web` |
| Tag strategy | e.g. `latest`, `main`, semver `1.0.0`, or git SHA |

**Sample (replace placeholders):**

```text
REGISTRY_URL=ghcr.io/your-org
API_IMAGE_NAME=vuleits-backend
WEB_IMAGE_NAME=vuleits-frontend
DEFAULT_TAG=main
```

### 2. What you run in containers

Choose one:

- **Option A**: API only (backend); site hosted elsewhere.
- **Option B**: Frontend + backend (two containers or one Compose stack).
- **Option C**: Static site (`frontend/out`) + API (e.g. nginx + API).

**Sample:**

```text
DEPLOY_MODE=compose_frontend_backend_mysql
# alternatives: api_only | static_plus_api
```

### 3. Ports (host → container)

| Role | Example |
|------|--------|
| Backend API | e.g. host `5001` → container `5001` |
| Frontend (SSR) | e.g. host `3000` → container `3000` |
| MySQL (in Compose) | often internal only; e.g. `3306` inside the network |

**Sample:**

```text
HOST_API_PORT=5001
CONTAINER_API_PORT=5001
HOST_WEB_PORT=3000
CONTAINER_WEB_PORT=3000
```

### 4. Environment variables (runtime)

Do not bake secrets into images; inject at run time (Compose `env_file`, Kubernetes secrets, host env).

**Backend** (equivalent to `backend/.env`; see also `backend/.env.example`):

```text
NODE_ENV=production
PORT=5001
DATABASE_URL=mysql://USER:PASSWORD@mysql:3306/DB_NAME
JWT_SECRET=long-random-string
CORS_ORIGINS=https://www.example.com,https://example.com
FRONTEND_ORIGIN=https://www.example.com
NEXT_PUBLIC_SITE_URL=https://www.example.com
```

**Frontend** (SSR in Docker):

```text
NODE_ENV=production
PORT=3000
# Browser-visible API URL (often your API hostname or path behind a reverse proxy)
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
# Server-side rewrites to the API inside Docker network (example service name)
BACKEND_INTERNAL_URL=http://backend:5001
```

**Static export** (values needed at **build** time; see `frontend/.env.example` and `HOSTING.md`):

```text
NEXT_PUBLIC_STATIC_EXPORT=1
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
NEXT_PUBLIC_SITE_URL=https://www.example.com
```

### 5. Database

- **Managed MySQL** (RDS, Cloud SQL, etc.) **or** **MySQL service** in Compose.
- Connection: host, port, database name, user, password (store as secrets).

**Sample:**

```text
DB_STRATEGY=container_mysql
# or: managed_mysql

MYSQL_ROOT_PASSWORD=...
MYSQL_DATABASE=vuleits_db
MYSQL_USER=...
MYSQL_PASSWORD=...
```

### 6. Reverse proxy and TLS (optional)

| Item | Your value |
|------|------------|
| Public site URL | e.g. `https://www.example.com` |
| Public API URL | e.g. `https://api.example.com` or same host with `/api` |
| TLS termination | e.g. nginx on host, Traefik, Caddy, cloud load balancer |

**Sample:**

```text
PUBLIC_SITE_URL=https://www.example.com
PUBLIC_API_URL=https://api.example.com
TLS_TERMINATION=nginx_on_host
```

### 7. Docker host capacity

Note **OS**, **RAM**, **CPU** (helps tune build parallelism, e.g. `NEXT_BUILD_LOW_PARALLEL`), and **disk** for images and volumes.

---

## GitHub — what to decide and provide

### 1. Repository

**Sample:**

```text
GITHUB_ORG_OR_USER=your-github-username
REPO_NAME=vuleits-website
DEFAULT_BRANCH=main
```

### 2. CI/CD goals

Check what you want:

- [ ] `npm ci` + `npm run build` on every PR
- [ ] Lint
- [ ] Build Docker images and push to a registry
- [ ] Deploy to a VPS over SSH
- [ ] Deploy to Kubernetes or a cloud service
- [ ] Build artifact only (upload tarball; start on server without rebuild), as in **`HOSTING.md`**

**Sample:**

```text
CI_GOALS=lint_and_build_on_pr, build_and_push_docker_on_tag, deploy_ssh_on_main
```

### 3. GitHub Secrets (names only)

Create values in **GitHub → Settings → Secrets and variables → Actions**. Do not commit real secrets.

| Secret name | Purpose |
|-------------|--------|
| `REGISTRY_USERNAME` | Registry login (if pushing images) |
| `REGISTRY_PASSWORD` or `GITHUB_TOKEN` | PAT or registry token |
| `SSH_HOST` | Deploy server hostname/IP |
| `SSH_USER` | SSH user |
| `SSH_PRIVATE_KEY` | Private key for deploy (multiline) |
| `DEPLOY_REMOTE_PATH` | Optional path on server, e.g. `/var/www/vuleits-website` |

**Database URL in CI:** Only if you run migrations from Actions; many teams run `db:push` or migrations **on the server** instead so the pipeline never needs production DB credentials.

### 4. Workflow triggers

**Sample:**

```text
TRIGGER_ON_PUSH_BRANCHES=main
TRIGGER_ON_PULL_REQUEST=true
TRIGGER_ON_TAGS=v*.*.*
```

### 5. Runner

**Sample:**

```text
RUNNER=ubuntu-latest
```

Use Linux runners so `node_modules` and Prisma engines match typical production servers (see **`HOSTING.md`** pre-built deploy rules).

---

## Master template — copy, fill, and share

Use this block to hand off requirements to your team or to generate Docker/CI files.

```text
=== PROJECT ===
Repo:
Default branch:

=== DOCKER ===
Registry (URL + namespace):
Images (names):
Deploy mode (api_only / frontend+backend / static+api):
Public URLs (site + API):
DB (managed vs container; describe connection; keep passwords in secrets):
Ports (host):

=== BACKEND ENV ===
PORT:
CORS_ORIGINS (exact origins):
FRONTEND_ORIGIN:
(Other keys from backend/.env.example as needed)

=== FRONTEND ENV ===
SSR or static export:
NEXT_PUBLIC_API_BASE_URL:
BACKEND_INTERNAL_URL (if Docker internal network):

=== GITHUB ===
CI goals (lint, build, docker push, deploy):
Deploy method (SSH, K8s, other):
Registry for Actions (Docker Hub / GHCR / other):

=== CONSTRAINTS ===
Hosting (VPS / Plesk / cloud):
Node version used locally:
Anything that must NOT run in CI (e.g. no production DB from GitHub):
```

---

## Related files in this repo

| File | Purpose |
|------|--------|
| `HOSTING.md` | Install, build, start, standalone copy, Plesk, pre-built artifacts |
| `backend/.env.example` | Backend variables |
| `frontend/.env.example` | Frontend public/build variables |
| `docker/Dockerfile.backend` | Multi-stage build for the **API** (Next standalone) |
| `docker-compose.yml` | **api** + **mysql** for local or server stacks |
| `.dockerignore` | Keeps build context small |

---

## Docker: build and push (this repo)

**Build the API image** (from the repository root):

```bash
npm run docker:build:backend
# same as:
docker build -f docker/Dockerfile.backend -t vuleits-backend:local .
```

**Run API + MySQL** (set `JWT_SECRET`, `MYSQL_*`, passwords, etc. in your shell or a `.env` in the same directory as `docker-compose.yml`):

```bash
docker compose up -d --build
```

**Push to Docker Hub** (replace `YOUR_USERNAME` and tag as needed):

1. Log in: `docker login`
2. Tag the image you built (Compose uses the name from `image:` in `docker-compose.yml`, or tag `vuleits-backend:local`):

   ```bash
   docker tag vuleits-backend:local YOUR_USERNAME/vuleits-backend:latest
   ```

3. Push:

   ```bash
   docker push YOUR_USERNAME/vuleits-backend:latest
   ```

**GitHub Container Registry** (`ghcr.io`): create a PAT with `write:packages`, then `echo $TOKEN | docker login ghcr.io -u USERNAME --password-stdin` and tag `ghcr.io/OWNER/REPO/vuleits-backend:latest`.

The **frontend** is not in this image; run it separately (host, another container, or static export) and point `NEXT_PUBLIC_API_BASE_URL` / `CORS_ORIGINS` at the deployed API URL.

After this checklist is filled, you can add concrete **`Dockerfile`**, **`docker-compose.yml`**, and **`.github/workflows/*.yml`** that match your choices.
