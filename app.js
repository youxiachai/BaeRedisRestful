/*
 * BAE Node.js application demo
 */

/* Port which provided by BAE platform */
//var port = process.env.APP_PORT | 3001;

/*
 * Create an HTTP server
 * which is as similar as http://nodejs.org/api/http.html mentioned
 */

var http = require('http');
var express = require('express');
var app = express();

app.configure(function () {
    //set views
//    app.set('views', __dirname + '/views');
//    app.set('view engine', 'ejs');
    app.set('port', process.env.APP_PORT || 3001);
  //  app.use(express.logger('dev'));
    // cookie support
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    //session support
    app.use(express.session({ secret: 'keyboard cat' }));


    //set router
    app.use(app.router);

    app.use(express.static(__dirname + '/public'));
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});



/* Enjoy it! */

app.get('/', function (req, res) {
    res.redirect('/index.html');
});

//app.get('/:user', function (req, res) {
//
//    //
//    var use = req.params.user;
//    res.send(200 ,"hello world" + use);
//});

var getMehond = require(__dirname + '/routes/gets');
app.get('/get/:key', getMehond.get);

var setMethod = require(__dirname + '/routes/sets');
app.post('/set/:key', setMethod.set);
app.post('/set/:key/:options', setMethod.set);
app.post('/set/:key/:options/:args', setMethod.set);
//app.post('/set/:key/EX/:seconds');

var keysCmd = require(__dirname + '/routes/keys');
app.delete('/del/:key', keysCmd.del);
app.get('/ttl/:key', keysCmd.ttl);


http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port') + "\n" + process.env.NODE_ENV);
    // console.log(process.env);
});
