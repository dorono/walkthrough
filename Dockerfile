FROM node:8.11.3 as builder

# Setup the work dir
RUN mkdir -p /srv
WORKDIR /srv

# Copy in the list of dependencies
COPY package.json .
COPY package-lock.json .

# Install dependencies
RUN npm install

# Copy most of the files in (except Dockerfile)
COPY src ./src
COPY .babelrc .eslintrc .gitignore .stylelintrc postcss.config.js webpack.config.js ./

# Grab the URLs that are needed for the build
ARG api_url
ARG api_token
ARG public_network_gateway
ARG shared_sandbox_gateway
ARG dev_portal_url
ARG public_network
ARG version

ENV API_URL $api_url
ENV API_TOKEN $api_token
ENV PUBLIC_NETWORK_GATEWAY $public_network_gateway
ENV SHARED_SANDBOX_GATEWAY $shared_sandbox_gateway
ENV DEV_PORTAL_URL $dev_portal_url
ENV PUBLIC_NETWORK $public_network
ENV VERSION $version

RUN npm run build

#
# Final image is /build in an nginx container
#
FROM nginx:1.14.0-alpine

RUN mkdir -p /docs
COPY --from=builder /srv/build/ /build/

# Copy app.js so we always have an original version as a template
RUN cp /build/app.*.js /build/app-template.js

RUN apk --update add rsync

CMD ["/bin/sh", "-c", "envsubst '$$API_URL $$API_TOKEN' < /build/app-template.js >  $(ls /build/app.*.js | head -1) && nginx -g 'daemon off;'"]
