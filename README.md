# 🍬 Sweet Shop Management System - MERN Stack

A **full-stack web application** for managing a sweet shop with authentication, inventory control, and purchase management.  
Built with **MongoDB, Express.js, React, and Node.js (MERN)** 🚀

![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node-dot-js&logoColor=white)

---
Related Images:--


<img width="955" height="455" alt="ss1" src="https://github.com/user-attachments/assets/11c63cf2-9f82-4cd7-b9f5-03f912978bc3" />



<img width="959" height="457" alt="Screenshot 2025-09-20 202657" src="https://github.com/user-attachments/assets/d801bf90-600b-4971-866a-5463754e7c72" />



<img width="959" height="434" alt="Screenshot 2025-09-20 202812" src="https://github.com/user-attachments/assets/84f64e7e-ff72-4521-8c76-5245f369bd7b" />



<img width="950" height="447" alt="Screenshot 2025-09-20 202856" src="https://github.com/user-attachments/assets/c5425788-ebf8-4120-9626-45593fd075c7" />



## ✨ Features

### 🔧 Backend (Node.js/Express/MongoDB)
- 🔑 **JWT Authentication** with role-based access
- 📦 **CRUD API** for sweets management
- 🛡️ **Security**: Password hashing, validation, and protected routes
- 🔍 **Search & Filter** sweets by name, category, or price
- 📊 **Analytics** for admin

### 🎨 Frontend (React)
- 📱 **Responsive UI** with modern design
- 🔑 **Login/Register** with validation
- 🏪 **Inventory Management** (Add, Edit, Delete, Restock)
- 🛒 **Purchase System** with stock updates
- 🔔 **Toast Notifications** for feedback
- 👨‍💼 **Role-based Dashboards** (Admin & Customer)

---

## 👥 User Roles

- **Customer** 🛒: Browse, search, and purchase sweets  
- **Admin** ⚙️: Manage inventory, oversee users, and track analytics  

---

## 📂 Project Structure

sweet-shop-mern/
├── backend/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ ├── server.js
│ └── package.json
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── contexts/
│ │ └── App.js
│ └── package.json
└── README.md



---

## ⚡ Installation & Setup

### 📌 Prerequisites
- [Node.js](https://nodejs.org/) (v14+)
- [MongoDB](https://www.mongodb.com/) (Local/Cloud)
- npm or yarn

### 🖥 Backend Setup
```bash
cd backend
npm install

### .env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/sweetshop
JWT_SECRET=your_secure_secret
NODE_ENV=development


npm run dev   # Development
npm start     # Production


🔗 API Endpoints
🔑 Authentication

POST /api/auth/register → Register user

POST /api/auth/login → Login user

GET /api/auth/me → Get current user

🍭 Sweets Management

GET /api/sweets → Fetch all sweets

POST /api/sweets → Add new sweet (Admin)

GET /api/sweets/search → Search sweets

GET /api/sweets/:id → Get sweet by ID

PUT /api/sweets/:id → Update sweet (Admin)

DELETE /api/sweets/:id → Delete sweet (Admin)

POST /api/sweets/:id/purchase → Purchase sweet

POST /api/sweets/:id/restock → Restock sweet (Admin)

GET /api/sweets/categories/list → List categories

🎯 Usage Guide
👨‍👩‍👦 For Customers

Register/Login

Browse sweets

Search & Filter

Purchase with quantity

👨‍💼 For Admins

Add/Edit/Delete sweets

Restock items

View analytics

Manage users

🚀 Deployment
🔧 Backend

Use MongoDB Atlas or any hosting provider

Deploy with Heroku, Railway, or DigitalOcean

🎨 Frontend

Build React app → npm run build

Deploy on Vercel, Netlify, or AWS S3

🤝 Contributing

Fork this repo 🍴

Create a feature branch: git checkout -b feature-name

Commit your changes: git commit -m "Added feature"

Push branch: git push origin feature-name

Open a Pull Request 🚀

📜 License

This project is licensed under the MIT License.

🐞 Troubleshooting

✅ MongoDB errors → Ensure service is running
✅ CORS issues → Use CORS middleware in backend
✅ Auth issues → Check JWT secret & localStorage tokens
✅ Port conflicts → Change ports in .env or package.json

📞 Support

For issues or queries:

📌 Open a GitHub Issue

Made by Aakash Sharma ❤️ 

