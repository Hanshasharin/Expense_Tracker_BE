const mongoose = require("mongoose");

const Budget = require("../models/budget.js");

const setBudget = async (req, res) => {
  try {
    const { categoryId, month, limit } = req.body;

    const catId = new mongoose.Types.ObjectId(categoryId);

    // Check existing budget
    const existing = await Budget.findOne({
      userId: req.userId,
      categoryId: catId,
      month,
    });

    if (existing) {
      return res.status(400).json({
        message: "Budget already added for this category in this month",
      });
    }

    // Save new budget
    const budget = await Budget.create({
      userId: req.userId,
      categoryId: catId,
      month,
      limit,
    });

    res.json({
      message: "Budget added successfully",
      budget,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({
      userId: req.userId,
      month: req.query.month,
    }).populate("categoryId");

    res.json(budgets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { setBudget, getBudgets };
