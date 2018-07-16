import React, { Component } from 'react';
// import * as api from '../../api';
import AllArticles from './allArticles';
import ArticlesByTopic from './articlesByTopic';
import CommentsAdder from '../comments/comments';
import { Route } from 'react-router-dom';
import fullArticleView from './fullArticleView';
import Users from '../users/users';
import Error404 from './Error404';
import Error500 from './Error500';

class Articles extends Component {
  state = {
    article_id: ''
  };

  render() {
    return (
      <div>
        <Route
          exact
          path="/"
          render={() => <AllArticles articles={this.props.articles} />}
        />
        <Route
          exact
          path="/articlesByTopic"
          render={() => (
            <ArticlesByTopic
              topicArticles={this.props.topicArticles}
              topics={this.props.topics}
            />
          )}
        />
        <Route
          exact
          path="/articles/:article_id/comments"
          component={CommentsAdder}
        />
        <Route
          exact
          path="/articles/:article_id/"
          component={fullArticleView}
        />
        <Route exact path="/articles/404" component={Error404} />
        <Route exact path="/articles/500" component={Error500} />
        <Route exact path="/users/:username" component={Users} />

      </div>
    );
  }
}

export default Articles;
