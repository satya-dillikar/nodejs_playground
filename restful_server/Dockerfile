# Specify a base image
# pull official base image
FROM node:16.13.0 AS build

LABEL version="1.0"
LABEL description="This is the base docker image for the js app."
LABEL maintainer = ["satya@gmail.com"]

WORKDIR /app

# server info
ENV PORT=3000

COPY ["package.json", "package-lock.json", "./"]

RUN npm install --production

COPY ["index.js", "users.json", "./"]

#app is running on 3080
EXPOSE 3080

CMD [ "node", "index.js" ]
