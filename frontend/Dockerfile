# === Шаг 1: Сборка статики ===
FROM node:20-alpine AS builder

ARG VITE_BASE_URL
ARG VITE_API_URL
ARG VITE_CDN_URL

ENV VITE_BASE_URL=${VITE_BASE_URL}
ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_CDN_URL=${VITE_CDN_URL}

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM alpine:latest AS runner
WORKDIR /var/www

COPY --from=builder /app/dist/ .

CMD ["sh"]