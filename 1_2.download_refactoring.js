var http = require('http');
var fs = require('fs');

var download = (url, savePath, callback) => {  
  var outfile = fs.createWriteStream(savePath);
  var req = http.get(url, function(res){
    res.pipe(outfile);
    res.on('end', function() {
      outfile.close();
      callback();
    })
  })
}

download(
  'http://bearpot.net',
  'data/bearpot.html',
  function() {
    console.log('Success...');
  }
)