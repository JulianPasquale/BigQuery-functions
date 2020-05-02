# Base build. Shared for all targets
FROM node:latest

RUN mkdir -p /app 
WORKDIR /app

COPY . ./

RUN npm install

CMD npm start
