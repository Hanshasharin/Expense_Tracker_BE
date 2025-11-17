const User =require( "../models/user.js")
const bcrypt = require("bcrypt")
const jwt = require( "jsonwebtoken")

const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({ email, password: hashed });

    res.json({ message: "Signup successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

 const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

   res.cookie("token", token, {
      httpOnly: true,
        secure: true,        // required for cross-site cookies
       sameSite: "none",
     
    });

    return res.json({
      success: true,
      message: "Login successful",
      user: { id: user._id, email: user.email }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
  
module.exports = {
  signup,
  login
};


