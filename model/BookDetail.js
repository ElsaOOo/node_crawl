
function Comments(name, date, content) {
  this.name = name;
  this.date = date;
  this.content = content;
}

function BookDetail(
  tags,
  isbn,
) {
  this.isbn = isbn;
  this.tags = tags;
}
BookDetail.prototype.setComment = function (comments) {
  this.comments = comments;
}

module.exports = {
  Comments,
  BookDetail
}