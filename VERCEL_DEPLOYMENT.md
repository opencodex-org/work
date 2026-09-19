# Vercel deployment

The Flask app is exposed through `api/index.py` for Vercel's Python runtime.

## Deploy

1. Open https://vercel.com/new and sign in with GitHub.
2. Import `opencodex-org/work`.
3. Keep the framework preset as `Other` and deploy from `main`.
4. Vercel will assign a free `*.vercel.app` URL.

The repository can also continue running on Render using `Procfile` and `render.yaml`.
