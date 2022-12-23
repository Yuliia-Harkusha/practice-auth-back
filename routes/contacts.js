const router = require("express").Router();
const {
  getAll,
  removeContact,
  createContact,
  getByQuery,
} = require("../controllers");
const auth = require("../middlewares/auth");

router.get("/", auth, getAll);
router.get("/:query", auth, getByQuery);
router.post("/", auth, createContact);
router.delete("/:id", auth, removeContact);

module.exports = router;
