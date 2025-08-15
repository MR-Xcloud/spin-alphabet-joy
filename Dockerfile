# --- Stage 1: build the app ---
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# --- Stage 2: nginx to serve static assets ---
FROM nginx:stable-alpine

# Remove default nginx html (optional)
RUN rm -rf /usr/share/nginx/html/*

RUN mkdir -p /usr/share/nginx/html/spin-alphabet-joy
COPY --from=builder /app/dist /usr/share/nginx/html/spin-alphabet-joy

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8548
CMD ["nginx", "-g", "daemon off;"]