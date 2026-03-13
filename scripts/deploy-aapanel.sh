#!/usr/bin/env bash
set -euo pipefail

export HOME="${HOME:-/root}"
export COMPOSER_HOME="${COMPOSER_HOME:-/root/.composer}"
export COMPOSER_ALLOW_SUPERUSER=1

APP_DIR="/www/wwwroot/quinland.findy.my.id"
BRANCH="${BRANCH:-main}"
WEB_USER="${WEB_USER:-www}"
WEB_GROUP="${WEB_GROUP:-www}"

if ! getent passwd "$WEB_USER" >/dev/null 2>&1; then
  WEB_USER="www-data"
fi

if ! getent group "$WEB_GROUP" >/dev/null 2>&1; then
  WEB_GROUP="www-data"
fi

PHP_BIN="$(command -v php || echo /usr/bin/php)"
COMPOSER_BIN="$(command -v composer || echo /www/server/php/bin/composer)"

cd "$APP_DIR"

echo "[deploy] Start in: $APP_DIR"
echo "[deploy] Branch: $BRANCH"

# Force code to exactly match target branch from origin.
git fetch origin "$BRANCH"
git reset --hard "origin/$BRANCH"
git clean -fd

echo "[deploy] Deployed commit: $(git rev-parse --short HEAD)"

# Install/update PHP dependencies.
"$PHP_BIN" "$COMPOSER_BIN" install --no-dev --prefer-dist --optimize-autoloader --no-interaction --no-scripts

# Build frontend assets when npm exists.
if command -v npm >/dev/null 2>&1; then
  npm ci --no-audit --no-fund --loglevel=error
  npm run build --loglevel=error
else
  echo "[deploy] npm not found, skip build"
fi

# Laravel deploy steps.
if [ ! -L public/storage ]; then
  "$PHP_BIN" artisan storage:link
else
  echo "[deploy] public/storage symlink already exists"
fi
"$PHP_BIN" artisan package:discover --ansi
"$PHP_BIN" artisan migrate --force
"$PHP_BIN" artisan config:cache
"$PHP_BIN" artisan route:cache
"$PHP_BIN" artisan view:cache
"$PHP_BIN" artisan icons:cache || true
"$PHP_BIN" artisan filament:cache-components || true
"$PHP_BIN" artisan queue:restart || true

# Permissions.
chown -R "$WEB_USER":"$WEB_GROUP" . || true
chmod -R 755 storage bootstrap/cache || true

echo "[deploy] Deployment selesai"
