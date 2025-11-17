// const Category= require("../models/category.js")

// const createCategory = async (req, res) => {
//   try {
//     const category = await Category.create({
//       userId: req.userId,
//       name: req.body.name,
//       color: req.body.color
//     });

//     res.json(category);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

//  const getCategories = async (req, res) => {
//   try {
//     const categories = await Category.find({ userId: req.userId });
//     res.json(categories);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// const updateCategory = async (req, res) => {
//   try {
//     const { name, color } = req.body;

//     const updated = await Category.findOneAndUpdate(
//       {
//         _id: req.params.id,
//         userId: req.userId
//       },
//       { name, color },
//       { new: true }
//     );

//     if (!updated) {
//       return res.status(404).json({ message: "Category not found" });
//     }

//     res.json({ message: "Category updated", category: updated });

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// const deleteCategory = async (req, res) => {
//   try {
//     const deleted = await Category.findOneAndDelete({
//       _id: req.params.id,
//       userId: req.userId
//     });

//     if (!deleted) {
//       return res.status(404).json({ message: "Category not found" });
//     }

//     res.json({ message: "Category deleted" });

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


// module.exports = {createCategory,getCategories,updateCategory,deleteCategory}


const Category = require("../models/category.js");
const Budget = require("../models/budget.js");
const Expense = require("../models/expense.js");

const createCategory = async (req, res) => {
  try {
    const category = await Category.create({
      userId: req.userId,
      name: req.body.name,
      color: req.body.color
    });

    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ userId: req.userId });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { name, color } = req.body;

    const updated = await Category.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { name, color },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json({ message: "Category updated", category: updated });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    const deleted = await Category.findOneAndDelete({
      _id: categoryId,
      userId: req.userId
    });

    if (!deleted) {
      return res.status(404).json({ message: "Category not found" });
    }

    // cleanup
    await Budget.updateMany(
      { categoryId },
      { $set: { categoryId: null } }
    );

    await Expense.updateMany(
      { categoryId },
      { $set: { categoryId: null } }
    );

    return res.json({ message: "Category deleted and references cleared" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createCategory, getCategories, updateCategory, deleteCategory };
