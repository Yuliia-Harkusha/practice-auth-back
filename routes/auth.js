const { register, login, getCurrent, logout } = require("../controllers/user");
const auth = require("../middlewares/auth");
const Router = require("express").Router();

Router.post("/signup", register);

Router.post("/login", login);

Router.get("/current", auth, getCurrent);

Router.get("/logout", auth, logout);

module.exports = {
  userRouter: Router,
};
