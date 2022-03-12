ARG ALPINE_VERSION=3.14
ARG GO_VERSION=1.16

FROM golang:${GO_VERSION}-alpine${ALPINE_VERSION} as builder
#RUN apk add --no-cache build-base curl


RUN mkdir -p /go_app/

WORKDIR /go_app

COPY . .

ENV GO111MODULE=on

# server info
ENV PORT=8090
# ENV HOST=127.0.0.1

RUN go mod download

RUN CGO_ENABLED=0 go build -o bin/greeter_server ./greeter_server/main.go
# RUN CGO_ENABLED=0 go build -o bin/greeter_client ./greeter_client/main.go

FROM alpine:${ALPINE_VERSION}

WORKDIR /home/app

COPY --from=builder /go_app/bin/greeter_server .

#app is running on 8090
EXPOSE 8090

CMD ["./greeter_server"]
