const { text } = require("express");
const Contact = require("../model/contact");

const getAll = async (req, res) => {
  // await Contact.
  await Contact.ensureIndexes({ name: "text" });
  const result = await Contact.find({ owner: req.user._id }).populate("notes");

  res.send(result);
};

const getByQuery = async (req, res) => {
  const result = await Contact.find({
    // name: req.params.query,
    $text: { $search: req.params.query },
    // name: { $regex: req.params.query },
  });
  res.send(result);
};

const createContact = async (req, res) => {
  const result = await Contact.create({ ...req.body, owner: req.user._id });

  res.send(result);
};
const removeContact = async (req, res) => {
  console.log(req.params.id);
  const result = await Contact.findOneAndDelete({
    _id: req.params.id,
    owner: req.user._id,
  });
  res.send(result);
};

module.exports = {
  getAll,
  createContact,
  removeContact,
  getByQuery,
};
