import React, { Component } from 'react';
import * as api from '../../api';

import { Link } from 'react-router-dom';

class fullArticleView extends Component {
  state = {
    comments: [],
    article: [],
    voteUp: false
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
    if (prevState.article.data !== this.state.article.data) {
      const article = await api.getArticleById(
        this.props.match.params.article_id
      );

      this.setState({ article: article });
    }
  }

  render() {
    // console.log(this.state.voteUp, '<<<<<<<<<');
    if (!this.state.comments.length) return <h1>Loading...</h1>;
    return (
      <div className="full">
        <div className="articleFull">
          <h1 className="ArtTitle">{this.state.article.data.title}</h1>
          <br />
          <p>{this.state.article.data.body}</p>
        </div>
        <br />
        {this.state.article.data.created_by}
        <br />
        <Link to={`/articles/${this.state.article.data._id}/comments`}>
          {' '}
          <p className="commentLink">
            {' '}
            commments: {this.state.article.data.comments}
          </p>
        </Link>
        <p> votes: {this.state.article.data.votes}</p>
        <button
          className="voteUp"
          onClick={() =>
            api.voteArticle(this.state.article.data._id, { vote: 'up' })
          }
        >
          Vote up
        </button>
        <button
          className="voteDown"
          onClick={() =>
            api.voteArticle(this.state.article.data._id, { vote: 'down' })
          }
        >
          Vote down
        </button>{' '}
      </div>
    );
  }
}

export default fullArticleView;
