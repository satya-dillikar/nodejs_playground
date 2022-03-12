ARG ALPINE_VERSION=3.14
ARG NODE_VERSION=16.13.0

# first container : build environment
FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS builder_web
RUN mkdir -p /web_app/
WORKDIR /web_app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# server info
ENV API_SERVER_PORT=8090
# ENV API_SERVER_HOST="localhost"

COPY package.json .
# COPY yarn.lock .
RUN yarn install
RUN yarn add typescript @types/node @types/react @types/react-dom @types/jest
RUN yarn add ts-proto
RUN yarn add grpc
RUN yarn add protoc-gen-grpc-web
RUN yarn add google-protobuf @types/google-protobuf @improbable-eng/grpc-web
RUN yarn add swagger-ui-react
RUN yarn add @grpc/grpc-js
RUN yarn add @testing-library/react
RUN yarn add web-vitals
RUN yarn add @testing-library/jest-dom
# COPY src ./src
# COPY public ./public
COPY . ./
RUN yarn build
# RUN yarn global add serve

#second container : production environment
# FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS runner_web
# RUN mkdir -p /app/
# WORKDIR /app
# COPY --from=builder_web /web_app/build /app/build
# # app is running on 3000
# EXPOSE 3000
CMD [ "yarn", "start"]
