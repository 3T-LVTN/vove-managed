FROM node:18-alpine AS builder
WORKDIR /app
COPY --chown=node:node package.json package-lock.json ./
RUN npm ci
COPY --chown=node:node . .
RUN npx nx run web-portal:build:production

FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html
COPY --from=builder /app/dist/src/frameworks-and-drivers/web/web-portal .
CMD ["nginx", "-g", "daemon off;"]
