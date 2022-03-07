
NAME:=reactapp_grpc
DOCKER_REPOSITORY:=dsatya6
DOCKER_IMAGE_NAME:=$(DOCKER_REPOSITORY)/$(NAME)
VERSION:=0.1.0

.PHONY: build clean test build-container push-container test-container

build :
	yarn install
	yarn add typescript @types/node @types/react @types/react-dom @types/jest
	yarn add ts-proto
	yarn add grpc
	yarn add protoc-gen-grpc-web
	yarn add google-protobuf @types/google-protobuf @improbable-eng/grpc-web
	yarn add swagger-ui-react	
	yarn build
	
clean :
	@rm yarn.lock
	@rm yarn-error.log
	@rm -rf node_modules
	@rm -rf build
	@rm package-lock.json

test:
	yarn run start

build-container :
	@docker build -t dsatya6/$(NAME):$(VERSION) .

push-container :
	@docker push dsatya6/$(NAME):$(VERSION)	

test-container :
	@docker rm -f $(NAME) || true
	@docker run -dp 9001:9001 --name=$(NAME) $(DOCKER_IMAGE_NAME):$(VERSION)
	@docker ps
	curl -s localhost:3000