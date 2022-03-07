ARG ALPINE_VERSION=3.14
ARG NODE_VERSION=16.13.0

# first container
FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS builder_web
RUN mkdir -p /web_app/
WORKDIR /web_app
COPY package.json .
COPY yarn.lock .
RUN yarn install
RUN yarn add typescript @types/node @types/react @types/react-dom @types/jest
RUN yarn add ts-proto
RUN yarn add grpc
RUN yarn add protoc-gen-grpc-web
RUN yarn add google-protobuf @types/google-protobuf @improbable-eng/grpc-web
RUN yarn add swagger-ui-react	
COPY . .
RUN yarn build
# app is running on 3000
EXPOSE 3000
CMD [ "yarn run start"]
