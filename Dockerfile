# frontend/Dockerfile
FROM nginx:alpine

WORKDIR /usr/local/bin

COPY ./dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf