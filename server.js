var express = require('express'),
    bodyParser = require('body-parser'),
    url = require('url'),
    fs = require('fs');

var app = express();
var jsonParser = bodyParser.json();

app.use(express.static('./public'));

app.get('/', function (request, response) {
    response.sendFile('./public/index.html', {
        root: __dirname
    });
});

app.get('/comments/', function (request, response) {
    response.sendFile('./comments.json', {
        root: __dirname
    });
});

app.post('/comments/', jsonParser, function (request, response) {
    var author = request.body.author;
    var text = request.body.text;
    var comment = { author: author, text: text };
    fs.readFile('./comments.json', function (error, data) {
        var comments = JSON.parse(data.toString());
        comments.push(comment);
        var commentsData = JSON.stringify(comments, null, 4);
        fs.writeFile('./comments.json', commentsData, function () {
            response.writeHead(200, {'Content-Type': 'application/json'});
            response.write(commentsData);
            response.end();
        });
    });

});

function start (){
    app.listen(8888, function () {

    });
}

exports.start = start;
