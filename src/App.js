import React, { Component } from 'react';
import './App.css';
import * as api from './api';
import Articles from './component/articles/articles';

import { NavLink } from 'react-router-dom';

class App extends Component {
  state = {
    articles: [],
    users: [],
    topics: []
  };
  async componentDidMount() {
    const articles = await api.fetchArticles();

    const topics = await api.fetchTopics();

    this.setState({ articles, topics });
  }

  render() {
    return (
      <div className="container">
        <header id="Northcoder News" label="Northcoder News">
          <div>
            <NavLink exact to="/">
              <img
                id="logo"
                className="logo"
                src="https://northcoders.com/images/logos/learn_to_code_manchester_rw_logo.png"
              />
            </NavLink>
            <h1 className="App-title">News</h1>
          </div>

          <div className="navButtons">
            <Nav />
          </div>
        </header>
        <nav className="nav">
          <h3 className="nav3" />
        </nav>
        <main>
          <Articles articles={this.state.articles} topics={this.state.topics} />
        </main>
        <aside>here</aside>
        <footer />
      </div>
    );
  }
}

function Nav() {
  const activeStyle = {
    background: 'white'
   
  };
  return (
    <div>
      <NavLink exact to="/">
        Home
      </NavLink>
      {` | `}
      <NavLink exact to="/articlesByTopic">
        Search by topic
      </NavLink>
    </div>
  );
}
export default App;
