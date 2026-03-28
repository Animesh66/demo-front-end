# Quick Start Guide

## Prerequisites

Before running the application, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB** (required for database) - See installation instructions below

### MongoDB Installation

#### macOS
```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community
```

#### Windows
1. Download MongoDB from [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
2. Run the installer and follow the setup wizard
3. MongoDB will run as a Windows service automatically

#### Linux (Ubuntu/Debian)
```bash
# Import MongoDB public GPG key
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

# Create list file
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Install MongoDB
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

### Verify MongoDB Installation
```bash
# Check if MongoDB is running
mongosh --eval "db.version()"
```

If MongoDB is running correctly, you should see the version number displayed.

## Running the Application

### Option 1: Using the Quick Start Script (Recommended)

**Step 1: Ensure MongoDB is Running**
```bash
# macOS (if not running as service)
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Or start manually (all platforms)
mongod
```

**Step 2: Run the Application**
```bash

**Terminal 1: Start MongoDB (if not running)**
```bash
mongod
```

**Terminal 2: Start the Backend**
```bash
cd server
npm install
npm start
```

**Terminal 3: Start the Frontend**
```bash
This will:
- Install all dependencies for both client and server
- Connect to MongoDB at `mongodb://127.0.0.1:27017/demo-app`
- Start the backend server on http://localhost:3000
- Start the frontend dev server on http://localhost:5173
- Open the application in your default browser

### Option 2: Manual Start
```bash
# Terminal 1 - Start the backend
cd server
npm install
npm start

# Terminal 2 - Start the frontend
cd client
npm install
npm run dev
```

## Accessing the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000/api

## Testing the New Features

### 1. Product Details Page
1. Navigate to the home page or shop page
2. Click on any product card
3. You should see:
   - Large product image with zoom capability (hover or click)
   - Color selection options
   - Configuration/size options
   - Quantity selector
   - Add to Cart and Buy Now buttons

### 2. Search Functionality
1. Use the search bar in the navigation
2. Type a product name (e.g., "keyboard", "watch", "chair")
3. Click on a search result
4. You should navigate to that product's detail page

### 3. Enhanced Cart
1. Add products to cart from:
   - Product cards (quick add)
   - Product details page (with options and quantity)
2. Go to the cart page
3. You should see:
   - Product options displayed (color, configuration)
   - Sale prices with strikethrough on original prices
   - Quantity controls (+/- buttons)
   - Correct total calculation

### 4. Toast Notifications
1. Add any product to cart
2. You should see a green success toast notification in the top-right
3. The toast will automatically disappear after 3 seconds

## Default Test Accounts

You can register a new account or use these test credentials:

**Test User 1:**
- Email: test@example.com
- Password: password123

**Test User 2:**
- Email: demo@example.com
- Password: demo123

## Features Overview

### ✅ Fixed Issues
- All product images now load correctly
- Product cards are clickable and navigate to details
- Search results navigate to product details
- Fixed API endpoint typo

### ✅ New Features
- Individual product detail pages
- Image zoom functionality
- Product options (color, configuration)
- Quantity selection before adding to cart
- Enhanced cart with options display
- Quantity management in cart
- Sale price support throughout
- Toast notification system
- Improved user feedback

### ✅ Enhanced Features
- Better cart item management
- Proper total calculation with sale prices
- Responsive design on all new pages
- Smooth animations and transitions

## Project Structure

```
demo-front-end/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── context/       # React contexts (Cart, Auth, Theme, Toast)
│   │   ├── pages/         # Page components
│   │   └── App.tsx        # Main app component
│   └── package.json
├── server/                 # Express backend
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── db.ts          # In-memory database
│   MongoDB Connection Error
If you see `❌ MongoDB connection error`:
```bash
# Check if MongoDB is running
mongosh --eval "db.version()"

# If not running, start it:
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Manual start (all platforms)
mongod
```

### Port Already in Use
If you get a "port already in use" error:
```bash
# Kill process on port 3000 (backend)
lsof -ti:3000 | xargs kill -9

# Kill process on port 5173 (frontend)
lsof -ti:5173 | xargs kill -9

# Kill MongoDB (port 27017) if needed
lsof -ti:27017 | xargs kill -9
```

### Dependencies Not Installing
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### MongoDB Data Directory Error
If MongoDB fails to start due to data directory issues:
```bash
# Create the data directory
sudo mkdir -p /data/db

# Set permissions (macOS/Linux)
sudo chown -R $(whoami) /data/db
### Dependencies Not Installing
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
# Rebuild the client
cd client
npm run build

# Check for TypeScript errors
npm run build 2>&1 | grep error
```

## Development Commands

### Client (Frontend)
```bash
cd client
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Server (Backend)
```bash
cd server
npm start        # Start server with nodemon (auto-reload)
npm run build    # Compile TypeScript
```

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Orders
- `POST /api/orders` - Place new order
- `GET /api/orders` - Get user orders

## Browser Compatibility

Tested and working on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance

- Lazy loading for all pages
- Code splitting for optimal bundle size
- Optimized images from Unsplash
- Efficient re-renders with React best practices

## Next Steps

The application is fully functional! You can now:
1. Browse products
2. Search for items
3. View detailed product information
4. Select options and quantities
5. Add items to cart
6. Manage cart items
7. Complete checkout
8. View order history

For additional features or modifications, refer to `IMPLEMENTATION_COMPLETE.md` for the complete feature list and future enhancement suggestions.

## Support

If you encounter any issues:
1. Check the browser console for errors
2. Verify both servers are running
3. Ensure all dependencies are installed
4. Check that ports 3000 and 5173 are available

Enjoy your e-commerce application! 🚀
