const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// create our Book model
class Book extends Model {
  static upvote(body, models) {
    return models.Vote.create({
      user_id: body.user_id,
      book_id: body.book_id,
    }).then(() => {
      return Book.findOne({
        where: {
          id: body.book_id,
        },
        attributes: [
          "id",
          "title",
          "created_at",
          [
            sequelize.literal(
              "(SELECT COUNT(*) FROM vote WHERE book.id = vote.book_id)"
            ),
            "vote_count",
          ],
        ],
      });
    });
  }
}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    published_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    book_img: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pages: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "book",
  }
);

module.exports = Book;
