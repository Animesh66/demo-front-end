# Docker Deployment Guide

This guide provides detailed instructions for deploying the E-Commerce application using Docker.

## Quick Start

```bash
# Build and start all services
docker compose up --build

# Access the application
# Frontend: http://localhost:8080
# Backend API: http://localhost:3000
```

## Architecture

The Docker setup consists of:

### Services

1. **Server (Backend)**
   - Node.js 18 Alpine
   - Express API
   - Port: 3000
   - Multi-stage build for optimization

2. **Client (Frontend)**
   - Nginx Alpine
   - React SPA
   - Port: 8080 (maps to container port 80)
   - Multi-stage build with Vite

### Network

- Custom bridge network: `ecommerce-network`
- Allows inter-container communication
- Isolated from host network

## File Structure

```
demo-front-end/
├── docker-compose.yml          # Orchestration configuration
├── server/
│   ├── Dockerfile             # Backend container definition
│   └── .dockerignore          # Exclude files from build
└── client/
    ├── Dockerfile             # Frontend container definition
    ├── nginx.conf             # Nginx configuration
    └── .dockerignore          # Exclude files from build
```

## Docker Compose Commands

### Starting Services

```bash
# Build and start (recommended for first time)
docker compose up --build

# Start in detached mode (background)
docker compose up -d

# Start without rebuilding
docker compose up

# Start specific service
docker compose up server
docker compose up client
```

### Stopping Services

```bash
# Stop containers (keeps data)
docker compose stop

# Stop and remove containers
docker compose down

# Stop and remove containers + volumes
docker compose down -v

# Stop and remove containers + images
docker compose down --rmi all
```

### Viewing Logs

```bash
# View all logs
docker compose logs

# View logs for specific service
docker compose logs server
docker compose logs client

# Follow logs in real-time
docker compose logs -f

# View last 100 lines
docker compose logs --tail=100
```

### Managing Containers

```bash
# List running containers
docker compose ps

# List all containers (including stopped)
docker compose ps -a

# Restart services
docker compose restart

# Restart specific service
docker compose restart server

# Execute command in running container
docker compose exec server sh
docker compose exec client sh

# View container resource usage
docker compose stats
```

## Building Images

### Build All Services

```bash
# Build all images
docker compose build

# Build without cache (clean build)
docker compose build --no-cache

# Build with progress output
docker compose build --progress=plain
```

### Build Specific Service

```bash
# Build only server
docker compose build server

# Build only client
docker compose build client
```

### Manual Build (without Docker Compose)

```bash
# Build server image
docker build -t ecommerce-server:latest ./server

# Build client image
docker build -t ecommerce-client:latest ./client
```

## Health Checks

Both services include health checks:

### Server Health Check
- Endpoint: `GET /api/products`
- Interval: 30 seconds
- Timeout: 10 seconds
- Retries: 3
- Start period: 40 seconds

### Client Health Check
- Endpoint: `GET /`
- Interval: 30 seconds
- Timeout: 10 seconds
- Retries: 3
- Start period: 40 seconds

**Check health status:**
```bash
docker compose ps
```

## Environment Variables

### Server Environment Variables

Default values in `docker-compose.yml`:
```yaml
NODE_ENV=production
PORT=3000
```

**Custom environment variables:**

Create `.env` file in root directory:
```env
# Server
NODE_ENV=production
PORT=3000
JWT_SECRET=your-secret-key-here

# Client
VITE_API_URL=http://localhost:3000
```

Update `docker-compose.yml`:
```yaml
server:
  env_file:
    - .env
```

## Port Mapping

Default ports:
- Frontend: `8080:80` (host:container)
- Backend: `3000:3000` (host:container)

**Change ports:**

Edit `docker-compose.yml`:
```yaml
services:
  client:
    ports:
      - "8081:80"  # Change host port to 8081
  server:
    ports:
      - "3001:3000"  # Change host port to 3001
```

## Volumes (Optional)

For persistent data storage:

```yaml
services:
  server:
    volumes:
      - ./server/data:/app/data
      
volumes:
  server-data:
```

## Networking

### Default Network

The `ecommerce-network` bridge network is created automatically.

