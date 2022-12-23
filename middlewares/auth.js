const jwt = require("jsonwebtoken");
const User = require("../model/user");
require("dotenv").config();
const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    // console.log(token);

    const payload = jwt.verify(token, SECRET_KEY);

    const candidate = await User.findById(payload.id);
    if (!payload || !candidate || !token) {
      throw new Error("Not authorized");
    }
    req.user = candidate;
    next();
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

module.exports = auth;
