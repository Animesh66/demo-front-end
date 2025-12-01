# E-Commerce Application - User Flow

## Complete Shopping Journey

```
┌─────────────────────────────────────────────────────────────────────┐
│                         USER ENTRY POINTS                            │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                    ┌─────────────┼─────────────┐
                    │             │             │
                    ▼             ▼             ▼
            ┌──────────┐   ┌──────────┐   ┌──────────┐
            │   HOME   │   │   SHOP   │   │  SEARCH  │
            │   PAGE   │   │   PAGE   │   │   BAR    │
            └──────────┘   └──────────┘   └──────────┘
                    │             │             │
                    └─────────────┼─────────────┘
                                  │
                    ┌─────────────┴─────────────┐
                    │                           │
                    ▼                           ▼
        ┌───────────────────────┐   ┌───────────────────────┐
        │   PRODUCT CARD CLICK  │   │  SEARCH RESULT CLICK  │
        └───────────────────────┘   └───────────────────────┘
                    │                           │
                    └─────────────┬─────────────┘
                                  ▼
                    ┌──────────────────────────┐
                    │  PRODUCT DETAILS PAGE    │
                    │  ┌────────────────────┐  │
                    │  │ • Image Zoom       │  │
                    │  │ • Color Selection  │  │
                    │  │ • Configuration    │  │
                    │  │ • Quantity         │  │
                    │  └────────────────────┘  │
                    └──────────────────────────┘
                                  │
                    ┌─────────────┴─────────────┐
                    │                           │
                    ▼                           ▼
        ┌───────────────────┐       ┌───────────────────┐
        │   ADD TO CART     │       │     BUY NOW       │
        │   (with options)  │       │  (quick checkout) │
        └───────────────────┘       └───────────────────┘
                    │                           │
                    │                           │
                    ▼                           │
        ┌───────────────────┐                   │
        │  TOAST NOTIFICATION│                  │
        │  "Added to cart!"  │                  │
        └───────────────────┘                   │
                    │                           │
                    └─────────────┬─────────────┘
                                  ▼
                    ┌──────────────────────────┐
                    │      CART PAGE           │
                    │  ┌────────────────────┐  │
                    │  │ • View Items       │  │
                    │  │ • See Options      │  │
                    │  │ • Update Quantity  │  │
                    │  │ • Remove Items     │  │
                    │  │ • View Total       │  │
                    │  └────────────────────┘  │
                    └──────────────────────────┘
                                  │
                                  ▼
                    ┌──────────────────────────┐
                    │    CHECKOUT PAGE         │
                    │  ┌────────────────────┐  │
                    │  │ • Shipping Info    │  │
                    │  │ • Payment Method   │  │
                    │  │ • Order Summary    │  │
                    │  └────────────────────┘  │
                    └──────────────────────────┘
                                  │
                                  ▼
                    ┌──────────────────────────┐
                    │    SUCCESS PAGE          │
                    │  Order Confirmation      │
                    └──────────────────────────┘
```

## Feature Breakdown

### 1. Product Discovery
```
Home Page
├── Featured Products (8 items)
├── Product Cards (clickable)
└── "View All Products" button → Shop Page

Shop Page
├── Category Filter (All, Electronics, Furniture, etc.)
├── Product Grid (all products)
└── Product Cards (clickable)

Search Bar (in Navbar)
├── Real-time search
├── Autocomplete dropdown
├── Shows: Image, Name, Category, Price
└── Click result → Product Details
```

### 2. Product Details Page
```
Product Details
├── Image Section
│   ├── Large product image
│   ├── Zoom on hover/click
│   └── "Hover/Click to Zoom" indicator
│
├── Product Info
│   ├── Category badge
│   ├── Product name
│   ├── Price (with sale price if applicable)
│   └── Description
│
├── Options Panel
│   ├── Color Selection
│   │   └── Visual color circles
│   ├── Configuration Selection
│   │   └── Size/variant buttons
│   └── Quantity Controls
│       └── +/- buttons
│
└── Action Buttons
    ├── Add to Cart (with options)
    └── Buy Now (add + navigate)
```

