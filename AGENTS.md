<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Base44 Dev Environment

- **Stack**: Next.js 16.3.4 (Turbopack) + React 19 + Recharts + Tailwind CSS v4. Frontend-only, no backend or database.
- **Run**: `docker compose -f docker-compose.base44.yml up -d` — uses `node:22-slim`, bind-mounts source, runs `npm install` then `npx next dev -H 0.0.0.0 -p 3000` on startup.
- **No external secrets required** — the app is fully client-side with no env vars.
- **Preview origin**: `next.config.ts` conditionally adds `allowedDevOrigins` when `BASE44_PREVIEW_MODE === "1"` so the preview proxy origin can access dev assets/HMR. No effect when the flag is unset.
- **Verify**: `curl http://localhost:3000/` should return 200 with the SkylaxCalculator page.
