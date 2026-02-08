# Environment Variables

## Required Secrets (GitHub Repository Settings)

These must be configured in **Settings → Secrets and variables → Actions** for the CI build to work.

| Secret Name | Description | Example |
|---|---|---|
| `VITE_SUPABASE_URL` | Supabase project URL | `https://xxxxx.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous/public key | `eyJhbGciOiJIUzI1NiIs...` |

## How Vite env injection works

Vite replaces `import.meta.env.VITE_*` at **build time** (not runtime). This means:
- The values must be present as environment variables during `npm run build`
- In CI, they are injected via the `env:` block in `.github/workflows/deploy.yml`
- In local development, create a `.env` file at the project root (never commit it)

## Local Development

Create a `.env` file:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Verifying in Production

1. Open https://www.hotel.com.tn in a browser
2. Open DevTools → Console
3. If you see `[supabase] Supabase not configured`, the secrets were not injected at build time
4. If no such warning appears, configuration is correct

## CI Verification

The deploy workflow includes an automated check after build:
- It greps `dist/assets/*.js` for the Supabase domain
- If not found, the workflow **fails** with a clear error message
- Fix: ensure `VITE_SUPABASE_URL` secret is set in repo settings

## Behavior When Supabase Is Not Configured

- Search (hotel search via API) works normally (uses api.hotel.com.tn directly)
- Auth features (login, register, booking) are gracefully disabled
- No crash or blocking error screen
- Console shows a warning in development mode only
