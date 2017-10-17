var casper = require('casper').create({verbose: true, loglevel:"debug"});
var url = "YOUR TISTORY BLOG URL/admin/center/"
var id = 'YOUR ID';
var password = 'YOUR PASSWORD';

casper.start();
casper.open(url);

// Form submit
casper.then(function() {
    casper.fill("#authForm",{
        loginId: id,
        password: password
    }, true);
});

// Mouse click
casper.then(function(){
    var path = "#authForm > button";
    if (casper.exists(path)) {
        casper.mouseEvent('click', path);
    }
    casper.wait(3000);
});

casper.then(function() {
    this.capture('login-screen.png');
})

casper.run();