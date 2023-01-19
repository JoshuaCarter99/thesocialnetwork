const {
  getThoughts,
  createThought,
  getSingleThoughts,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require("../../controllers/thoughtsController");

const router = require("express").Router();

router.get("/", getThoughts);
router.post("/", createThought);
router.get("/:thoughtId", getSingleThoughts);
router.put("/:thoughtId", updateThought);
router.delete("/:thoughtId", deleteThought);
router.post("/:thoughtId/reactions", createReaction);
router.delete("/:thoughtId/reactions", deleteReaction);
module.exports = router;