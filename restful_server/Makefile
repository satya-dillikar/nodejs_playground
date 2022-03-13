NAME:=js-rest-server
DOCKER_REPOSITORY:=dsatya6
DOCKER_IMAGE_NAME:=$(DOCKER_REPOSITORY)/$(NAME)
VERSION:=0.1.0

.PHONY: build clean test build-container push-container test-container

install :
	npm init -y
	npm install express@4.17.1

build :
	node index.js

clean :
	@rm -rf package-lock.json yarn.lock
	@rm -rf node_modules

run:
	export HOST="192.168.1.211" && \
	export PORT=3070 && \
	node index.js &
	@sleep 5
	@curl http://192.168.1.211:3070/listusers
	@echo ""
	@sleep 2
	@curl http://192.168.1.211:3070/
	@echo ""

run2:
	unset HOST >>/dev/null && \
	unset PORT >>/dev/null && \
	node index.js &
	@sleep 5
	@curl http://localhost:8080/listusers
	@echo ""
	@sleep 2
	@curl http://localhost:8080/
	@echo ""

build-container :
	@docker build -t dsatya6/$(NAME):$(VERSION) .

push-container :
	@docker push dsatya6/$(NAME):$(VERSION)

clean-container :
	@docker stop $(NAME) || true
	@docker rm -f $(NAME) || true
	@docker rmi $(DOCKER_IMAGE_NAME):$(VERSION) || true

test-container :
	@docker rm -f $(NAME) || true
	@docker run -d --env PORT=3050 -p 3050:3050 --name=$(NAME) $(DOCKER_IMAGE_NAME):$(VERSION)
	@docker ps
	@sleep 5
	@curl http://localhost:3050/listusers
	@echo ""
	@sleep 2
	@curl http://localhost:3050/
	@echo ""
	@sleep 2
	@docker stop $(NAME) || true
	@docker rm -f $(NAME) || true
