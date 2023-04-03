FROM node:18-alpine AS builder
WORKDIR /app
COPY --chown=node:node package.json package-lock.json ./
RUN npm ci
COPY --chown=node:node . .
RUN npx nx run web-portal:build:production
# remove development dependencies
# https://gitlab.com/Larry1123/yarn-contrib/-/tree/master/packages/plugin-production-install
RUN yarn prod-install build
RUN cp -r dist build/dist

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV="production"
COPY --chown=node:node --from=builder /app/.env .env
COPY --chown=node:node --from=builder /app/build .
USER node
CMD ["node", "-r", "./.pnp.cjs", "dist/main"]
