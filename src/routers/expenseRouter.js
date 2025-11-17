const express = require("express");
const { auth } = require("../middlewares/authMiddleware");
const { addExpense } = require("../controllers/expenseController");


const router = express.Router();

router.post("/add", auth, addExpense);

module.exports= router;