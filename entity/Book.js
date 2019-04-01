const Sequelize = require('sequelize');
const sequelize = require('../src/server');
const Book = sequelize.define('newbook', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: Sequelize.STRING(100),
  coverUrl: Sequelize.STRING(200),
  rate: Sequelize.STRING(50),
  publishInfo: Sequelize.STRING(200),
  abstract: Sequelize.TEXT('tiny'),
  isbn: Sequelize.STRING(50),
  details: Sequelize.TEXT('tiny')
})

Book.sync();

module.exports = {
  BookEntity: Book
}