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
      try {
      const topicArticles = await api.fetchArticleByTopic(
        this.state.topic_name
      );

      this.setState({ topicArticles: topicArticles });
      } catch(err){
        if (err.response.status === 404 || err.response.status === 400) this.props.history.push("404");
        else this.props.history.push("500");
      }
    
    }
  }
  render() {
    
    if (this.state.topicArticles.length === 0) {
      return (
        <div>
          <h1 className="search">Search by Topic</h1>
          <select id="topicList" onChange={this.handleTopicChange}>
            {Object.values(this.props.topics).map(topic => {
              return <option value={topic.slug}>{topic.title}</option>;
            })}
          </select>
        </div>
      );
    }
    return <div className="articlesDiv">
        <select id="topicList" onChange={this.handleTopicChange}>
          {Object.values(this.props.topics).map(topic => {
            return <option value={topic.slug}>{topic.title}</option>;
          })}
        </select>
      
      <AllArticles articles={[...this.state.topicArticles]} user='5b3b73af9289af05a338beb1'/>
      </div>
  }
  handleTopicChange = event => {
    this.setState({ topic_name: event.target.value });
  };
}

export default ArticlesByTopic;
