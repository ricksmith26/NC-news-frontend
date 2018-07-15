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
      <div className="comments">
        <div className="articleAboveComments">
          <h2>{this.state.article.data.title}</h2>
          <p>{this.state.article.data.body}</p>
        </div>
        {this.state.comments
          .sort(function(a, b) {
            return (
              moment(a.created_at).format('X') -
              moment(b.created_at).format('X')
            );
          })
          .map(function(comment) {
            return (
              <div className="comment">
                <p>
                  {comment.body}
                  <br />
                  <br />
                  votes:{comment.votes}
                  {'  '}
                  <button
                    className="voteUp"
                    onClick={() => api.voteComment(comment._id, { vote: 'up' })}
                  >
                    Vote up
                  </button>
                  <button
                    className="voteDown"
                    onClick={() =>
                      api.voteComment(comment._id, { vote: 'down' })
                    }
                  >
                    Vote down
                  </button>
                  <br />
                  <br />
                  {moment(comment.created_at).fromNow('LLL')}
                  <br />
                  <br />
                  {deleteC(
                    '5b3b73af9289af05a338beb1',
                    comment.created_by,
                    comment._id
                  )}
                </p>
              </div>
            );
          })}

        <MessageInput
          id="messageInput"
          article_id={this.state.article.data._id}
        />
        <br />
        <br />
      </div>
    );
  }
}

export default CommentsAdder;
