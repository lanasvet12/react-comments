var express = require('express');
var app = express();
var http = require('http').createServer(app);
var fs = require('fs');
var io = require('socket.io')(http);
var commentService = require('./CommentService');

app.use(express.static('./public'));

app.get('/', function (request, response) {
    response.sendFile('./public/index.html', {
        root: __dirname
    });
});

io.on('connection', function (socket) {
    socket.emit('comments', commentService.getComments());
    socket.on('comment.add', function (comment) {
        commentService.addComment(comment);
        io.sockets.emit('comments', commentService.getComments());
    });
});

function start (){
    http.listen(8888);
}

exports.start = start;
