Loan Approval System

A MERN-stack loan management system where customers can apply for loans and track their eligibility status, while officers can review and approve/reject applications. The project uses MongoDB, Express, React, Node.js, and JWT authentication.

🚀 Tech Stack
    Frontend
        React.js (Vite)
        React Router DOM
        Axios
        Bootstrap 5
        React Toastify

    Backend
        Node.js
        Express.js
        MongoDB + Mongoose
        JWT Authentication
        bcrypt.js
        CORS

    Tools
        Postman
        MongoDB Compass / Atlas


📌 Features
    🔐 Authentication
        Register / Login (JWT-based)
        Role: Customer or Loan Officer

    👤 Customer Features
        Apply for loan
        View list of all loan applications
        Check loan status
        View eligibility score

    🧑‍💼 Officer Features
        View all pending loan applications
        Approve or Reject loans


📁 Folder Structure
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


⚙️ Backend Setup
    1.Install Dependencies
        cd backend
        npm install

    2.Create .env file
        MONGO_URI=your_mongodb_connection
        JWT_SECRET=your_secret_key
        PORT=8000

    3. Start backend
        npm start

    Backend runs on:
    👉 http://localhost:8000


🎨 Frontend Setup
    1. Install dependencies
        cd frontend
        npm install

    2. Start frontend
        npm run dev

    Frontend runs on:
    👉 http://localhost:5173


🗄️ MongoDB Models
    User Model
    {
        name: String,
        email: { type: String, required: true, unique: true },
        passwordHash: String,
        role: { type: String, enum: ['CUSTOMER','OFFICER'], required: true }
    }

    Customer Model
    {
        userId: ObjectId,
        income: Number,
        creditScore: Number
    }

    Officer Model
    {
        userId: ObjectId,
        branch: String
    }

    Loan Application Model
    {
        customerId: ObjectId,
        officerId: ObjectId,
        amountRequested: Number,
        tenureMonths: Number,
        interestRate: Number,
        status: { type: String, enum: ['PENDING','APPROVED','REJECTED'], default: 'PENDING' },
        eligibilityScore: Number
    }


🧮 Loan Eligibility Logic
    Normalization
        incomeNorm = income / maxIncome
        creditScoreNorm = creditScore / 900

    Final Score
        score = (0.6 * creditScoreNorm) + (0.4 * incomeNorm)

    Decision
        If score >= threshold → APPROVED
        Else → REJECTED

    This logic runs in loanService.evaluateLoan().


🔌 API Documentation

    AUTH APIs
        POST /auth/register
        Registers a new user.

        POST /auth/login
        Logs in and returns JWT token.

    LOAN APIs
        POST /loans/apply
        Create a loan application.

        GET /loans/:id/status
        Get loan status & eligibility score.

    OFFICER APIs
        GET /officer/loans/pending
        Fetch all pending loan applications.

        POST /officer/loans/:id/review
        Approve / Reject a loan.


🔐 JWT Authentication

    All protected routes require:
        Authorization: Bearer <token>

        Middleware verifies:
            Token
            User ID
            Role
            Attaches req.user
        Officer routes are restricted to officer role only.


▶️ How to Run the Project
    Step 1: Start backend
        cd backend
        npm start

    Step 2: Start frontend
        cd frontend
        npm run dev

    Step 3: Visit Application

    👉 http://localhost:5173


👤 Author
    Sarthak Chauhan
    Loan Approval System – MERN Project
