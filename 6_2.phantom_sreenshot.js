var casper = require('casper').create();

casper.start();
casper.open('http://bearpot.net');
casper.then(function() {
    casper.capture("screenshot.png");
})
casper.run();