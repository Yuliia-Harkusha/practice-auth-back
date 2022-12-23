const { Schema, model } = require("mongoose");

const notesSchema = Schema({
  title: String,
  text: String,
  contact: {
    ref: "contact",
    type: Schema.Types.ObjectId,
  },
});

const Note = model("note", notesSchema);

module.exports = Note;
