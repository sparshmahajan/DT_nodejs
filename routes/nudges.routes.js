const express = require("express");
const router = express.Router();

const { addNudge, findNudge, deleteNudge, updateNudge } = require("../controllers/nudges.controller");

router.post("/", addNudge);
router.get("/", findNudge);
router.put("/:id", updateNudge);
router.delete("/:id", deleteNudge);

module.exports = router;