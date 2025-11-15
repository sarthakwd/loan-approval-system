![React](https://img.shields.io/badge/Frontend-React-blue)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green)
![Express](https://img.shields.io/badge/API-Express-lightgrey)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)

# Loan Approval System

A MERN–stack loan management system where customers can apply for loans and track their eligibility status, while officers review and approve/reject applications. The project uses MongoDB, Express, React, Node.js, and JWT authentication.

---

## 🚀 Tech Stack

### **Frontend**
- React.js (Vite)
- React Router DOM
- Axios
- Bootstrap 5
- React Toastify

### **Backend**
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcrypt.js
- CORS

### **Tools**
- Postman
- MongoDB Compass / Atlas

---

## 📌 Features

### 🔐 **Authentication**
- Register / Login (JWT-based)
- Role-based access: **Customer** or **Loan Officer**

### 👤 **Customer Features**
- Apply for loans  
- View list of all loan applications  
- Check loan status  
- View eligibility score  

### 🧑‍💼 **Officer Features**
- View all pending loan applications  
- Approve or Reject loans  

---

## 📁 Folder Structure

```
project-root/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── server.js
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── context/
    │   └── App.jsx
    ├── index.html
    └── vite.config.js
```

---

## ⚙️ Backend Setup

### **1. Install dependencies**
```bash
cd backend
npm install
```

### **2. Create `.env` file**
```
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
PORT=8000
```

### **3. Start backend**
```bash
npm start
```

Backend runs on:  
👉 http://localhost:8000

---

## 🎨 Frontend Setup

### **1. Install dependencies**
```bash
cd frontend
npm install
```

### **2. Start frontend**
```bash
npm run dev
```

Frontend runs on:  
👉 http://localhost:5173

---

## 🗄️ MongoDB Models

### **User Model**
```js
{
 name: String,
 email: { type: String, required: true, unique: true },
 passwordHash: String,
 role: { type: String, enum: ['CUSTOMER','OFFICER'], required: true }
}
```

### **Customer Model**
```js
{
 userId: ObjectId,
 income: Number,
 creditScore: Number
}
```

### **Officer Model**
```js
{
 userId: ObjectId,
 branch: String
}
```

### **Loan Application Model**
```js
{
 customerId: ObjectId,
 officerId: ObjectId,
 amountRequested: Number,
 tenureMonths: Number,
 interestRate: Number,
 status: { type: String, enum: ['PENDING','APPROVED','REJECTED'], default: 'PENDING' },
 eligibilityScore: Number
}
```

---

## 🧮 Loan Eligibility Logic

### **Normalization**
```
incomeNorm = income / maxIncome
creditScoreNorm = creditScore / 900
```

### **Final Score**
```
score = (0.6 * creditScoreNorm) + (0.4 * incomeNorm)
```

### **Decision**
```
If score >= threshold → APPROVED
Else → REJECTED
```

This logic is implemented inside the backend loan evaluation service.

---

## 🔌 API Documentation

---

### ⭐ AUTH APIs

#### **POST /auth/register**
Registers a new user.

#### **POST /auth/login**
Logs in and returns JWT token.

---

### ⭐ LOAN APIs

#### **POST /loans/apply**
Create a loan application.

#### **GET /loans/:id/status**
Fetch loan approval status & eligibility score.

---

### ⭐ OFFICER APIs

#### **GET /officer/loans/pending**
Fetch all pending loan applications.

#### **POST /officer/loans/:id/review**
Approve or Reject a loan.

---

## 🔐 JWT Authentication

All protected routes require:

```
Authorization: Bearer <token>
```

JWT middleware:
- Verifies token  
- Extracts userId & role  
- Attaches user to request  
- Restricts officer-only endpoints  

---

## ▶️ Running the Project

### **Start backend**
```bash
cd backend
npm start
```

### **Start frontend**
```bash
cd frontend
npm run dev
```

### **Open application**
👉 http://localhost:5173

---

## 👤 Author

**Sarthak Chauhan**  
Loan Approval System – MERN Project
