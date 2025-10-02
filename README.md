# BeforeYouPost

[beforeyoupost.net](https://beforeyoupost.net/) · Give and get feedback **before** you publish. Draft smarter posts for X/Twitter, LinkedIn, Reddit, and more.

<p align="left">
  <a href="https://beforeyoupost.net/">
    <img alt="Live" src="https://img.shields.io/badge/Live-beforeyoupost.net-0A7CFF?logo=vercel&logoColor=white">
  </a>
  <a href="#-contributing">
    <img alt="PRs Welcome" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg">
  </a>
  <a href="#-license">
    <img alt="License" src="https://img.shields.io/badge/License-MIT-black.svg">
  </a>
</p>

A modern **Next.js (App Router + TypeScript)** app to crowd‑review your post drafts, score them, and collect actionable suggestions—so you only ship your best takes.

> **Heads‑up:** This README is production‑ready. Copy it into your repo root as `README.md`. Below, you'll also find a "Repo Polish Pack" of optional files (CI, issue templates, CODE_OF_CONDUCT, etc.).

---

## ✨ Features

* 📝 **Draft preview** with rich text & image support
* ⭐ **Feedback & ratings** (concise + detailed suggestions)
* 🗳️ **Vote / sort** by Most Helpful, New, or Critical
* 🔐 **Privacy modes:** private link, unlisted, or public
* 🏷️ **Categories & tags** (e.g., X, LinkedIn, Reddit)
* 🏁 **Ready-to-post export** (copy formats, hashtags, mentions)
* 📊 **Simple analytics** (views, feedback rate, avg. score)
* 🌙 **Dark mode** out of the box

> Roadmap ideas: AI rewrite suggestions, tone checker, scheduling helpers, team spaces.

---

## 🧱 Tech Stack

* **Framework:** Next.js 14+ (App Router), React, TypeScript
* **Styling:** Tailwind CSS
* **Forms/UI:** Headless UI / Radix + custom components
* **Data Layer:** bring your own (e.g., Prisma + PostgreSQL / Supabase)
* **Auth (optional):** NextAuth.js
* **Deploy:** Vercel

> You can trim/adjust this list to match your exact stack.

---

## 🚀 Quick Start

```bash
# 1) Install
pnpm install # or npm/yarn/bun

# 2) Env vars
cp .env.example .env.local
# fill values (see table below)

# 3) Dev
pnpm dev
# http://localhost:3000

# 4) Lint & typecheck
pnpm lint && pnpm typecheck

# 5) Build
pnpm build && pnpm start
```

---

## 🔑 Environment Variables

Create `.env.local` (not committed). Start from `.env.example`.

| Variable               | Required | Example                                                              | Notes                                       |
| ---------------------- | :------: | -------------------------------------------------------------------- | ------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` |     ✅    | `https://beforeyoupost.net`                                          | Used for OG tags & canonical URLs           |
| `DATABASE_URL`         |     ✅    | `mysql://user:pass@127.0.0.1:3306/beforeyoupost?connection_limit=10` | Prisma connection string (provider = mysql) |
| `MYSQL_HOST`           |    ⏭️    | `127.0.0.1`                                                          | If using `mysql2`/pool directly             |
| `MYSQL_PORT`           |    ⏭️    | `3306`                                                               |                                             |
| `MYSQL_USER`           |    ⏭️    | `app_user`                                                           |                                             |
| `MYSQL_PASSWORD`       |    ⏭️    | `supersecret`                                                        |                                             |
| `MYSQL_DATABASE`       |    ⏭️    | `beforeyoupost`                                                      |                                             |
| `AUTH_SECRET`          |    ⏭️    | `your-32-char-secret`                                                | If using NextAuth                           |
| `NEXTAUTH_URL`         |    ⏭️    | `http://localhost:3000`                                              | NextAuth local/dev                          |

> Use either `DATABASE_URL` (with Prisma) **or** the individual `MYSQL_*` vars (with a native client).

---

## 🗄️ MySQL Setup (EC2)

```bash
# SSH into your EC2 Ubuntu host
ssh ubuntu@YOUR_SERVER_IP

# Install MySQL Server (if not already)
sudo apt update && sudo apt install -y mysql-server

# Secure it (set root password, remove test DB, etc.)
sudo mysql_secure_installation

# Create DB + user (inside MySQL shell)
sudo mysql -u root -p <<'SQL'
CREATE DATABASE IF NOT EXISTS beforeyoupost CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS 'app_user'@'localhost' IDENTIFIED BY 'CHANGE_ME_STRONG_PW';
GRANT ALL PRIVILEGES ON beforeyoupost.* TO 'app_user'@'localhost';
FLUSH PRIVILEGES;
SQL
```

**Prisma?** Set your `schema.prisma` to:

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

Then run migrations:

```bash
pnpm prisma generate
pnpm prisma migrate deploy   # in prod (or `migrate dev` locally)
```

## 📁 Project Structure

```
app/
  (marketing)/
  (app)/
  api/
components/
lib/
public/
styles/
```

---

## 🧪 Scripts

Add/adjust these in `package.json` as needed:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "format": "prettier --write ."
  }
}
```

---

## 📸 Screenshots

Add a couple of PNGs under `public/` and reference them here:

```
![Draft page](./public/screenshot-draft.png)
![Feedback thread](./public/screenshot-feedback.png)
```

---

## 📦 Deploy — EC2 (Ubuntu + Nginx + PM2)

> Assumes a domain `beforeyoupost.net`, Node.js 20, and MySQL on the same host. Adjust as needed.

### 1) System prep

```bash
# On EC2 (Ubuntu)
sudo apt update && sudo apt install -y build-essential git ufw nginx

