const Expense =require("../models/expense.js")
const Budget =require("../models/budget.js")

//  const monthlyReport = async (req, res) => {
//   try {
//     const { month } = req.query;

//     const budgets = await Budget.find({ userId: req.userId }).populate("categoryId");

//     const expenses = await Expense.find({
//       userId: req.userId,
//     date: { $gte: `${month}-01`, $lte: `${month}-31` }

//     });

//     // const report = budgets
//     //   .filter(b => b.categoryId !== null)
//     // .map((b) => {
//     //   const totalSpent = expenses

//     //     .filter((e) => e.categoryId.toString() === b.categoryId._id.toString())
//     //     .reduce((sum, x) => sum + x.amount, 0);

//     //   return {
//     //     category: b.categoryId.name,
//     //     limit: b.limit,
//     //     spent: totalSpent,
//     //     remaining: b.limit - totalSpent
//     //   };
//     // });
// const report = budgets
//   .filter(b => b.categoryId)   // skip null categories
//   .map((b) => {
//     const totalSpent = expenses
//       .filter(e => e.categoryId && b.categoryId && e.categoryId.toString() === b.categoryId._id.toString())
//       .reduce((sum, x) => sum + x.amount, 0);

//     return {
//       category: b.categoryId.name,
//       limit: b.limit,
//       spent: totalSpent,
//       remaining: b.limit - totalSpent
//     };
//   });

//     res.json(report);

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };








// const monthlyReport = async (req, res) => {
//   try {
//     const { month } = req.query; // format: 2024-12

//     const startDate = new Date(`${month}-01`);
//     const endDate = new Date(startDate);
//     endDate.setMonth(endDate.getMonth() + 1);

//     const budgets = await Budget.find({
//       userId: req.userId
//     }).populate("categoryId");

//     const expenses = await Expense.find({
//       userId: req.userId,
//       date: { $gte: startDate, $lt: endDate }
//     });

//     const report = budgets
//       .filter(b => b.categoryId !== null)
//       .map(b => {
//         const totalSpent = expenses
//           .filter(e => e.categoryId.toString() === b.categoryId._id.toString())
//           .reduce((sum, x) => sum + x.amount, 0);

//         return {
//           category: b.categoryId.name,
//           limit: b.limit,
//           spent: totalSpent,
//           remaining: b.limit - totalSpent
//         };
//       });

//     res.json(report);

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// module.exports = {monthlyReport}







const Budget = require("../models/budget.js");
const Expense = require("../models/expense.js");

const monthlyReport = async (req, res) => {
  try {
    const { month } = req.query; // "2025-11"

    // 1. Compute start & end date for the month
    const [year, mon] = month.split("-");
    const startDate = new Date(year, mon - 1, 1);
    const endDate = new Date(year, mon, 1); // exclusive

    // 2. Fetch budgets of this month
    const budgets = await Budget.find({
      userId: req.userId,
      month
    }).populate("categoryId");

    // 3. Fetch expenses within this month
    const expenses = await Expense.find({
      userId: req.userId,
      date: { $gte: startDate, $lt: endDate }
    }).populate("categoryId");

    // 4. Combine budgets + expenses per category
    const report = budgets
      .filter(b => b.categoryId !== null)
      .map(b => {
        const totalSpent = expenses
          .filter(e => e.categoryId._id.toString() === b.categoryId._id.toString())
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

module.exports = { monthlyReport };
