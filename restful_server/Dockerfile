# Specify a base image
# pull official base image
FROM node:16.13.0 AS build

LABEL version="1.0"
LABEL description="This is the base docker image for the js app."
LABEL maintainer = ["satya@gmail.com"]

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install --production

COPY . /app

#app is running on 8080
EXPOSE 8080

CMD [ "node", "index.js" ]
