const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Error("User already exists");
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ name, password: hashPassword, email });
  const token = jwt.sign({ id: newUser._id }, SECRET_KEY, { expiresIn: "2h" });
  await User.findByIdAndUpdate(newUser._id, { token }, { new: true });

  res.status(201).json({
    user: { name, email },
    token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User do not exists");
  }
  if (!bcrypt.compare(password, user.password)) {
    throw new Error("wrong password");
  }
  const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "2h" });
  const updateUser = await User.findByIdAndUpdate(
    user._id,
    { token },
    { new: true }
  );

  res.json({
    user: {
      name: user.name,
      email,
    },
    token,
  });
};

const getCurrent = async (req, res) => {
  const { email, name } = req.user;
  res.json({ name, email });
};

const logout = async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { token: "" });
  res.json({ message: "Logout success" });
};

module.exports = {
  register,
  login,
  getCurrent,
  logout,
};