# Node 20 (via NodeSource)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# PM2 for process management
sudo npm i -g pm2

# Firewall (allow SSH + HTTP + HTTPS)
sudo ufw allow OpenSSH
sudo ufw allow "Nginx Full"
sudo ufw --force enable
```

### 2) App setup

```bash
# App directory
sudo mkdir -p /var/www/beforeyoupost && sudo chown -R $USER:$USER /var/www/beforeyoupost
cd /var/www/beforeyoupost

# Pull your code
git clone YOUR_REPO_URL .

# Env vars
cp .env.example .env.local
nano .env.local  # fill MySQL + site URL

# Install + build
pnpm install --frozen-lockfile
pnpm build
```

### 3) Run with PM2

```bash
# Start Next.js (port 3000 by default)
pm2 start "pnpm start" --name beforeyoupost
pm2 save
pm2 startup systemd  # follow the printed command
```

**Optional PM2 config (`ecosystem.config.cjs`):**

```js
module.exports = {
  apps: [{
    name: 'beforeyoupost',
    script: 'pnpm',
    args: 'start',
    cwd: '/var/www/beforeyoupost',
    env: { NODE_ENV: 'production' }
  }]
}
```

Start with: `pm2 start ecosystem.config.cjs && pm2 save`.

### 4) Nginx reverse proxy

```nginx
# /etc/nginx/sites-available/beforeyoupost
server {
  listen 80;
  server_name beforeyoupost.net www.beforeyoupost.net;

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}
```

```bash
sudo tee /etc/nginx/sites-available/beforeyoupost > /dev/null <<'NGINX'
server {
  listen 80;
  server_name beforeyoupost.net www.beforeyoupost.net;

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}
NGINX

sudo ln -s /etc/nginx/sites-available/beforeyoupost /etc/nginx/sites-enabled/beforeyoupost
sudo nginx -t && sudo systemctl reload nginx
```

### 5) SSL with Let’s Encrypt

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d beforeyoupost.net -d www.beforeyoupost.net
# auto‑renewal is installed as a timer; check with:
sudo systemctl status certbot.timer
```

### 6) Migrations & health

```bash
# If using Prisma (after env + DB ready)
pnpm prisma migrate deploy

# Check app
curl -I https://beforeyoupost.net/
pm2 logs beforeyoupost --lines 200
```

### 7) Backups (basic)

```bash
# Daily dump (root crontab: sudo crontab -e)
0 3 * * * mysqldump -u root -p'YOUR_ROOT_PW' beforeyoupost | gzip > /var/backups/byo_$(date +\%F).sql.gz
```

