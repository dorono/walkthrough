#!/bin/sh

# Replace references to $API_URL and $API_TOKEN by their values
TARGET_APP_JS=$(ls /build/app.*.js | head -1)

cat /build/app-template.js | envsubst '$$API_URL $$API_TOKEN' > $TARGET_APP_JS

# Run nginx
exec nginx -g 'daemon off;'