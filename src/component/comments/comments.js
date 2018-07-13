import React, { Component } from 'react';
import * as api from '../../api';
import moment from 'moment';
import MessageInput from './commentInput';
import deleteC from './delete';

class CommentsAdder extends Component {
  state = {
    comments: [],
    article: []
  };
  async componentDidMount() {
    const comments = await api.getCommentsForArticle(
      this.props.match.params.article_id
    );
    const article = await api.getArticleById(
      this.props.match.params.article_id
    );

    this.setState({ comments, article });
  }
  async componentDidUpdate(_, prevState) {
    if (prevState.comments !== this.state.comments) {
      const comments = await api.getCommentsForArticle(
        this.props.match.params.article_id
      );

      this.setState({ comments });
    }
  }

  render() {
    if (!this.state.comments.length) return <h1>Loading...</h1>;
    return (
      <div>
        <h2>{this.state.article.data.title}</h2>
        <h3>{this.state.article.data.body}</h3>
        <ul>
          {this.state.comments.map(function(comment) {
            return (
              <li>
                {comment.body}
                <br />
                <br />
                votes:{comment.votes}
                {'  '}
                <button
                  onClick={() => api.voteComment(comment._id, { vote: 'up' })}
                >
                  Vote up
                </button>
                <button
                  onClick={() => api.voteComment(comment._id, { vote: 'down' })}
                >
                  Vote down
                </button>
                <br />
                <br />
                {moment(comment.created_at).fromNow()}
                <br />
                <br />
                {deleteC(
                  '5b3b73af9289af05a338beb1',
                  comment.created_by,
                  comment._id
                )}
              </li>
            );
          })}
        </ul>
        <MessageInput id="messageInput" />
        <br />
        <br />
      </div>
    );
  }
}

export default CommentsAdder;
