# Deploy

## Vercel project setup

1. Visit https://vercel.com/new and import the GitHub repo.
2. Framework preset: **Next.js** (auto-detected).
3. Build command: leave as default (`next build`).
4. Environment variables: none required.
5. Click **Deploy**. First deploy creates `<project>.vercel.app`.

## Custom domain: oscarospina.com

### 1. Add the domain in Vercel
- Project → Settings → Domains → Add Domain → `oscarospina.com`.
- Also add `www.oscarospina.com` and set it to redirect to the apex.
- Vercel will display the DNS records to configure. Copy them.

### 2. Apply DNS records in GoDaddy
- GoDaddy → My Products → DNS for oscarospina.com.
- Replace the apex `A` record(s) with the one Vercel shows (typically `A` → `76.76.21.21`).
- Replace or add a `CNAME` for `www` → `cname.vercel-dns.com`.
- Propagation is usually under 30 minutes.

### 3. HTTPS
- Vercel auto-provisions Let's Encrypt certificates after DNS resolves. Verify the lock icon in the browser.

## Vercel Analytics
- Already wired via `@vercel/analytics` in `src/app/layout.tsx`. After the first deploy, the dashboard at Project → Analytics populates automatically.

## CI
- GitHub Actions runs `lint`, `typecheck`, `build` on every push and PR to `main`. The deploy itself is handled by Vercel's GitHub integration, not by CI.
