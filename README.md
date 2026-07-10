# Ecommerce Backend API

A complete Ecommerce Backend API built using Node.js, Express.js and MongoDB.

## 🚀 Features

- Categories CRUD
- Products CRUD
- Brands CRUD
- SubCategories CRUD
- Shopping Cart API
- Orders API
- Validation using Express Validator
- MongoDB Database
- Mongoose ODM
- Slug Generation

---

## 🛠️ Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose
- Express Validator
- Slugify
- Dotenv

---

## 📦 Installation

Clone the repository

```bash
git clone https://github.com/jooelgen1239877-collab/Ecommerce-Backend.git
```

Install dependencies

```bash
npm install
```

Run the server

```bash
npm start
```

Development mode

```bash
npm run dev
```

---

## 📌 API Endpoints

### Categories

- GET /api/categories
- GET /api/categories/:id
- POST /api/categories
- PATCH /api/categories/:id
- DELETE /api/categories/:id

### Products

- GET /api/products
- GET /api/products/:id
- POST /api/products
- PATCH /api/products/:id
- DELETE /api/products/:id

### Brands

- GET /api/brands
- GET /api/brands/:id
- POST /api/brands
- PATCH /api/brands/:id
- DELETE /api/brands/:id

### SubCategories

- GET /api/subcategories
- GET /api/subcategories/:id
- POST /api/subcategories
- PATCH /api/subcategories/:id
- DELETE /api/subcategories/:id

### Cart

- GET /api/cart
- POST /api/cart/items
- PATCH /api/cart/items/:productId
- DELETE /api/cart/items/:productId
- DELETE /api/cart

### Orders

- POST /api/orders
- GET /api/orders
- GET /api/orders/:id
- PATCH /api/orders/:id/pay
- PATCH /api/orders/:id/deliver

---

## 👨‍💻 Author

Youssef.Ellaithy