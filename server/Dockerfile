# Multi-stage build for Node.js backend

# Stage 1: Build stage
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy TypeScript config and source code
COPY tsconfig.json ./
COPY src ./src

# Install dev dependencies for building
RUN npm install --save-dev typescript @types/node ts-node

# Compile TypeScript to JavaScript
RUN npx tsc

# Stage 2: Production stage
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy compiled JavaScript from builder stage
COPY --from=builder /app/dist ./dist

# Expose the port the app runs on
EXPOSE 3000

# Set environment to production
ENV NODE_ENV=production

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/products', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start the application
CMD ["node", "dist/index.js"]
