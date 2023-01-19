const router = require("express").Router();
// const courseRoutes = require('./courseRoutes');
const userRoutes = require("./userRoutes");
const thoughtsRoutes = require("./toughtsRoutes");
// router.use('/courses', courseRoutes);
router.use("/users", userRoutes);
router.use("/thoughts", thoughtsRoutes);

module.exports = router;