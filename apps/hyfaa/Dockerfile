FROM node:10.21.0-alpine AS build

COPY package.json package-lock.json /app/
WORKDIR /app
RUN npm ci
COPY . /app
RUN npm run build

FROM nginx:1.14.2-alpine

COPY --from=build /app/dist/apps/hyfaa /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
