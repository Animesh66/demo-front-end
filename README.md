# E-Commerce Demo Application

A full-stack e-commerce application built with **React + TypeScript** (frontend) and **Node.js + Express + TypeScript** (backend).

## Features

✨ **User Authentication**
- User registration with secure password hashing (bcrypt)
- Login with JWT token authentication
- Persistent sessions using localStorage

🛍️ **E-Commerce Functionality**
- Browse products
- Add items to cart
- View cart with item quantities
- Place orders
- Logout functionality

🎨 **Modern UI/UX**
- Dark theme with glassmorphism effects
- Smooth animations and hover effects
- Responsive design
- Premium aesthetic with gradient accents

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development
- **React Router** for navigation
- **Context API** for state management
- **Fetch API** for HTTP requests
- Custom CSS with modern design patterns

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **MongoDB** with Mongoose for data persistence
- **JWT** for authentication
- **bcryptjs** for password hashing
- **CORS** enabled

## Project Structure

```
demo-front-end/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable components (Navbar, ProductCard)
│   │   ├── context/       # Context providers (Auth, Cart)
│   │   ├── pages/         # Page components (Home, Login, Register, Cart)
│   │   ├── App.tsx        # Main app component with routing
│   │   ├── main.tsx       # Entry point
│   │   └── index.css      # Global styles
│   └── package.json
├── server/                # Backend Express API
│   ├── src/
│   │   ├── controllers/   # Route handlers
│   │   ├── middleware/    # Authentication middleware
│   │   ├── db.ts          # MongoDB models and connection
│   │   ├── routes.ts      # API routes
│   │   └── index.ts       # Server entry point
│   └── package.json
└── package.json           # Root package for running both servers
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- **MongoDB** - Must be installed and running locally
  - macOS: `brew install mongodb-community && brew services start mongodb-community`
  - Windows: [Download installer](https://www.mongodb.com/try/download/community)
  - Linux: See [official docs](https://www.mongodb.com/docs/manual/installation/)
  - Verify: `mongosh --eval "db.version()"`

### Step 1: Start MongoDB

Ensure MongoDB is running before starting the application:

```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Manual start (all platforms)
mongod
```

The application connects to `mongodb://127.0.0.1:27017/demo-app` by default.

### Step 2: Install Dependencies

```bash
# Install root dependencies
npm install

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### Step 3: Run the Application

From the **root directory**, run both the backend and frontend simultaneously:

```bash
npm start
```

This will start:
- **Backend API** on `http://localhost:3000`
- **Frontend** on `http://localhost:5173` (or another port if 5173 is busy)

### Alternative: Run Separately

**Terminal 1 - Backend:**
```bash
cd server
npm start
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- `POST /api/auth/login` - Login user
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

### Products
- `GET /api/products` - Get all products

### Orders
- `POST /api/orders` - Place an order
  ```json
  {
    "userId": "user-id",
    "items": [
      { "productId": "1", "quantity": 2 }
    ],
    "total": 598
  }
  ```

- `GET /api/orders?userId=user-id` - Get user's orders

## Usage Guide

1. **Open the application** at `http://localhost:5173`

2. **Register a new account**
   - Click "Register" in the navbar
   - Fill in your name, email, and password
   - Click "Register" button

3. **Login**
   - You'll be redirected to the login page
   - Enter your email and password
   - Click "Login"

4. **Browse Products**
   - View featured products on the home page
   - Click "Add to Cart" on any product

5. **View Cart**
   - Click "Cart" in the navbar
   - See your selected items with quantities
   - Remove items if needed

6. **Checkout**
   - Click "Checkout" button in cart
   - Order will be placed successfully
   - Cart will be cleared

7. **Logout**
   - Click "Logout" in the navbar

## Development

### Build Frontend for Production
```bash
cd client
npm run build
```

### TypeScript Compilation (Server)
```bash
cd server
npx tsc
```

## Notes

- **Data Persistence**: This application connects to a local MongoDB instance. Data is stored persistently in the `demo-app` database.

- **Database Management**: You can explore and manage your local database using UI tools like **MongoDB Compass**:
  1. Download and open [MongoDB Compass](https://www.mongodb.com/products/tools/compass).
  2. Create a new connection with the URI: `mongodb://127.0.0.1:27017`
  3. Look for the `demo-app` database to see the `users`, `products`, and `orders` collections.

- **Security**: The JWT secret key is hardcoded for demo purposes. In production, use environment variables and secure secret management.

- **CORS**: Currently configured to allow all origins. Restrict this in production.

## Future Enhancements

- [x] Add database integration (MongoDB/PostgreSQL)
- [ ] Implement product search and filtering
- [ ] Add product categories
- [ ] User profile management
- [ ] Order history page
- [ ] Payment integration
- [ ] Product reviews and ratings
- [ ] Admin panel for product management
- [ ] Email notifications
- [ ] Password reset functionality

## License

MIT

---

**Enjoy building your e-commerce application! 🚀**
