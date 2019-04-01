function Book() {}
Book.prototype.setTitle = function (title) {
  this.title = title;
}
Book.prototype.setCoverUrl = function (url) {
  this.coverUrl = url;
}
Book.prototype.setRate = function (rate) {
  this.rate = rate;
}
Book.prototype.setPublishInfo = function (info) {
  this.publishInfo = info;
}
Book.prototype.setAbstract = function (abs) {
  this.abstract = abs;
}
Book.prototype.setIsbn = function (isbn) {
  this.isbn = isbn;
}
Book.prototype.setDetails = function (details) {
  this.details = details;
}
module.exports = Book;