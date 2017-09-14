FROM node:7.10 as builder

# Setup the work dir
RUN mkdir -p /srv
WORKDIR /srv

# Copy in the list of dependencies
COPY package.json .

# Install dependencies
RUN npm install

# Copy most of the files in (except Dockerfile)
COPY src ./src
COPY test ./test
COPY tools ./tools
COPY .babelrc .eslintrc .gitignore .nvmrc .stylelintrc postcss.config.js README.md webpack.config.js ./

# Grab the URLs that are needed for the build
ARG api_url
ARG ws_url

ENV API_URL $api_url
ENV WS_URL $ws_url

RUN echo $API_URL $WS_URL

RUN npm run build



#
# Final image is /build in an nginx container
#
FROM nginx:1.13.3-alpine

RUN mkdir -p /docs
COPY --from=builder /srv/build/ /build/

RUN apk --update add rsync







