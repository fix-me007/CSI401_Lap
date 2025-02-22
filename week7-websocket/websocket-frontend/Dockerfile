# - this example for "todos-frontend" app
# npm install
# npm run build
# docker build -t todos-frontend .
# rm -rf dist node_modules package-lock.json

# - run as docker container
# docker run -d -p 80:80 --name todos-frontend todos-frontend

FROM nginx:alpine-slim

COPY ./dist /usr/share/nginx/html