const express = require("express");
const { auth } = require("../middlewares/authMiddleware");
const { createCategory, getCategories, updateCategory, deleteCategory } = require("../controllers/categoryController");

const router = express.Router();

router.post("/create", auth, createCategory);
router.get("/get", auth, getCategories);
router.put("/update/:id", auth, updateCategory);
router.delete("/delete/:id", auth, deleteCategory);
module.exports = router;
