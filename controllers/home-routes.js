//handlebars routes //open
const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("homepage");
});

router.get("/", (req, res) => {
  res.render("homepage", {
    id: 1,
    post_url: "https://handlebarsjs.com/guide/",
    title: "Handlebars Docs",
    created_at: new Date(),
    vote_count: 10,
    comments: [{}, {}],
    user: {
      username: "test_user",
    },
  });
});

// router.get("/booklist", (req, res) => {
//book.findname.route //include books for author
// });

module.exports = router;
