const fs = require("fs");
const Crawler = require("crawler");
const { trimText,getBookDetails } = require("./utils");
const Book = require("./model/Book");
const getBookDetail = require("./src/scrawDetail");
const { BookEntity } = require('./entity/Book');
const bookArr = [];
// 获取图片url
// $("a.cover > img").attr("src")


const c = new Crawler({
  maxConnections: 10,
  callback: function (error, res, done) {
    if (error) {
      console.log(error);
    } else {
      const $ = res.$;
      // 找到虚构类 .article ul li 下所有li标签
      // const fictionLis = $("div.article > ul > li");
      // 找到非虚构类 .article ul li 下所有li标签
      const nunFictionLis = $("div.aside > ul > li");
      nunFictionLis.each(function () {
        const book = getBookDetails($(this))
        // 跳转url
        const jumpUrl = $(this).find(".detail-frame h2 a").attr("href")
        getBookDetail(jumpUrl).then((res, err) => {
          if (err) {
            console.log(err)
          }
          book.setDetails(JSON.stringify(res));
          book.setIsbn(res.isbn);
          BookEntity
            .findOrCreate({where: {isbn: book.isbn}, defaults: {...book}})
            .then(([res, created]) => {
              // console.log(res.get({
              //   plain: true
              // }))
              console.log(created)
              // 如果已经存在就更新
              if (!created) {
                BookEntity.update({
                  updatedAt: new Date().toJSON(),
                  ...book
                }, { where: {
                    isbn: book.isbn
                }})
              }
            })
        }).catch(err => {
          console.log(err)
        });
      })
    }
    done();
  }
})

c.queue('https://book.douban.com/latest?icn=index-latestbook-all')
