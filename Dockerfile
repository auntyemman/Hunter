# Stage 1: Build dependencies (slim image)
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json yarn.lock ./

# Expose the port
EXPOSE 2024

# Install dependencies
RUN yarn install

# Build TypeScript files
CMD ["yarn", "build"]

# Stage 2: Copy application (smaller image)
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy only required files
COPY --from=builder /app/node_modules ./node_modules
COPY . .

# Set ownership and permissions
RUN chown -R node:node /app

# Switch to non-root user
USER node

# Start application
CMD ["yarn", "start"]