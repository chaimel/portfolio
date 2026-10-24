#!/usr/bin/env bash
# Build the static site on this machine and publish it to the VPS.
# Run from Git Bash in this folder:  ./deploy.sh
set -euo pipefail

cd "$(dirname "$0")"

SERVER="${DEPLOY_SERVER:-ubuntu@51.79.166.95}"
WEB_ROOT="/var/www/portfolio"
SITE="https://chaimel.tukod.dev"

# siteUrl drives the canonical and og: tags (see nuxt.config.ts).
echo "==> Building the site for ${SITE}"
NUXT_PUBLIC_SITE_URL="$SITE" npm run generate

# Upload into a fresh folder first, then swap it in, so visitors never see a
# half-copied site. The previous version is removed once the new one is live.
echo "==> Uploading to ${SERVER}"
tar -C .output/public -czf - . | ssh "$SERVER" "
	set -e
	rm -rf ${WEB_ROOT}.new ${WEB_ROOT}.old
	mkdir -p ${WEB_ROOT}.new
	tar -xzf - -C ${WEB_ROOT}.new
	chmod -R a+rX ${WEB_ROOT}.new
	if [ -d ${WEB_ROOT} ]; then mv ${WEB_ROOT} ${WEB_ROOT}.old; fi
	mv ${WEB_ROOT}.new ${WEB_ROOT}
	rm -rf ${WEB_ROOT}.old
"

echo "==> Live at ${SITE}"
