var fs = require('fs');

var CommentService = function () {
    this.comments = [];
    fs.readFile('./comments.json', function (error, data) {
        this.comments = JSON.parse(data.toString());
    }.bind(this));

    this.addComment = function (comment) {
        this.comments.push(comment);
        var commentsData = JSON.stringify(this.comments, null, 4);
        fs.writeFile('./comments.json', commentsData, function () {});
    };

    this.getComments = function () {
        return this.comments;
    };
};


module.exports = new CommentService();