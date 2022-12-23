const { Note, Contact } = require("../model");

const getAllNote = async (req, res) => {
  const result = await Note.find().populate("contact");
  res.send(result);
};

const createNote = async (req, res) => {
  const result = await Note.create(req.body);
  await Contact.findByIdAndUpdate(
    req.body.contact,
    { $push: { notes: result._id } },
    { new: true }
  );
  res.send(result);
};

const removeNote = async (req, res) => {
  const result = await Note.findByIdAndDelete(
    req.params.idNote
  );
  await Contact.findByIdAndUpdate(
    result.contact,
    { $pull: { notes: result._id } },
    { new: true }
  );
  res.send(result);
};

module.exports = {
  getAllNote,
  createNote,
  removeNote,
};
