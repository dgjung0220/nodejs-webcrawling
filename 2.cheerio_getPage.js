var client = require('cheerio-httpcli');

var url = "http://bearpot.net";
var param = {};

client.fetch(url, param, function(err, $, res) {
  if (!err) {
    var body = $.html();
    console.log(body);
  } else {
    console.log(err);
  }
})