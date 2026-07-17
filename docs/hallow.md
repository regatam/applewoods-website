# Hallow preview feedback

Hallow is off by default. Enable it only for a feedback preview by supplying all three build variables:

```sh
VITE_HALLOW=1 \
VITE_HALLOW_ENDPOINT=https://hallow-zeta.vercel.app/api \
VITE_HALLOW_PROJECT_KEY=applewoods \
npm run build
```

Deploy the same flagged build to Vercel Preview (never Production):

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

The command writes the work order and captured images under `hallow/`. Never commit the board token or add `VITE_HALLOW=1` to production environment settings.
