const router = require("express").Router();
const {
  getAllNote,
  createNote,
  removeNote,
} = require("../controllers");

router.get("/", getAllNote);
router.post("/", createNote);
router.delete("/:idNote", removeNote);

module.exports = router;
