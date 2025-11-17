const express = require("express");
const { auth } = require("../middlewares/authMiddleware");
const { setBudget, getBudgets } = require("../controllers/budgetController");


const router = express.Router();

router.post("/set", auth, setBudget);
router.get("/get", auth, getBudgets);

module.exports= router;
