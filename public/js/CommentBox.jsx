var React = require('react');
var CommentList = require('./CommentList');
var CommentForm = require('./CommentForm');
var io = require('socket.io-client');

var CommentBox = React.createClass({
    handleCommentSubmit: function (comment) {
        this.socket.emit('comment.add', comment);
    },
    getInitialState: function () {
        return {data: []};
    },
    componentDidMount: function () {
        this.socket = io.connect('http://localhost:8888');
        this.socket.on('comments', function (data) {
            this.setState({data: data});
        }.bind(this));
    },
	render: function () {
		return (
			<div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.data} />
                <CommentForm onCommentSubmit={this.handleCommentSubmit} />
			</div>
		);
	}
});

module.exports = CommentBox;