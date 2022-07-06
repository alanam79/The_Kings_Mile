const { Book } = require("../models");

const bookdata = [
  {
    title: "Carrie",
    author: "Stephen King",
    published_date: "04/05/1974",
    file_name: "Carrie.jpg",
    pages: "199",
  },
  {
    title: "Salem's Lot",
    author: "Stephen King",
    published_date: "10/17/1975",
    file_name: "Salem's-Lot.jpg",
    pages: "439",
  },
  {
    title: "The Shining",
    author: "Stephen King",
    published_date: "01/2/1977",
    file_name: "The-Shining.jpg",
    pages: "447",
  },
  {
    title: "IT",
    author: "Stephen King",
    published_date: "09/15/1986",
    file_name: "IT.jpg",
    pages: "1138",
  },
  {
    title: "The Stand",
    author: "Stephen King",
    published_date: "10/03/1978",
    file_name: "The-Stand.jpg",
    pages: "1152",
  },
  {
    title: "The Green Mile",
    author: "Stephen King",
    published_date: "08/29/1996",
    file_name: "The-Green-Mile.jpg",
    pages: "400",
  },
];

const seedBooks = () => Book.bulkCreate(bookdata);

module.exports = seedBooks;
