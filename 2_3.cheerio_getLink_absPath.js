var client = require('cheerio-httpcli');
var urlModule = require('url');

var url = "http://bearpot.net";
var param = {};

client.fetch(url, param, function(err, $, res) {
  if (!err) {
    $('a').each(function(idx) {
      var text = $(this).text();
      var href = $(this).attr('href');

      if(!href) return;
      var ads_href = urlModule.resolve(url, href);
      console.log(text+':'+href);
      console.log(" => " + ads_href + "\n");
    })
  } else {
    console.log(err);
  }
})