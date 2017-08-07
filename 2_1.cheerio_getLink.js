var client = require('cheerio-httpcli');

var url = "http://bearpot.net";
var param = {};

client.fetch(url, param, function(err, $, res) {
  if (!err) {
    $('a').each(function(idx) {
      var text = $(this).text();
      var href = $(this).attr('href');
      console.log(text+':'+href);
    })
  } else {
    console.log(err);
  }
})