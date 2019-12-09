FROM node:8.12.0 as builder

# Setup the work dir
ENV HOME=/srv
RUN mkdir -p $HOME
WORKDIR $HOME

# Copy the dependencies
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy most of the files in (except Dockerfile)
COPY src ./src
COPY .babelrc .eslintrc .gitignore .stylelintrc postcss.config.js webpack.config.js docker-entrypoint.sh ./

# Grab the URLs that are needed for the build
ARG api_url
ARG api_token
ARG public_network_gateway
ARG shared_sandbox_gateway
ARG public_network_gateway_app_id
ARG public_network_gateway_app_key
ARG dev_portal_url
ARG public_network
ARG ga_id
ARG gtm_id
ARG version
ARG pegnet_api_url
ARG factom_explorer_url


ENV API_URL $api_url
ENV API_TOKEN $api_token
ENV PUBLIC_NETWORK_GATEWAY $public_network_gateway
ENV PUBLIC_NETWORK_GATEWAY_APP_ID $public_network_gateway_app_id
ENV PUBLIC_NETWORK_GATEWAY_APP_KEY $public_network_gateway_app_key
ENV SHARED_SANDBOX_GATEWAY $shared_sandbox_gateway
ENV DEV_PORTAL_URL $dev_portal_url
ENV PUBLIC_NETWORK $public_network
ENV GA_ID $ga_id
ENV GTM_ID $gtm_id
ENV VERSION $version
ENV PEGNET_API_URL $pegnet_api_url
ENV FACTOM_EXPLORER_URL $factom_explorer_url

RUN npm run build

#
# Final image is /build in an nginx container
#
FROM nginx:1.14.0-alpine

RUN mkdir -p /docs
COPY --from=builder /srv/build/ /build/
COPY --from=builder /srv/docker-entrypoint.sh /build/

# Make docker-entrypoint.sh executable
RUN chmod +x /build/docker-entrypoint.sh

# Copy app.js so we always have an original version as a template
RUN cp /build/app.*.js /build/app-template.js

RUN apk --update add rsync

CMD "/build/docker-entrypoint.sh"
