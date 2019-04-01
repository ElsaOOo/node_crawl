const Book = require("../model/Book");

// 字符串过滤去掉 去掉空字符
function trimText(text) {
  text = String(text);
  const pattern = /[^\s].*/
  return pattern.exec(text) ? pattern.exec(text)[0] : '';
}

// 匹配isbn 字符串
function findIsbn(text) {
  const pattern = /ISBN:(\s)?[0-9]+/;
  if (pattern.exec(text)) {
    return pattern.exec(text)[0].slice(6);
  }
  return '';
}

function getBookDetails(bookDom) {
   // 创建一个数据对象
   const book = new Book();
   const coverUrl = bookDom.find('a.cover > img').attr("src");
   book.setCoverUrl(coverUrl);
   const title = bookDom.find("div.detail-frame > h2 > a").text();
   book.setTitle(title);

   const rate = bookDom.find("p.rating > span.font-small").text();
   book.setRate(trimText(rate));
   const publicInfo = bookDom.find("p.color-gray").text();
   book.setPublishInfo(trimText(publicInfo));
   // 摘要 不同类别 获取dom节点的方式不同
   // div.detail-frame > p:last-child 为获取非虚构类
   // p.detail 为虚构类
   const abstract = bookDom.find("div.detail-frame > p:last-child").text();
   book.setAbstract(trimText(abstract));
   console.log(book);
   return book;
}

module.exports = {
  trimText,
  findIsbn,
  getBookDetails
}