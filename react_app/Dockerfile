ARG ALPINE_VERSION=3.14
ARG GO_VERSION=1.16
ARG NODE_VERSION=16.13.0

# first container
FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS builder_web
RUN mkdir -p /web_app/
WORKDIR /web_app
# COPY ["my-app3-ts/package.json", "my-app3-ts/package-lock.json", "."]
COPY my-app3-ts/package.json .
COPY my-app3-ts/yarn.lock .
# COPY my-app3-ts/package-lock.json .
RUN yarn install
RUN yarn add typescript @types/node @types/react @types/react-dom @types/jest
RUN yarn add ts-proto
RUN yarn add grpc
RUN yarn add protoc-gen-grpc-web
RUN yarn add google-protobuf @types/google-protobuf @improbable-eng/grpc-web
RUN yarn add swagger-ui-react	
COPY my-app3-ts/ .
RUN yarn build
#app is running on 3000
# EXPOSE 3000
# CMD [ "yarn run start"]

# second container
FROM golang:${GO_VERSION}-alpine${ALPINE_VERSION} as builder_go
RUN mkdir -p /go_app/
WORKDIR /go_app
COPY helloworld_buf_ts/ .
ENV GO111MODULE=on
RUN go mod download
RUN CGO_ENABLED=0 go build -o bin/greeter_server ./greeter_server/main.go
RUN CGO_ENABLED=0 go build -o bin/greeter_client ./greeter_client/main.go

# third container
FROM alpine:${ALPINE_VERSION}
WORKDIR /home/app
RUN mkdir -p /src/web/build
COPY --from=builder_go /go_app/bin/greeter_server .
COPY --from=builder_go /go_app/bin/greeter_client .
COPY --from=builder_web /web_app/build /src/web/build
CMD ["./greeter_server"]

