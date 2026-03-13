# CI/CD GitHub + aaPanel

## 1) Files already added to this repository

- `.github/workflows/deploy-aapanel.yml`
- `scripts/deploy-aapanel.sh`

## 2) GitHub Secrets

Open repository settings:

- Settings -> Secrets and variables -> Actions -> New repository secret

Create these secrets:

- `AAPANEL_WEBHOOK_URL`
    - Value: your aaPanel webhook URL from Git Manager
    - Example format: `https://your-panel:7800/hook?access_key=...`
- `DEPLOY_HEALTHCHECK_URL` (optional)
    - Value: public URL to verify app is up, for example `https://quinland.findy.my.id/up`

## 3) aaPanel setup

Open aaPanel for the target site:

- Website -> your domain -> Git Manager -> Repository tab
- Set repository URL and branch `main`
- Save

Then configure deploy script in aaPanel:

- Git Manager -> Script tab -> Add
- Alias: `laravel-deploy`
- Script content: copy from `scripts/deploy-aapanel.sh`
- Save script

Attach script to webhook deploy:

- Git Manager -> Repository tab
- In "Webhook Script", select `laravel-deploy`
- Save

## 4) Deployment flow

- Push commit to `main`
- GitHub Actions workflow `deploy-aapanel` runs
- Workflow sends POST request to aaPanel webhook
- aaPanel pulls latest code and runs deploy script
- Health check runs (if `DEPLOY_HEALTHCHECK_URL` exists)

## 5) Recommended hardening

- Rotate webhook access key after sharing screenshots
- Use a deploy key with least privilege (read-only)
- Set production environment in server `.env`:
    - `APP_ENV=production`
    - `APP_DEBUG=false`

## 6) Useful troubleshooting commands on server

Run in app directory:

```bash
php artisan about
php artisan optimize:clear
php artisan config:cache
php artisan route:cache
php artisan migrate --force
tail -n 200 storage/logs/laravel.log
```

## 7) Quick verification checklist

- Workflow run in GitHub is green
- aaPanel webhook log shows script executed successfully
- Site is reachable at domain URL
- Filament media thumbnails and frontend images load correctly
