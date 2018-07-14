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
      <div className="App">
        {/* <Loading /> */}
        <Nav />
        <header className="App-header">
          <img src="https://northcoders.com/images/logos/learn_to_code_manchester_rw_original.png" />
          <h1 className="App-title">Northcoder News</h1>
        </header>
        <p className="App-intro">Bringing the lasted news to Northcoders</p>

        <Articles articles={this.state.articles} topics={this.state.topics} />
      </div>
    );
  }
}

function Nav() {
  const activeStyle = {
    background: 'red'
  };
  return (
    <div>
      <NavLink exact to="/" activeStyle={activeStyle}>
        Home
      </NavLink>
      {` | `}
      <NavLink exact to="/articlesByTopic" activeStyle={activeStyle}>
        Search by topic
      </NavLink>
    </div>
  );
}
export default App;
