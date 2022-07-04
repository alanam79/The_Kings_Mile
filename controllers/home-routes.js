//handlebars routes //open
const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("homepage");
});

router.get("/booklist", (req, res) => {
  //book.findname.route //include books for author
});

module.exports = router;
