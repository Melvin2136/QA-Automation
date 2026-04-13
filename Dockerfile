# ─────────────────────────────────────────────────────────────────────────────
# Dockerfile — PRISM Playwright Automation
# ─────────────────────────────────────────────────────────────────────────────
# Uses the official Playwright image which ships with all required browser
# binaries (Chromium, Firefox, WebKit) and their OS-level dependencies
# pre-installed, so no extra apt-get steps are needed.
# ─────────────────────────────────────────────────────────────────────────────

FROM mcr.microsoft.com/playwright:v1.52.0-noble

# Set working directory
WORKDIR /app

# ── Dependencies ──────────────────────────────────────────────────────────────
# Copy package manifests first to leverage Docker layer caching.
# npm ci guarantees a clean, reproducible install based on package-lock.json.
COPY package.json package-lock.json ./

RUN npm ci

# ── Application source ────────────────────────────────────────────────────────
# Copy everything else (tests, config, trained data, scripts, etc.)
COPY . .

# ── Environment ───────────────────────────────────────────────────────────────
# CI=true makes Playwright:
#   • forbid accidentally-committed test.only
#   • emit non-interactive (list) reporter output
ENV CI=true

# ── Default command ───────────────────────────────────────────────────────────
# Runs all PRISM tests headlessly (Chromium, workers=1 as configured).
# Override at runtime, e.g.:
#   docker run --env-file .env <image> npx playwright test tests/PRISM/test/uploadInvoice.spec.js
CMD ["npx", "playwright", "test", "tests/PRISM/test/"]
