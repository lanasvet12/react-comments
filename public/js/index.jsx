var React = require('react');
var CommentBox = require('./CommentBox');

React.render(
    <CommentBox url='/comments/' />,
    document.getElementById('content')
);