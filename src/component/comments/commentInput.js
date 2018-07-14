import React from 'react';
import * as api from '../../api';

class MessageInput extends React.Component {
  state = {
    userInput: ''
  };

  render() {
    return (
      <div className="messageInputContainer">
        <input
          type="text"
          onKeyUp={this.handleKeyPress}
          onChange={this.handleInputChange}
          value={this.state.userInput}
        />
      </div>
    );
  }
  handleKeyPress = event => {
    if (event.keyCode === 13) {
      console.log('keyPress');
      this.handlePostMessage(this.props.article_id, {
        body: this.state.userInput,
        created_by: 'jessjelly'
      });
    }
  };

  handleInputChange = event => {
    this.setState({
      userInput: event.target.value
    });
  };

  handlePostMessage = async () => {
    console.log(this.props.article_id, '<<<<<<<<<<');
    const comment = {
      body: this.state.userInput,
      created_by: 'jessjelly'
    };

    await api.postComment(this.props.article_id, comment);
    this.setState({ userInput: '' });
  };
}

export default MessageInput;
