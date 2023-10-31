const express = require("express");
const path = require("path");
const router = express.Router();

const {
  getContacts,
  getContact,
  createContact,
  updateContact,
  delContact,
} = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);
router.route("/").get(getContacts).post(createContact);
router.route("/:id").get(getContact).put(updateContact).delete(delContact);

module.exports = router;
