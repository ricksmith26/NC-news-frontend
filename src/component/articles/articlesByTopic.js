import React from 'react';
import * as api from '../../api';
import { Component } from 'react';
import AllArticles from './allArticles';

class ArticlesByTopic extends Component {
  state = {
    topicArticles: [],
    topic_name: ''
  };

  async componentDidUpdate(_, prevState) {
    if (prevState.topic_name !== this.state.topic_name) {
      const topicArticles = await api.fetchArticleByTopic(
        this.state.topic_name
      );

      this.setState({ topicArticles: topicArticles.data.articles });
    }
  }
  render() {
    if (this.state.topicArticles.length === 0) {
      return (
        <div>
          <select id="topicList" onChange={this.handleTopicChange}>
            {Object.values(this.props.topics).map(topic => {
              return <option value={topic.slug}>{topic.title}</option>;
            })}
          </select>;
        </div>
      );
    }
    return (
      <div className="articlesDiv">
        <h1>Search by Topic</h1>
        <select id="topicList" onChange={this.handleTopicChange}>
          {Object.values(this.props.topics).map(topic => {
            return <option value={topic.slug}>{topic.title}</option>;
          })}
        </select>;
        <AllArticles articles={this.state.topicArticles} />
      </div>
    );
  }
  handleTopicChange = event => {
    this.setState({ topic_name: event.target.value });
  };
}

export default ArticlesByTopic;
