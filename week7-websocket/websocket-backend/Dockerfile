# - this example for "todos-backend" app
# docker build -t todos-backend .

# - run as docker container
# docker run -d -p 3000:3000 --name todos-backend todos-backend

FROM node:iron-slim

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN npm install

COPY . /usr/src/app

EXPOSE 3003

CMD ["node","app.js"]