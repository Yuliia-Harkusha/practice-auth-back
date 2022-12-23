const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { contactsRouter, notesRoute, userRouter } = require("./routes");

require("dotenv").config();
const { DB_HOST } = process.env;

const app = express();

app.use(cors());
app.use(express.json());
app.use("/users", userRouter);
app.use("/contacts", contactsRouter);
app.use("/notes", notesRoute);
mongoose.set("strictQuery", false);
mongoose.connect(DB_HOST, () => {
  console.log("DB start");
});
app.listen(3001, () => {
  console.log("server start");
});
