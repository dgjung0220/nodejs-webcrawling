var TARGET_URL = "http://bearpot.net";

var casper = require('casper').create();

casper.start(TARGET_URL, function() {
    this.echo(casper.getTitle());
});

casper.run();