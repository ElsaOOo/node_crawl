const Crawler = require("crawler");
const Book = require("./model/Book");
const findIsbn = require("./utils");
const { trimText } = require("./utils");
const c = new Crawler({
  maxConnections: 10,
  callback: function (error, res, done) {
    if (error) {
      console.log(error);
    } else {
      const $ = res.$;
      // 找到非虚构类 .article ul li 下所有li标签
      const nunFictionLis = $("div.aside > ul > li");
      nunFictionLis.each(function () {
        // 创建一个数据对象
        const book = new Book();
        const coverUrl = $(this).find('a.cover > img').attr("src");
        book.setCoverUrl(coverUrl);
        const title = $(this).find("div.detail-frame > h2 > a").text();
        book.setTitle(title);

        const rate = $(this).find("p.rating > span.font-small").text();
        book.setRate(trimText(rate));
        const publicInfo = $(this).find("p.color-gray").text();
        book.setPublishInfo(trimText(publicInfo));
        const abstract = $(this).find("p.detail > p:last-child").text();
        book.setAbstract(trimText(abstract));
        console.log(book);
      })
    }
    done();
  }
})

c.queue('https://book.douban.com/latest?icn=index-latestbook-all')

// c.queue('https://book.douban.com/subject/30380282/')
// const { BookEntity } = require('./entity/Book');

// const testArr = [
//   {
//     title: 'test2',
//     coverUrl: 'baidu.com2',
//     rate: '7.8',
//     publishInfo: 'hsdkflskjfkl2',
//     abstract: 'sadflksdjflksdjf2',
//     isbn: '123456',
//     details: 'sldjflksjdlfj2'
//   },
//   {
//     title: 'LSKDJFL',
//     coverUrl: 'baidu.com2',
//     rate: '7.8',
//     publishInfo: 'hsdkflskjfkl2',
//     abstract: 'sadflksdjflksdjf2',
//     isbn: '80239840',
//     details: 'sldjflksjdlfj2'
//   },
//   {
//     title: 'WOEURIEU',
//     coverUrl: 'baidu.com2',
//     rate: '7.8',
//     publishInfo: 'hsdkflskjfkl2',
//     abstract: 'sadflksdjflksdjf2',
//     isbn: '230489',
//     details: 'sldjflksjdlfj2'
//   }
// ]


// testArr.forEach(book => {
//   BookEntity
//     .findOrCreate({where: {isbn: book.isbn}, defaults: {...book}})
//     .then(([res, created]) => {
//       console.log(created);
//     })
// })
