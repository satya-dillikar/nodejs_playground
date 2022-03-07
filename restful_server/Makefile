
NAME:=js-docker
DOCKER_REPOSITORY:=dsatya6
DOCKER_IMAGE_NAME:=$(DOCKER_REPOSITORY)/$(NAME)
VERSION:=0.1.0

.PHONY: build clean test build-container push-container test-container

build :
	npm init -y
	npm install express@4.17.1
	node index.js  

clean :
	@echo ""

test:
	node index.js  
	npm test

build-container :
	@docker build -t dsatya6/$(NAME):$(VERSION) .

push-container :
	@docker push dsatya6/$(NAME):$(VERSION)	

test-container :
	@docker rm -f $(NAME) || true
	# python server is running a 8080, map to docker 8080
	@docker run -dp 8080:8080 --name=$(NAME) $(DOCKER_IMAGE_NAME):$(VERSION)
	@docker ps
	curl http://127.0.0.1:8080/listusers
	@echo ""
	@curl http://localhost:8080/
