const { Schema, model } = require("mongoose");

const contactsSchema = Schema({
  name: String,
  surname: String,
  son: String,
  age: Number,
  phone: String,
  notes: [{ ref: "note", type: Schema.Types.ObjectId }],
  owner: {
    type: Schema.Types.ObjectId,
  }
});

const Contact = model("contact", contactsSchema);

module.exports = Contact;
