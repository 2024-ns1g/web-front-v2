# Build stage
FROM node:22 AS builder

WORKDIR /app

COPY package.json ./

# RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

RUN npm install

COPY . .

# Get args from docker-compose
ARG VITE_API_HOST
ARG VITE_API_DEFAULT_TIMEOUT
ARG VITE_LOG_LEVEL
ARG VITE_MIN_LOG_LEVEL

ENV VITE_API_HOST=$VITE_API_HOST
ENV VITE_API_DEFAULT_TIMEOUT=$VITE_API_DEFAULT_TIMEOUT
ENV VITE_LOG_LEVEL=$VITE_LOG_LEVEL
ENV VITE_MIN_LOG_LEVEL=$VITE_MIN_LOG_LEVEL

RUN npm run build

# Host stage
FROM nginx:latest

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
