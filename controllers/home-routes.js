//handlebars routes //open
const router = require("express").Router();
const sequelize = require("../config/connection");
const withAuth = require("../utils/auth");
const { Book, User, Comment } = require("../models");

router.get("/", (req, res) => {
  console.log(req.session);
  Book.findAll({
    // model: Book attributes pulled in as object
    attributes: [
      "id",
      "title",
      "author",
      "published_date",
      "file_name",
      "pages",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM vote WHERE book.id = vote.book_id)"
        ),
        "vote_count",
      ],
    ],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "book_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbBookData) => {
      const books = dbBookData.map((book) => book.get({ plain: true }));
      // pass a single book object into the homepage template
      res.render("homepage", { books });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

// testing for below route
// const book = {
//   id: 1,
//   book_url: "https://handlebarsjs.com/guide/",
//   title: "Handlebars Docs",
//   created_at: new Date(),
//   vote_count: 10,
//   comments: [{}, {}],
//   user: {
//     username: "test_user",
//   },
// };

// show one book
router.get("/book/:id", (req, res) => {
  Book.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      "id",
      // "book_url", left to build in if wanted to set link to amazon purchase
      "title",
      "created_at",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM vote WHERE book.id = vote.book_id)"
        ),
        "vote_count",
      ],
    ],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "book_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbBookData) => {
      if (!dbBookData) {
        res.status(404).json({ message: "No book found with this id" });
        return;
      }

      // serialize the data
      const book = dbBookData.get({ plain: true });

      // pass data to template
      res.render("single-book", { book });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// router.get("/", async (req, res) => {
//   try {
//     const dbBookData = await Book.findAll({
//       include: [
//         {
//           // model: Book,
//           attributes: [
//             "id",
//             "title",
//             "author",
//             "published_date",
//             "file_name",
//             "pages",
//           ],
//         },
//       ],
//       raw: true,
//     });

//     const book = dbBookData.map({ plain: true });

//     res.render("book", { book });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

router.get("/booklist", (req, res) => {
  //book.findname.route //include books for author
});

module.exports = router;
