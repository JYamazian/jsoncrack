FROM node:24.10.0-alpine AS base
RUN npm install -g pnpm@10.10.0

# Stage 1: Install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm && pnpm install --no-frozen-lockfile

# Stage 2: Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN corepack enable pnpm && pnpm run build

# Stage 3: Production image
FROM nginxinc/nginx-unprivileged:stable AS production

LABEL org.opencontainers.image.source=https://github.com/JYamazian/jsoncrack
LABEL org.opencontainers.image.version=v1.0.1-fork
LABEL org.opencontainers.image.title="JSON Crack"
LABEL org.opencontainers.image.description="Enhanced fork of JSON Crack with modern UI"

WORKDIR /app
COPY --from=builder /app/out /app
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
