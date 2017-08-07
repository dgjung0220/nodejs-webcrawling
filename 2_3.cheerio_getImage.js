var client = require('cheerio-httpcli');
var urlModule = require('url');

var url = "https://ko.wikipedia.org/wiki/" + encodeURIComponent('고양이');
var param = {};

client.fetch(url, param, function(err, $, res) {
  if (!err) {
    $('img').each(function(idx){
      var src = $(this).attr('src');
      src = urlModule.resolve(url, src);
      console.log(src);
    })
  }
})