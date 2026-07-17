# Hallow preview feedback

Hallow is off by default. Enable it only for a feedback preview by supplying all three build variables:

```sh
VITE_HALLOW=1 \
VITE_HALLOW_ENDPOINT=https://hallow-zeta.vercel.app/api \
VITE_HALLOW_PROJECT_KEY=applewoods \
npm run build
```

The Vercel preview is platform-blocked and cannot be deployed yet. The captain alone owns the hosted `HALLOW_PROJECT_KEYS` secret and the ingest redeploy needed to unblock it. Hosted-loop verification remains a pending follow-up and must not be reported as complete until the preview can submit to the hosted ingest service.

After the captain clears that blocker, deploy the same flagged build to Vercel Preview (never Production):

```sh
vercel \
  --build-env VITE_HALLOW=1 \
  --build-env VITE_HALLOW_ENDPOINT=https://hallow-zeta.vercel.app/api \
  --build-env VITE_HALLOW_PROJECT_KEY=applewoods
```

With the Hallow CLI on `PATH`, pull the latest submitted round using the board token supplied out of band:

```sh
HALLOW_BOARD_TOKEN="$HALLOW_BOARD_TOKEN" hallow pull \
  --endpoint https://hallow-zeta.vercel.app/api \
  --project applewoods
```

The command writes the work order and captured images under `hallow/`. Never commit the board token or add `VITE_HALLOW=1` to production environment settings. The Hallow overlay and source-stamping plugin are vendored as prebuilt bundles under `vendor/hallow/`; updating them requires rebuilding from the pinned source commit recorded there.
