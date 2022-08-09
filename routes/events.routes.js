const express = require("express");
const router = express.Router();

const { addEvent, findEvent, deleteEvent, updateEvent } = require("../controllers/events.controller");

router.post("/", addEvent);
router.get("/", findEvent);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);

module.exports = router;