#!/bin/sh

# Replace references to $API_URL and $API_TOKEN by their values
TARGET_APP_JS=$(ls /build/app.*.js | head -1)

cat /build/app-template.js | envsubst '$$PEGNET_API_URL $$FACTOM_EXPLORER_URL $$PUBLIC_NETWORK_GATEWAY_APP_ID $$PUBLIC_NETWORK_GATEWAY_APP_KEY $$API_URL $$API_TOKEN' > $TARGET_APP_JS

# Create app.*.js.gz file
# -fk flags keep .js file and force compression even if app.*.js.gz file exists
gzip $TARGET_APP_JS -fk

# Run nginx
exec nginx -g 'daemon off;'
