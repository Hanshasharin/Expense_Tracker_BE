📘 Budget Tracker Application

Full-stack app using React + Node.js + Express + MongoDB

A personal budgeting system that allows users to:

✔ Create categories
✔ Add monthly budgets
✔ Add expenses
✔ View monthly spending reports
✔ Track remaining balance visually
✔ Secure login with JWT + HttpOnly cookies

🚀 Live Demo (Optional)

Add links here when deployed:

🌐 Frontend:
https://your-frontend-url.com

🖥 Backend API:
https://your-backend-url.com

📦 Tech Stack
Frontend

React (Vite)

Axios

TailwindCSS

React Router DOM

Backend

Node.js

Express.js

MongoDB (Mongoose)

JWT Authentication

CORS + Cookies

📂 Project Structure
project-folder/
│── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── index.js
│   ├── package.json
│   └── .env
│
│── frontend/
│   ├── src/
│   ├── public/
│   ├── vite.config.js
│   ├── package.json
│   └── .env
│


⚙️ Installation Guide
1️⃣ Clone the Repository
git clone <your-repo-url>
cd project-folder

🗄 Backend Setup (Node.js)
Open the backend folder:
cd backend

Install backend dependencies:
npm install

Create .env file:

Or copy from .env.example.

PORT=3000
MONGO_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/BudgetApp
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173

Start backend:
npm run dev


API runs at:
👉 http://localhost:3000

🎨 Frontend Setup (React + Vite)
Open the frontend folder:
cd frontend

Install dependencies:
npm install

Create .env file:
VITE_API_URL=http://localhost:3000

Start frontend:
npm run dev


Frontend runs at:
👉 http://localhost:5173

🔐 Authentication Flow
Signup
POST /api/user/signup

Login
POST /api/user/login


Sets HttpOnly Cookie

Used for authorization in every protected route

Get Logged-in User
GET /api/user/me

📁 Categories API
Create Category
POST /api/category

Get Categories
GET /api/category

💰 Budget API
Add Monthly Budget
POST /api/budget

Get Budgets
GET /api/budget

🧾 Expense API
Add Expense
POST /api/expense

Get Expenses
GET /api/expense

📊 Monthly Report API
Get Report for a Month
GET /api/report?month=2025-02


Response Example

[
  {
    "category": "Food",
    "limit": 5000,
    "spent": 3000,
    "remaining": 2000
  }
]

🎯 Frontend Features
✔ Authentication

Signup

Login

Logout

Protected pages

✔ Category Page

Add / Edit / Delete categories

✔ Budget Page

Add monthly budgets

Prevent duplicate category budget in same month

✔ Expense Page

Add expense

Linked with categories and budget

✔ Monthly Report Page

Visual cards

Progress bars

Total spent & remaining balance

✔ Home Dashboard

Month selector

Overview of all categories in selected month

🚀 Deployment Instructions
Backend (Render / Railway)

Create new Web Service

Add repo

Add environment variables

Build command:

npm install


Start command:

npm start

Frontend (Vercel / Netlify)

Select Vite project

Add environment variable:

VITE_API_URL=https://your-backend.com

🧪 Testing the API

Use Postman or Thunder Client.

✔ Test signup
✔ Test login
✔ Check cookie appears in browser
✔ Test protected routes

🤝 Contributing

Pull requests and improvements are welcome!

📧 Contact

If you need help, reach out anytime.