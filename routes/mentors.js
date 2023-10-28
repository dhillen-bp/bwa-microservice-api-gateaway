const express = require("express");
const router = express.Router();
const mentorsHandler = require("./handler/mentors");

router.post("/", mentorsHandler.create);
router.get("/", mentorsHandler.getAll);
router.get("/:id", mentorsHandler.get);
router.put("/:id", mentorsHandler.update);
router.delete("/:id", mentorsHandler.destroy);

module.exports = router;
