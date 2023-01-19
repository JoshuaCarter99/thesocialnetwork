const router = require("express").Router();
const {
  createUser,
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  createFriend,
  deleteFriend,
} = require("../../controllers/userController");

router.get("/", getUsers);
router.get("/:userId", getSingleUser);
router.post("/", createUser);
router.put("/:userId", updateUser);
router.delete("/:userId", deleteUser);
router.post("/:userId/friends/:friendId", createFriend);
router.delete("/:userId/friends/:friendId", deleteFriend);

module.exports = router;