### Custom Network Configuration

```yaml
networks:
  ecommerce-network:
    driver: bridge
    ipam:
      config:
        - subnet: 172.28.0.0/16
```

### Connect to Network

```bash
# Inspect network
docker network inspect ecommerce-network

# Connect container to network
docker network connect ecommerce-network <container-name>
```

## Troubleshooting

### Port Already in Use

**Error:** `Bind for 0.0.0.0:8080 failed: port is already allocated`

**Solution:**
```bash
# Find process using port
lsof -i :8080

# Kill process
kill -9 <PID>

# Or change port in docker-compose.yml
```

### Build Failures

**Error:** Build fails with dependency errors

**Solution:**
```bash
# Clean build without cache
docker compose build --no-cache

# Remove all containers and rebuild
docker compose down
docker compose up --build
```

### Container Exits Immediately

**Error:** Container starts then stops

**Solution:**
```bash
# Check logs
docker compose logs server

# Run interactively
docker compose run server sh

# Check if port is available
netstat -an | grep 3000
```

### Network Issues

**Error:** Frontend can't connect to backend

**Solution:**
1. Ensure both containers are on same network
2. Check `docker compose ps` for running status
3. Verify backend is accessible: `docker compose exec client wget -O- http://server:3000/api/products`

### Permission Denied

**Error:** Permission denied when building

**Solution:**
```bash
# On Linux/Mac, add user to docker group
sudo usermod -aG docker $USER

# Restart Docker daemon
sudo systemctl restart docker

# Re-login to apply group changes
```

## Optimization

### Image Size

Current image sizes (approximate):
- Server: ~150MB (Alpine-based)
- Client: ~25MB (Nginx Alpine)

**Further optimization:**
- Use `.dockerignore` to exclude unnecessary files
- Multi-stage builds (already implemented)
- Minimize layers in Dockerfile
- Use Alpine-based images

### Build Speed

**Use BuildKit:**
```bash
DOCKER_BUILDKIT=1 docker compose build
```

**Cache dependencies:**
```dockerfile
# Copy package files first
COPY package*.json ./
RUN npm ci

# Then copy source code
COPY . .
```

### Resource Limits

Add resource constraints in `docker-compose.yml`:
```yaml
services:
  server:
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
```

## Production Deployment

### Security Considerations

1. **Use secrets for sensitive data:**
```yaml
secrets:
  jwt_secret:
    file: ./secrets/jwt_secret.txt

services:
  server:
    secrets:
      - jwt_secret
```

2. **Run as non-root user:**
```dockerfile
USER node
```

3. **Scan images for vulnerabilities:**
```bash
docker scan ecommerce-server
docker scan ecommerce-client
```

### Docker Swarm (Production)

```bash
# Initialize swarm
docker swarm init

# Deploy stack
docker stack deploy -c docker-compose.yml ecommerce

# List services
docker service ls

# Scale services
docker service scale ecommerce_server=3
```

### Kubernetes Deployment

Convert Docker Compose to Kubernetes:
```bash
# Install kompose
brew install kompose  # macOS
# or download from https://kompose.io/

# Convert
kompose convert

# Deploy to Kubernetes
kubectl apply -f .
```

## Monitoring

### View Resource Usage

```bash
# Real-time stats
docker compose stats

# Container processes
docker compose top
```

### Logging

**Configure logging driver:**
```yaml
services:
  server:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

## Backup and Restore

### Backup

```bash
# Export container
docker export ecommerce-server > server-backup.tar

# Save image
docker save ecommerce-server:latest > server-image.tar
```

### Restore

```bash
# Import container
docker import server-backup.tar

# Load image
docker load < server-image.tar
```

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Docker Build and Push

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Build images
        run: docker compose build
      
      - name: Run tests
        run: docker compose run server npm test
      
      - name: Push to registry
        run: |
          docker tag ecommerce-server:latest registry.example.com/ecommerce-server:latest
          docker push registry.example.com/ecommerce-server:latest
```

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Security Best Practices](https://docs.docker.com/engine/security/)

---

**Need Help?** Check the main [USER_MANUAL.md](./USER_MANUAL.md) for more information.
