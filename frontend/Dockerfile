# Стадия 1 - Собираем фронтенд-приложение
# FROM node:16-alpine as build

# WORKDIR /app/

# COPY package*.json  ./
# RUN npm install

# COPY . ./
# RUN npm run build

# Стадия 2 - nginx & статика фронтенда
FROM nginx:alpine

COPY prod.conf /etc/nginx/nginx.conf
COPY /dist/ /dist/

CMD ["nginx", "-g", "daemon off;"]
