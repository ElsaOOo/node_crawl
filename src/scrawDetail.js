const Crawler = require("crawler");
const { Comments, BookDetail } = require("../model/BookDetail"); 
const { findIsbn } = require("../utils");

function getBookDetail(url) {

  const bookDetail = new BookDetail();

  // 爬取详情页数据
  const detailC = new Crawler({
    maxConnections: 10,
  })
  return new Promise(function (resolve, reject) {
    detailC.queue([{
      uri: url,
      callback: function (error, res, done) {
        if(error){
          console.log(error);
          reject(error);
        }else{
          const $ = res.$;
          // 获取isbn
          bookDetail.isbn = findIsbn($("div#info").text());
          // 获取标签
          const tagDom = $("#db-tags-section .indent a")
          const tags = [];
          const comments = [];
          tagDom.each(function () {
            tags.push($(this).text());
          })
          bookDetail.tags = tags.join(",");

          // 获取评论
          const commentsDom = $("#comments .comment-item")
          commentsDom.each(function () {
            const name = $(this).find(".comment-info > a").text();
            const date = $(this).find(".comment-info > span:last-child").text();
            const content = $(this).find(".comment-content > .short").text();
            const comment = new Comments(name, date, content);
            comments.push(comment);
          })
          bookDetail.comments = comments;
          resolve(bookDetail);
        }
        done();
      } 
    }])
  });
}

module.exports = getBookDetail;