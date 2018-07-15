import React, { Component } from 'react';
import './App.css';
import * as api from './api';
import Articles from './component/articles/articles';
// import Loading from './component/loadingScreen';

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
      <div class="container">
        <header id="Northcoder News">
          <div>
            <img
              className="logo"
              src="https://northcoders.com/images/logos/learn_to_code_manchester_rw_logo.png"
            />
            <h1 className="App-title">News</h1>
            <br />
          </div>

          <div className="navButtons">
            <Nav />
          </div>
        </header>
        <nav className="nav">
          <br />
          <br />
          <h3 class="nav3" />
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
  // const activeStyle = {
  //   background: 'white',
  //   color: 'black
  // };
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
