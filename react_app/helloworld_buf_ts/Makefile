NAME:=grpc-backend
DOCKER_REPOSITORY:=dsatya6
DOCKER_IMAGE_NAME:=$(DOCKER_REPOSITORY)/$(NAME)
VERSION:=0.1.0

.PHONY: build clean test build-container push-container test-container

build :
	# go get github.com/grpc-ecosystem/grpc-gateway/v2/protoc-gen-grpc-gateway
	# go install github.com/grpc-ecosystem/grpc-gateway/v2/protoc-gen-grpc-gateway
	# do "make build" in "../my-app3-ts/" to generate "../my-app3-ts/node_modules/.bin/protoc-gen-ts_proto"
	buf mod update proto
	buf generate proto
	go mod tidy
	go build -o bin/greeter_server ./greeter_server/main.go
	go build -o bin/greeter_client ./greeter_client/main.go

run :
	export PORT=3090 && \
	export HOST="192.168.1.211" && \
	./bin/greeter_server &
	sleep 5
	grpcurl -plaintext 192.168.1.211:3090 list
	@echo  ""
	sleep 2
	curl -X POST -k http://192.168.1.211:3090/v1/example/echo -d '{"name" : "satya"}'
	@echo  ""


run2 :
	unset PORT && \
	unset HOST && \
	./bin/greeter_server &
	sleep 5
	grpcurl -plaintext 0.0.0.0:8090 list
	@echo  ""
	sleep 2
	curl -X POST -k http://127.0.0.1:8090/v1/example/echo -d '{"name" : "satya"}'
	@echo  ""

clean :
	@rm -rf bin/*
	@rm -rf gen/*
	@rm -rf proto/buf.lock
	@rm -rf ../my-app3-ts/src/components/gen/*


test:
	go test -v ./...

build-container :
	@docker build -t dsatya6/$(NAME):$(VERSION) .

push-container :
	@docker push dsatya6/$(NAME):$(VERSION)

test-container :
	@docker rm -f $(NAME) || true
	@docker run -d --env PORT=3050 -p 3050:3050 --name=$(NAME) $(DOCKER_IMAGE_NAME):$(VERSION)
	@docker ps
	@sleep 5
	@echo  ""
	@curl -X POST -k http://127.0.0.1:3050/v1/example/echo -d '{"name" : "satya"}'
	@echo  ""
	@grpcurl -plaintext 192.168.1.211:3050 list
	@echo  ""
	@grpcurl -plaintext  192.168.1.211:3050 describe Greeter
	@echo  ""
	@grpcurl -plaintext  192.168.1.211:3050 describe HelloRequest
	@echo  ""
	@grpcurl -plaintext  192.168.1.211:3050 describe HelloReply
	@echo  ""
	@grpcurl -plaintext -d '{ "name" : "sunny"}' 192.168.1.211:3050 Greeter.SayHello
	@echo  ""
	@grpcurl -plaintext -d '{ "name" : "sunny"}' 192.168.1.211:3050 Greeter.SayHelloAgain
	@echo  ""
	@docker stop $(NAME) || true
	@docker rm -f $(NAME) || true

test-container2 :
	@docker rm -f $(NAME) || true
	# greeter_server is running on 8090
	@docker run -dp 8090:8090 --name=$(NAME) $(DOCKER_IMAGE_NAME):$(VERSION)
	@docker ps
	@sleep 5
	@echo  ""
	@curl -X POST -k http://127.0.0.1:8090/v1/example/echo -d '{"name" : "satya"}'
	@echo  ""
	@grpcurl -plaintext 0.0.0.0:8090 list
	@echo  ""
	@grpcurl -plaintext  0.0.0.0:8090 describe Greeter
	@echo  ""
	@grpcurl -plaintext  0.0.0.0:8090 describe HelloRequest
	@echo  ""
	@grpcurl -plaintext  0.0.0.0:8090 describe HelloReply
	@echo  ""
	@grpcurl -plaintext -d '{ "name" : "sunny"}' 0.0.0.0:8090 Greeter.SayHello
	@echo  ""
	@grpcurl -plaintext -d '{ "name" : "sunny"}' 0.0.0.0:8090 Greeter.SayHelloAgain
	@echo  ""
	@sleep 2
	@docker stop $(NAME) || true
	@docker rm -f $(NAME) || true