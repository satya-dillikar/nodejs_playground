
NAME:=grpc_frontend
DOCKER_REPOSITORY:=dsatya6
DOCKER_IMAGE_NAME:=$(DOCKER_REPOSITORY)/$(NAME)
VERSION:=0.1.0

.PHONY: build clean test build-container push-container test-container

install :
	yarn add react-scripts
	yarn add react
	yarn add typescript @types/node @types/react @types/react-dom @types/jest
	yarn add ts-proto
	yarn add google-protobuf @types/google-protobuf @improbable-eng/grpc-web
	yarn add protoc-gen-grpc-web
	yarn add swagger-ui-react
	# yarn add grpc
	yarn add @grpc/grpc-js
	yarn add @testing-library/react
	yarn add web-vitals
	yarn add @testing-library/jest-dom
	yarn install
	
build:
	yarn build

clean :
	@rm -rf yarn.lock
	@rm -rf yarn-error.log
	@rm -rf node_modules
	@rm -rf build
	@rm -rf package-lock.json

test:
	yarn run start

build-container :
	@docker build -t dsatya6/$(NAME):$(VERSION) .

push-container :
	@docker push dsatya6/$(NAME):$(VERSION)

test-container :
	@docker rm -f $(NAME) || true
	@docker run -dp 3000:3000 --name=$(NAME) $(DOCKER_IMAGE_NAME):$(VERSION)
	@docker ps
	@sleep 5
	@curl -s localhost:3000