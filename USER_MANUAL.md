# E-Commerce Application - User Manual

## Table of Contents
1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [Local Development Setup](#local-development-setup)
4. [Docker Deployment](#docker-deployment)
5. [Application Usage](#application-usage)
6. [API Documentation](#api-documentation)
7. [Troubleshooting](#troubleshooting)
8. [Production Considerations](#production-considerations)

---

## Introduction

This is a full-stack e-commerce application built with:
- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Node.js + Express + TypeScript
- **Authentication**: JWT-based authentication with bcrypt password hashing
- **Storage**: In-memory data storage (demo purposes)

### Key Features
✨ User registration and authentication  
🛍️ Product browsing and shopping cart  
📦 Order placement and history  
🎨 Modern dark theme UI with glassmorphism  
🔒 Secure password hashing and JWT tokens  

---

## Prerequisites

Before you begin, ensure you have the following installed:

### For Local Development
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** (optional, for version control)

### For Docker Deployment
- **Docker** (v20.10 or higher) - [Download](https://www.docker.com/get-started)
- **Docker Compose** (v2.0 or higher) - Usually included with Docker Desktop

### Verify Installation
```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Check Docker version
docker --version

# Check Docker Compose version
docker compose version
```

---

## Local Development Setup

### Step 1: Clone or Navigate to the Project

```bash
cd /path/to/demo-front-end
```

### Step 2: Install Dependencies

The project has three `package.json` files:
- Root: For running both servers concurrently
- `server/`: Backend dependencies
- `client/`: Frontend dependencies

**Option A: Install All Dependencies at Once**
```bash
# From the root directory
npm install
cd server && npm install
cd ../client && npm install
cd ..
```

**Option B: Use a Script (if available)**
```bash
# Create an install script
npm install
```

### Step 3: Start the Application

**Method 1: Run Both Servers Concurrently (Recommended)**
```bash
# From the root directory
npm start
```

This command uses `concurrently` to run:
- Backend API on `http://localhost:3000`
- Frontend on `http://localhost:5173`

**Method 2: Run Servers Separately**

*Terminal 1 - Backend:*
```bash
cd server
npm start
```

*Terminal 2 - Frontend:*
```bash
cd client
npm run dev
```

### Step 4: Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

The backend API will be running on:
```
http://localhost:3000
```

### Step 5: Development Workflow

**Hot Reload**: Both frontend and backend support hot reload
- Frontend: Vite automatically reloads on file changes
- Backend: ts-node watches for changes (if nodemon is configured)

**Build Frontend for Production**
```bash
cd client
npm run build
```

The built files will be in `client/dist/`

**TypeScript Compilation (Backend)**
```bash
cd server
npx tsc
```

---

## Docker Deployment

Docker allows you to run the application in isolated containers without installing Node.js or dependencies on your host machine.

### Architecture

The Docker setup includes:
- **Client Container**: Nginx serving the built React app
- **Server Container**: Node.js running the Express API
- **Docker Network**: Allows containers to communicate

### Step 1: Ensure Docker is Running

```bash
# Check Docker status
docker info
```

If Docker is not running, start Docker Desktop.

### Step 2: Build and Run with Docker Compose

**Quick Start (Recommended)**
```bash
# From the root directory
docker compose up --build
```

This command will:
1. Build both client and server Docker images
2. Create containers
3. Start the application
4. Show logs from both containers

**Run in Detached Mode (Background)**
```bash
docker compose up -d --build
```

### Step 3: Access the Dockerized Application

- **Frontend**: `http://localhost:8080`
- **Backend API**: `http://localhost:3000`

### Step 4: View Logs

```bash
# View all logs
docker compose logs

# View logs for specific service
docker compose logs client
docker compose logs server

# Follow logs in real-time
docker compose logs -f
```

### Step 5: Stop the Application

```bash
# Stop containers (keeps data)
docker compose stop

# Stop and remove containers
docker compose down

# Stop, remove containers, and remove volumes
docker compose down -v
```

### Docker Commands Reference

**Build Images**
```bash
# Build all services
docker compose build

# Build specific service
docker compose build client
docker compose build server

# Build without cache
docker compose build --no-cache
```

**Manage Containers**
```bash
# List running containers
docker compose ps

# Start stopped containers
docker compose start

# Restart containers
docker compose restart

# Execute command in running container
docker compose exec server sh
docker compose exec client sh
```

**Clean Up**
```bash
# Remove all stopped containers
docker compose rm

# Remove unused images
docker image prune

# Remove all unused Docker resources
docker system prune -a
```

### Manual Docker Build (Without Docker Compose)

**Build Images**
```bash
# Build server image
docker build -t ecommerce-server ./server

# Build client image
docker build -t ecommerce-client ./client
```

**Create Network**
```bash
docker network create ecommerce-network
```

**Run Containers**
```bash
# Run server
docker run -d \
  --name ecommerce-server \
  --network ecommerce-network \
  -p 3000:3000 \
  ecommerce-server

# Run client
docker run -d \
  --name ecommerce-client \
  --network ecommerce-network \
  -p 8080:80 \
  ecommerce-client
```

---

## Application Usage

### 1. Register a New Account

1. Open `http://localhost:5173` (or `http://localhost:8080` for Docker)
2. Click **"Register"** in the navigation bar
3. Fill in the registration form:
   - **Full Name**: Your name
   - **Email**: Valid email address
   - **Password**: Secure password (min 6 characters)
   - **Gender**: Select your gender (optional)
   - **Date of Birth**: Select your birth date (optional)
4. Click **"Register"** button
5. You'll be redirected to the login page

### 2. Login

1. Enter your **email** and **password**
2. Click **"Login"** button
3. Upon successful login, you'll be redirected to the home page
4. Your session will persist (stored in localStorage)

### 3. Browse Products

- View featured products on the home page
- Each product card shows:
  - Product image
  - Product name
  - Price
  - "Add to Cart" button

### 4. Add Items to Cart

1. Click **"Add to Cart"** on any product
2. A success message will appear
3. The cart icon in the navbar will update with the item count

### 5. View Cart

1. Click **"Cart (X)"** in the navigation bar
2. View all items in your cart:
   - Product details
   - Quantity controls (+ / -)
   - Individual prices
   - Total price
3. Remove items by clicking the **"Remove"** button

### 6. Place an Order

1. In the cart page, click **"Checkout"**
2. Your order will be placed
3. Cart will be cleared
4. You'll see a success message

### 7. View Account & Orders

1. Click **"My Account"** in the navigation bar
2. **Profile Tab**: View your account information
3. **Orders Tab**: View your order history
   - Order ID
   - Order date
   - Items ordered
   - Total amount
   - Payment method
   - Order status

### 8. Logout

1. Click **"Logout"** in the navigation bar (or in My Account page)
2. You'll be logged out and redirected to the login page

---

## API Documentation

### Base URL
- **Local**: `http://localhost:3000`
- **Docker**: `http://localhost:3000`

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "gender": "male",
  "dateOfBirth": "1990-01-01"
}
```

**Response (201 Created):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid-here",
    "name": "John Doe",
    "email": "john@example.com",
    "gender": "male",
    "dateOfBirth": "1990-01-01"
  }
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid-here",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Product Endpoints

#### Get All Products
```http
GET /api/products
```

**Response (200 OK):**
```json
[
  {
    "id": "1",
    "name": "Premium Wireless Headphones",
    "price": 299,
    "image": "https://images.unsplash.com/..."
  },
  ...
]
```

### Order Endpoints

#### Create Order
```http
POST /api/orders
Content-Type: application/json
Authorization: Bearer <token>

{
  "userId": "user-uuid",
  "items": [
    {
      "productId": "1",
      "quantity": 2
    }
  ],
  "total": 598,
  "paymentMethod": "Credit Card"
}
```

**Response (201 Created):**
```json
{
  "id": "order-uuid",
  "userId": "user-uuid",
  "items": [...],
  "total": 598,
  "date": "2025-11-25T02:56:33.000Z",
  "paymentMethod": "Credit Card",
  "status": "Completed"
}
```

#### Get User Orders
```http
GET /api/orders?userId=user-uuid
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
[
  {
    "id": "order-uuid",
    "userId": "user-uuid",
    "items": [...],
    "total": 598,
    "date": "2025-11-25T02:56:33.000Z",
    "paymentMethod": "Credit Card",
    "status": "Completed"
  }
]
```

---

## Troubleshooting

### Local Development Issues

#### Port Already in Use

**Problem**: `Error: listen EADDRINUSE: address already in use :::3000`

**Solution**:
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or use a different port
PORT=3001 npm start
```

#### Dependencies Not Installing

**Problem**: `npm install` fails

**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

#### TypeScript Errors

**Problem**: TypeScript compilation errors

**Solution**:
```bash
# Check TypeScript version
npx tsc --version

# Rebuild TypeScript
cd server
npx tsc --build --clean
npx tsc
```

### Docker Issues

#### Docker Daemon Not Running

**Problem**: `Cannot connect to the Docker daemon`

**Solution**: Start Docker Desktop application

#### Port Conflicts

**Problem**: Port 8080 or 3000 already in use

**Solution**: Edit `docker-compose.yml` to use different ports:
```yaml
ports:
  - "8081:80"  # Change 8080 to 8081
```

#### Build Failures

**Problem**: Docker build fails

**Solution**:
```bash
# Build without cache
docker compose build --no-cache

# Check Docker logs
docker compose logs
```

#### Container Exits Immediately

**Problem**: Container starts then stops

**Solution**:
```bash
# Check container logs
docker compose logs server
docker compose logs client

# Run container interactively
docker compose run server sh
```

#### Network Issues Between Containers

**Problem**: Frontend can't connect to backend

**Solution**: Ensure both containers are on the same network in `docker-compose.yml`

### Application Issues

#### Login Not Working

**Problem**: "Invalid credentials" error

**Solution**:
- Verify you registered with the correct email/password
- Check server logs for errors
- Clear localStorage: `localStorage.clear()` in browser console

#### Cart Not Updating

**Problem**: Items not appearing in cart

**Solution**:
- Check browser console for errors
- Verify backend is running
- Clear browser cache and localStorage

#### Orders Not Showing

**Problem**: Orders tab is empty

**Solution**:
- Ensure you've placed at least one order
- Check that userId matches in the API call
- Verify backend `/api/orders` endpoint is working

---

## Production Considerations

### Security

⚠️ **Important**: This is a demo application. For production:

1. **Environment Variables**: Use `.env` files for sensitive data
   ```bash
   # .env
   JWT_SECRET=your-super-secret-key-here
   PORT=3000
   NODE_ENV=production
   ```

2. **Database**: Replace in-memory storage with a real database
   - MongoDB
   - PostgreSQL
   - MySQL

3. **CORS**: Restrict allowed origins
   ```typescript
   app.use(cors({
     origin: 'https://yourdomain.com'
   }));
   ```

4. **HTTPS**: Use SSL/TLS certificates
5. **Rate Limiting**: Implement API rate limiting
6. **Input Validation**: Add comprehensive validation
7. **Password Policy**: Enforce strong passwords
8. **Session Management**: Implement refresh tokens

### Performance

1. **Caching**: Implement Redis for caching
2. **CDN**: Use CDN for static assets
3. **Compression**: Enable gzip compression
4. **Database Indexing**: Add proper indexes
5. **Load Balancing**: Use load balancer for scaling

### Monitoring

1. **Logging**: Implement structured logging (Winston, Pino)
2. **Error Tracking**: Use Sentry or similar
3. **Performance Monitoring**: Use New Relic, Datadog
4. **Health Checks**: Implement `/health` endpoint

### Docker Production

**Multi-stage Builds**: Already implemented for smaller images

**Environment-specific Configs**:
```yaml
# docker-compose.prod.yml
version: '3.8'
services:
  server:
    environment:
      - NODE_ENV=production
      - JWT_SECRET=${JWT_SECRET}
  client:
    environment:
      - VITE_API_URL=https://api.yourdomain.com
```

**Orchestration**: Consider Kubernetes for production deployment

---

## Additional Resources

### Documentation
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Express.js Documentation](https://expressjs.com/)
- [Docker Documentation](https://docs.docker.com/)

### Support
For issues or questions:
1. Check the [Troubleshooting](#troubleshooting) section
2. Review application logs
3. Check browser console for frontend errors
4. Review server logs for backend errors

---

## Quick Reference

### Common Commands

```bash
# Local Development
npm start                    # Start both servers
cd client && npm run dev     # Start frontend only
cd server && npm start       # Start backend only
npm run build                # Build frontend for production

# Docker
docker compose up            # Start application
docker compose up -d         # Start in background
docker compose down          # Stop application
docker compose logs -f       # View logs
docker compose ps            # List containers
docker compose restart       # Restart services

# Cleanup
rm -rf node_modules          # Remove dependencies
docker system prune -a       # Clean Docker resources
```

### Default Ports

| Service | Local | Docker |
|---------|-------|--------|
| Frontend | 5173 | 8080 |
| Backend | 3000 | 3000 |

### File Structure

```
demo-front-end/
├── client/              # React frontend
│   ├── src/
│   ├── Dockerfile
│   └── package.json
├── server/              # Express backend
│   ├── src/
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml   # Docker orchestration
├── USER_MANUAL.md       # This file
└── README.md            # Project overview
```

---

**Happy Coding! 🚀**

*Last Updated: November 25, 2025*
