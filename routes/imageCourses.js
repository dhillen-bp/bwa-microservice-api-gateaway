const express = require("express");
const router = express.Router();
const imageCoursesHandler = require("./handler/image-courses");

router.post("/", imageCoursesHandler.create);
router.get("/", imageCoursesHandler.getAll);
router.get("/:id", imageCoursesHandler.get);
router.put("/:id", imageCoursesHandler.update);
router.delete("/:id", imageCoursesHandler.destroy);

module.exports = router;
