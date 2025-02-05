# Build stage
FROM node:22 AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

COPY . .

RUN npm run build

# Host stage
FROM nginx:latest

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
