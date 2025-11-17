const Expense =require("../models/expense.js")
const Budget =require("../models/budget.js")

 const monthlyReport = async (req, res) => {
  try {
    const { month } = req.query;

    const budgets = await Budget.find({ userId: req.userId }).populate("categoryId");

    const expenses = await Expense.find({
      userId: req.userId,
    date: { $gte: `${month}-01`, $lte: `${month}-31` }

    });

    // const report = budgets
    //   .filter(b => b.categoryId !== null)
    // .map((b) => {
    //   const totalSpent = expenses

    //     .filter((e) => e.categoryId.toString() === b.categoryId._id.toString())
    //     .reduce((sum, x) => sum + x.amount, 0);

    //   return {
    //     category: b.categoryId.name,
    //     limit: b.limit,
    //     spent: totalSpent,
    //     remaining: b.limit - totalSpent
    //   };
    // });
const report = budgets
  .filter(b => b.categoryId)   // skip null categories
  .map((b) => {
    const totalSpent = expenses
      .filter(e => e.categoryId && b.categoryId && e.categoryId.toString() === b.categoryId._id.toString())
      .reduce((sum, x) => sum + x.amount, 0);

    return {
      category: b.categoryId.name,
      limit: b.limit,
      spent: totalSpent,
      remaining: b.limit - totalSpent
    };
  });

    res.json(report);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {monthlyReport}