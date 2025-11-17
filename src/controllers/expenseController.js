const Expense = require("../models/expense.js")
const Budget = require("../models/budget.js")

 const addExpense = async (req, res) => {
  try {
    const { categoryId, amount, date } = req.body;

    // Create expense
    const expense = await Expense.create({
      userId: req.userId,
      categoryId,
      amount,
      date
    });

    // Extract month (YYYY-MM)
    const month = date.substring(0, 7);

    // Find budget for this month
    const budget = await Budget.findOne({
      userId: req.userId,
      categoryId,
      month
    });

    // Build correct date range
    const startDate = `${month}-01`;
    const endDate = `${month}-31`; // Works fine for monthly range filtering

    // Fetch all expenses in this month
    const expenses = await Expense.find({
      userId: req.userId,
      categoryId,
      date: { $gte: startDate, $lte: endDate }
    });

    // Calculate total spent
    const spent = expenses.reduce((sum, e) => sum + e.amount, 0);

    // Check if over budget
    const overBudget = budget ? spent > budget.limit : false;

    res.json({
      expense,
      overBudget,
      spent,
      limit: budget ? budget.limit : 0
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports= {addExpense,}