> **Scaling tips:** Use PM2 cluster mode (`pm2 start ecosystem.config.cjs -i max`), enable GZip/Brotli on Nginx, serve static assets via `next build` output (already optimized). Consider moving DB to RDS for durability when you’re ready.

### Optional: Deploy on Vercel

If you later move the front end to Vercel, point it to your EC2 API or shared DB and set the same env vars.

---

## 🤝 Contributing

* Use **feature branches** and **conventional commits** (`feat:`, `fix:`, `chore:`)
* Run `pnpm lint && pnpm typecheck` before opening a PR
* Small, focused PRs get merged faster

See **CONTRIBUTING.md** below for details.

---

## 🛡️ Security

Found a vulnerability? Please see **SECURITY.md** below to report it responsibly.

---

## 📜 License

MIT © 2025 Abdallah Bahrawi

---

## 📬 Contact

* Site: **[beforeyoupost.net](https://beforeyoupost.net/)**
* X/Twitter: *add yours*
* Email: *add yours*

---

# Repo Polish Pack (drop‑in files)

> Create these files in your repo to get a solid baseline. Tweak as needed.

## `.env.example`

```dotenv
# Public
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# MySQL via Prisma (preferred)
DATABASE_URL="mysql://app_user:CHANGE_ME_STRONG_PW@127.0.0.1:3306/beforeyoupost?connection_limit=10"

# OR MySQL native client
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
MYSQL_USER=app_user
MYSQL_PASSWORD=CHANGE_ME_STRONG_PW
MYSQL_DATABASE=beforeyoupost

# Auth (if used)
AUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000
```

## `.editorconfig`

```ini
root = true

[*]
charset = utf-8
end_of_line = lf
indent_style = space
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true
```

## `.prettierrc`

```json
{
  "singleQuote": false,
  "semi": true,
  "trailingComma": "es5",
  "printWidth": 100
}
```

## `.nvmrc`

```bash
20
```

## `.eslintrc.json`

```json
{
  "extends": ["next/core-web-vitals", "eslint:recommended"],
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "rules": {
    "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }]
  }
}
```

## `vercel.json`

```json
{
  "cleanUrls": true,
  "trailingSlash": false
}
```

## `.github/workflows/ci.yml`

```yaml
name: CI
on:
  pull_request:
  push:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "pnpm"
      - uses: pnpm/action-setup@v4
        with:
          version: 9
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm typecheck
      - run: pnpm build
```

## `.github/PULL_REQUEST_TEMPLATE.md`

```markdown
## Summary

- What does this PR do?

## Changes

- [ ] Feature
- [ ] Fix
- [ ] Chore

## Screenshots / Demos

(If UI changes)

## Checklist
- [ ] Linted and typechecked
- [ ] Self‑reviewed
- [ ] Added tests or not needed
```

## `.github/ISSUE_TEMPLATE/bug_report.yml`

```yaml
name: Bug report
labels: [bug]
description: File a bug
body:
  - type: textarea
    id: what-happened
    attributes:
      label: What happened?
      description: Also tell us what you expected to happen.
    validations:
      required: true
  - type: input
    id: url
    attributes:
      label: Link (if public)
  - type: textarea
    id: steps
    attributes:
      label: Steps to reproduce
  - type: textarea
    id: env
    attributes:
      label: Environment
      description: OS, Browser, etc.
```

## `.github/ISSUE_TEMPLATE/feature_request.yml`

```yaml
name: Feature request
labels: [enhancement]
description: Suggest an idea
body:
  - type: textarea
    id: problem
    attributes:
      label: Problem
  - type: textarea
    id: solution
    attributes:
      label: Proposed solution
  - type: textarea
    id: extras
    attributes:
      label: Alternatives / context
```

## `CONTRIBUTING.md`

```markdown
# Contributing

Thanks for considering a contribution! Please:

1. Fork and create a feature branch.
2. Use conventional commits (e.g., `feat:`, `fix:`).
3. Run `pnpm lint && pnpm typecheck` before pushing.
4. Open a PR with a clear description and screenshots (if UI).

Small PRs merge faster 💚
```

