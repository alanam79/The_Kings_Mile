const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Book, User, Vote, Comment } = require("../../models");

// get all users
router.get("/", (req, res) => {
  // Query configuration
  Book.findAll({
    order: [["created_at", "DESC"]],
    attributes: [
      "id",
      "title",
      "author",
      "created_at",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM vote WHERE book.id = vote.book_id)"
        ),
        "vote_count",
      ],
    ],
    include: [
      // Comment model
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
    .then((dbBookData) => res.json(dbBookData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  Book.findOne({
    where: {
      id: req.params.id,
    },
    order: [["created_at", "DESC"]],
    attributes: [
      "id",
      "title",
      "author",
      "pages",
      "created_at",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM vote WHERE book.id = vote.book_id)"
        ),
        "vote_count",
      ],
    ],
    include: [
      // include the Comment model here:
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
      res.json(dbBookData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  // expects {title: 'Taskmaster goes public!', book_url: 'https://taskmaster.com/press', user_id: 1}
  Book.create({
    title: req.body.title,
    // book_url: req.body.book_url,
    author: req.body.author,
    pages: req.body.pages,
    user_id: req.body.user_id,
  })
    .then((dbBookData) => res.json(dbBookData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// PUT /api/books/upvote
router.put("/upvote", (req, res) => {
  // custom static method created in models/Book.js
  Book.upvote(req.body, { Vote })
    .then((updatedBookData) => res.json(updatedBookData))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update book by id
router.put("/:id", (req, res) => {
  Book.update(
    {
      title: req.body.title,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbBookData) => {
      if (!dbBookData) {
        res.status(404).json({ message: "No book found with this id" });
        return;
      }
      res.json(dbBookData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  Book.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbBookData) => {
      if (!dbBookData) {
        res.status(404).json({ message: "No book found with this id" });
        return;
      }
      res.json(dbData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
