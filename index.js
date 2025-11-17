const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
var cors = require('cors')
const app = express();

require('dotenv').config();

    var corsOptions = {
      
  // origin: process.env.CLIENT_URL,
  origin: [
     "http://localhost:5173",
      "https://expense-tracker-fe-henna.vercel.app",
      "https://expense-tracker-gcl5kqmd4-hansha-sharins-projects.vercel.app"
  ],
  credentials: true,               // allow cookies
  optionsSuccessStatus: 200

};
app.use(cors(corsOptions));



    


const port = process.env.PORT;

const userRouter = require('./src/routers/userRouter')
const categoryRouter = require ('./src/routers/categoryRouter')
const expenseRouter = require ('./src/routers/expenseRouter')
const reportRouter = require ('./src/routers/reportRouter')
const budgetRouter = require ('./src/routers/budgetRouter')

const dbConnectionLink = process.env.DB_CONNECTION_LINK;

// Middlewares
app.use(cookieParser());
app.use(express.json()); // ✅ This must come before routes


app.use("/api/user", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/budgets", budgetRouter);
app.use("/api/expenses", expenseRouter);
app.use("/api/report", reportRouter);



// DB Connection
mongoose.connect(dbConnectionLink)
  .then(() => console.log("DB connected"))
  .catch(err => console.error("DB connection error:", err));

app.get("/", (req, res) => {
  res.send("<h1>expense tracker</h1>");
});

app.listen(port, () => {
  console.log(`Server running on ${port}...`);
});
