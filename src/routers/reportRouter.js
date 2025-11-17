const express = require("express");
const { auth } = require("../middlewares/authMiddleware");
const { monthlyReport } = require("../controllers/reportController");

const router = express.Router();

router.get("/", auth, monthlyReport);

module.exports=router;