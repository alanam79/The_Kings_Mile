const router = require("express").Router();

const userRoutes = require("./user-routes");
const bookRoutes = require("./book-routes");
const commentRoutes = require("./comment-routes");
const homeRoutes = require('./home-routes.js');

router.use("/users", userRoutes);
router.use("/books", bookRoutes);
router.use("/comments", commentRoutes);
router.use('/', homeRoutes);

module.exports = router;
