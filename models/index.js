const Book = require("./Book");
const User = require("./User");
const Vote = require("./Vote");
const Comment = require("./Comment");

// create associations
User.hasMany(Book, {
  foreignKey: "user_id",
});

Book.belongsTo(User, {
  foreignKey: "user_id",
});

User.belongsToMany(Book, {
  through: Vote,
  as: "voted_Books",
  foreignKey: "user_id",
});

Book.belongsToMany(User, {
  through: Vote,
  as: "voted_Books",
  foreignKey: "Book_id",
});

Vote.belongsTo(User, {
  foreignKey: "user_id",
});

Vote.belongsTo(Book, {
  foreignKey: "Book_id",
});

User.hasMany(Vote, {
  foreignKey: "user_id",
});

Book.hasMany(Vote, {
  foreignKey: "Book_id",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
});

Comment.belongsTo(Book, {
  foreignKey: "Book_id",
});

User.hasMany(Comment, {
  foreignKey: "user_id",
});

Book.hasMany(Comment, {
  foreignKey: "Book_id",
});

module.exports = { User, Book, Vote, Comment };
