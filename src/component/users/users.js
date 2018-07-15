import React from 'react';
import * as api from '../../api';
import { Component } from 'react';
import AllArticles from '../articles/allArticles';
import missing from './missing.jpg';

class Users extends Component {
  state = {
    users: [],
    filtered: []
  };
  async componentDidMount() {
    const users = await api.fetchUsers(this.props.match.params.username);
    const articles = await api.fetchArticles();
    const user = this.props.match.params.username;

    const authorArticles = (articles, user) => {
      return articles.filter(function(a) {
        return a.created_by === user;
      });
    };

    this.setState({
      users: users.data[0],
      filtered: authorArticles(articles, user)
    });
  }

  render() {
    return (
      <div className="userClass">
        <div className="userInfo">
          <img
            className="profileImg"
            src={this.state.users.avatar_url}
            alt={missing}
          />
          <h2>{this.state.users.username}'s</h2>
          <h2>Articles</h2>
          <br />
        </div>
        <div className="authorArticles">
          {' '}
          <AllArticles articles={this.state.filtered} />
        </div>
      </div>
    );
  }
}

export default Users;
