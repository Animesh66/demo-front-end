# API Endpoints Documentation

This document outlines the major REST endpoints available in the TechStore application, their expected payloads, and the expected outcomes and HTTP status codes when testing via tools like **Postman**.

**Base URL:** `http://localhost:3000/api`

---

## 1. Authentication Endpoints

### 1.1 Register User
Register a new user account.

- **Method:** `POST`
- **Endpoint:** `/auth/register`
- **Headers:** 
  - `Content-Type: application/json`
- **Payload (Body):**
```json
{
  "email": "testuser@example.com",
  "password": "strongpassword123",
  "name": "Test User",
  "gender": "Male",
  "dateOfBirth": "1990-01-01"
}
```

**Expected Outcomes:**
- **201 Created**: When registration is successful.
  ```json
  {
    "message": "User registered successfully"
  }
  ```
- **400 Bad Request**: If required fields (`email`, `password`, `name`) are missing.
  ```json
  {
    "message": "All fields are required"
  }
  ```
- **400 Bad Request**: If the user (email) already exists.
  ```json
  {
    "message": "User already exists"
  }
  ```

### 1.2 Login User
Authenticate a user and retrieve a JWT token.

- **Method:** `POST`
- **Endpoint:** `/auth/login`
- **Headers:** 
  - `Content-Type: application/json`
- **Payload (Body):**
```json
{
  "email": "testuser@example.com",
  "password": "strongpassword123"
}
```

**Expected Outcomes:**
- **200 OK**: On successful authentication. You will receive a JWT token that can be copied (though currently, other routes do not strictly enforce token validation).
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR...",
    "user": {
      "id": "64bfc882f0c77...",
      "name": "Test User",
      "email": "testuser@example.com",
      "gender": "Male",
      "dateOfBirth": "1990-01-01"
    }
  }
  ```
- **400 Bad Request**: If credentials do not match or the user is not found.
  ```json
  {
    "message": "Invalid credentials"
  }
  ```

---

## 2. Product Endpoints

### 2.1 Get All Products
Retrieve the complete database of products.

- **Method:** `GET`
- **Endpoint:** `/products`
- **Headers:** `None` required.
- **Payload:** `None`

**Expected Outcomes:**
- **200 OK**: Returns an array of product objects.
  ```json
  [
    {
      "id": "64bfc882f0...",
      "name": "Premium Wireless Headphones",
      "price": 299,
      "description": "High-fidelity audio with noise cancellation.",
      "image": "https://...",
      "category": "Electronics",
      "createdAt": "2023-10-25T14:48:00.000Z",
      "updatedAt": "2023-10-25T14:48:00.000Z"
    },
    ...
  ]
  ```

### 2.2 Get Single Product
Retrieve details of a single product using its unique MongoDB ID.

- **Method:** `GET`
- **Endpoint:** `/products/:id` (Replace `:id` with an actual product ID from the `GET /products` list)
- **Headers:** `None` required.
- **Payload:** `None`

**Expected Outcomes:**
- **200 OK**: Returns the exact product requested.
  ```json
  {
    "id": "64bfc882f0...",
    "name": "Premium Wireless Headphones",
    "price": 299,
    "description": "High-fidelity audio with noise cancellation.",
    "image": "https://...",
    "category": "Electronics"
  }
  ```
- **404 Not Found**: If the product ID does not exist in the database.
  ```json
  {
    "message": "Product not found"
  }
  ```
- **500 Internal Server Error**: If the `:id` parameter is improperly formatted (not a valid MongoDB ObjectId).

---

## 3. Order Endpoints

### 3.1 Place an Order
Submit a new user order.

- **Method:** `POST`
- **Endpoint:** `/orders`
- **Headers:** 
  - `Content-Type: application/json`
- **Payload (Body):**
```json
{
  "userId": "64bfc882f0c7743d8a9...",   // An actual user ID from login response
  "items": [
    {
      "productId": "64bfc882f0c77...",  // An actual product ID
      "quantity": 1,
      "productName": "Premium Wireless Headphones",
      "productPrice": 299
    }
  ],
  "total": 299,
  "paymentMethod": "VISA"
}
```

**Expected Outcomes:**
- **201 Created**: When the order is successfully saved.
  ```json
  {
    "message": "Order placed successfully",
    "order": {
      "userId": "64bfc882f0c7743d8a9...",
      "items": [
        {
          "productId": "64bfc882f0c77...",
          "quantity": 1,
          "productName": "Premium Wireless Headphones",
          "productPrice": 299,
          "_id": "6732f91a2..."
        }
      ],
      "total": 299,
      "date": "2026-03-25T11:29:03.000Z",
      "paymentMethod": "VISA",
      "status": "Completed",
      "_id": "6732f91a2...",
      "createdAt": "2026-03-25T11:29:03.000Z",
      "updatedAt": "2026-03-25T11:29:03.000Z",
      "id": "6732f91a2..."
    }
  }
  ```
- **400 Bad Request**: If `userId`, `items` are missing, or `items` array is empty.
  ```json
  {
    "message": "Invalid order data"
  }
  ```

### 3.2 Get User Orders
Retrieve all prior associated orders for a specific user ID.

- **Method:** `GET`
- **Endpoint:** `/orders`
- **Headers:** `None` required.
- **Query Parameters:** `userId` (e.g., `http://localhost:3000/api/orders?userId=64bfc882f0...`)
- **Payload:** `None`

**Expected Outcomes:**
- **200 OK**: On success, returns an array of the user's orders (returns an empty array `[]` if no orders exist for that user).
  ```json
  [
    {
      "userId": "64bfc882f0c7743d8a9...",
      "items": [ ... ],
      "total": 299,
      "date": "2026-03-25T11:29:03.000Z",
      "paymentMethod": "VISA",
      "status": "Completed",
      "id": "6732f91a2..."
    }
  ]
  ```
- **400 Bad Request**: If the `userId` query parameter is missing from the Request URL.
  ```json
  {
    "message": "User ID required"
  }
  ```
