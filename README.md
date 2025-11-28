# ParkRate

Theme park discovery/compare app built with Next.js (App Router), Bun, Tailwind/shadcn, and static data in `src/lib/data.ts`. Park detail pages use API routes (`/api/parks/[id]`) with flat-file state in `.data/park-state.json`.

## Local development

```bash
bun install
NEXT_PUBLIC_SITE_URL=http://localhost:3000 bun run dev
bun run lint        # type-check + ESLint
bun run test        # vitest smoke tests for home/map/compare
```

## Deployment (Hetzner)

- Host: `65.21.246.15` (root), code at `/var/www/parkrate`, process managed by `pm2` (`parkrate`).
- Bun installed at `/root/.bun/bin` (add to `PATH` when building).
- Redeploy steps:
  ```bash
  cd /var/www/parkrate
  git pull
  export PATH="/root/.bun/bin:$PATH"
  bun install
  bun run build
  pm2 restart parkrate
  ```
- Ensure your reverse proxy forwards `/api/*` to the Next server (404s on `/api/parks/{id}` usually mean proxy misrouting, not build issues).

## Env vars

- `NEXT_PUBLIC_SITE_URL` (used for metadata/canonicals/OG)
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` (optional analytics embed)

## Data and assets

- Park dataset lives in `src/lib/data.ts` and is validated at import via `validateThemeParks`.
- Images now use Wikimedia Commons FilePath URLs to avoid direct hotlink 404s.

## Notes / troubleshooting

- API routes run in Node runtime; state persists to `.data/park-state.json`.
- If images 404, confirm the Commons FilePath links resolve (they 302 to the current asset).
- PM2 status check: `pm2 ls` / logs: `pm2 logs parkrate --lines 100`.
