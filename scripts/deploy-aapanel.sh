#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/www/wwwroot/quinland.findy.my.id"

cd "$APP_DIR"

echo "[deploy] Starting deployment in $APP_DIR"

# Ensure required Laravel directories are writable by current web user.
mkdir -p storage bootstrap/cache

# Install PHP dependencies for production.
composer install --no-dev --prefer-dist --optimize-autoloader --no-interaction

# Build frontend assets only when npm is available on the server.
if command -v npm >/dev/null 2>&1; then
  npm ci --no-audit --no-fund
  npm run build
else
  echo "[deploy] npm not found, skipping frontend build"
fi

# Laravel post-deploy tasks.
php artisan storage:link || true
php artisan migrate --force
php artisan optimize:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan queue:restart || true

echo "[deploy] Deployment completed successfully"
