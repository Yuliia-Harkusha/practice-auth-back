const contactsRouter = require("./contacts");
const notesRoute = require("./notes");
const {userRouter} = require("./auth")

module.exports = {
  contactsRouter,
  notesRoute,
  userRouter,
  
};