### 3. Cart System
```
Cart Context
├── Tracks: Product + Options + Quantity
├── Unique ID: productId_color_configuration
├── Functions:
│   ├── addToCart(product, quantity, options)
│   ├── removeFromCart(cartItemId)
│   ├── updateQuantity(cartItemId, quantity)
│   └── clearCart()
└── Auto-calculates total with sale prices

Cart Page Display
├── Each Item Shows:
│   ├── Product image
│   ├── Name
│   ├── Options (color, configuration)
│   ├── Price (with sale price strikethrough)
│   ├── Quantity controls (+/-)
│   └── Remove button
└── Order Summary
    ├── Subtotal
    ├── Shipping (FREE)
    ├── Tax
    └── Total
```

### 4. User Feedback
```
Toast Notifications
├── Success (green) - "Added to cart!"
├── Error (red) - Error messages
├── Info (blue) - General notifications
├── Auto-dismiss after 3 seconds
└── Positioned top-right, non-blocking
```

## Data Flow

### Adding Product to Cart (with options)
```
1. User on Product Details Page
   ↓
2. Selects Color: "Black"
   ↓
3. Selects Configuration: "Pro"
   ↓
4. Sets Quantity: 2
   ↓
5. Clicks "Add to Cart"
   ↓
6. addToCart(product, 2, {color: "Black", configuration: "Pro"})
   ↓
7. Cart Context:
   - Generates cartItemId: "3_Black_Pro"
   - Checks if exists
   - Adds or updates quantity
   ↓
8. Toast shows: "Added 2 Mechanical Keyboard(s) (Black, Pro) to cart!"
   ↓
9. Cart badge updates with new count
```

### Updating Quantity in Cart
```
1. User on Cart Page
   ↓
2. Clicks "+" on item
   ↓
3. updateQuantity(cartItemId, currentQuantity + 1)
   ↓
4. Cart Context updates item
   ↓
5. Total recalculates automatically
   ↓
6. UI updates immediately
```

## Navigation Map

```
/                    → Home Page
/shop                → Shop Page (all products)
/product/:id         → Product Details Page
/cart                → Cart Page
/checkout            → Checkout Page
/success             → Order Success Page
/login               → Login Page
/register            → Register Page
/my-account          → Account Dashboard
/terms               → Terms of Service
```

## Component Hierarchy

```
App
├── ToastProvider
│   ├── Navbar
│   │   └── Search Bar (with autocomplete)
│   ├── Routes
│   │   ├── Home
│   │   │   └── ProductCard (x8)
│   │   ├── Shop
│   │   │   ├── Category Filter
│   │   │   └── ProductCard (xN)
│   │   ├── ProductDetails
│   │   │   ├── Image Zoom
│   │   │   ├── Options Panel
│   │   │   └── Action Buttons
│   │   ├── CartPage
│   │   │   ├── Cart Items (with controls)
│   │   │   └── Order Summary
│   │   └── ... other pages
│   └── Footer
└── Toast Container (fixed position)
```

## State Management

```
AuthContext
├── user
├── isAuthenticated
├── login()
├── logout()
└── register()

CartContext
├── cart: CartItem[]
├── total: number
├── addToCart()
├── removeFromCart()
├── updateQuantity()
└── clearCart()

ThemeContext
├── theme: 'light' | 'dark'
└── toggleTheme()

ToastContext
├── toasts: Toast[]
└── showToast()
```

## Key Improvements Made

✅ **Navigation**
- Product cards → Product details
- Search results → Product details
- Back button on details page

✅ **Product Options**
- Color selection with visual feedback
- Configuration/size selection
- Quantity controls before adding

✅ **Cart Enhancement**
- Tracks product options
- Shows selected options in cart
- Quantity management in cart
- Sale price support

✅ **User Experience**
- Image zoom on product details
- Toast notifications
- Smooth animations
- Responsive design

✅ **Bug Fixes**
- Fixed 5 broken product images
- Fixed search API endpoint
- Fixed TypeScript errors
- Proper total calculation
