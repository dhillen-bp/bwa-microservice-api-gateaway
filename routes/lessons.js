const express = require("express");
const router = express.Router();
const lessonsHandler = require("./handler/lessons");

router.post("/", lessonsHandler.getAll);
router.get("/", lessonsHandler.getAll);
router.get("/:id", lessonsHandler.get);
router.put("/:id", lessonsHandler.update);
router.delete("/:id", lessonsHandler.destroy);

module.exports = router;
