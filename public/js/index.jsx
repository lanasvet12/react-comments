var React = require('react');
var CommentBox = require('./CommentBox');

React.render(
    <CommentBox url='/comments/' pollInterval={2000} />,
    document.getElementById('content')
);