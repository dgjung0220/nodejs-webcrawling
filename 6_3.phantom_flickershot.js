var casper = require('casper').create();

casper.start();

casper.viewport(1400, 800);

var text = encodeURIComponent("고양이");
casper.open('https://www.flickr.com/search/?text=' + text);

casper.then(function() {
    this.capture('flicker-cat.jpg', {
        top:0, left:0, width: 1400, height: 800
    });
});

casper.run();