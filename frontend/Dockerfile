# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . /app/
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage //app/build /etc/nginx/html
COPY prod.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
