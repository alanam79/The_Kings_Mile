const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");
const cleanser = require("profanity-cleanser");

// Sets to default locale of en-base for profanity cleanser
cleanser.setLocale();

router.get("/", withAuth, (req, res) => {
  Comment.findAll()
    .then((dbCommentData) => res.json(dbCommentData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", withAuth, (req, res) => {
  // TODO: future development to make upper case swear words lowercase so cleanser can pick them up
  // TODO: work on the cleanser to make it handle upper case and lower case words due to any upper case letter in the 
  // swear word for example: aSs will get around the cleanser and show in the comments
  // this is an open sourced package and can be worked on by our team
  
  // let comment = req.body.comment_text;
  // console.log("comment before filtering", comment);

  // if (/[A-Z]/.test(comment)) {
  //   console.log("this has an uppercase letter ");
  //   let lowerCaseComment = comment.toLowerCase();
  //   let noCurse = cleanser.replace(lowerCaseComment);
  //   console.log("NO CURSEEEE", noCurse);
  // } else {
  //   console.log("lowercase all day");
  // }
  // let practice = cleanser.replace(req.body.comment_text);

  // check the session
  if (req.session) {
    Comment.create({
      comment_text: cleanser.replace(req.body.comment_text),
      user_id: req.body.user_id,
      book_id: req.body.book_id,
      // use the id from the session
      user_id: req.session.user_id,
    })
      .then((dbCommentData) => res.json(dbCommentData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});

router.delete("/:id", withAuth, (req, res) => {
  // if (req.session) {
  Comment.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbCommentData) => {
      if (!dbCommentData) {
        res.status(404).json({ message: "No comment found with this id!" });
        return;
      }
      res.json(dbCommentData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  // }
});

module.exports = router;
