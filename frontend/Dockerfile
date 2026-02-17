FROM node:20-alpine AS build

WORKDIR /app

COPY vite-project/package.json vite-project/package-lock.json ./
RUN npm install

COPY vite-project/ .

ENV VITE_API_URL=http://localhost:8000
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000
