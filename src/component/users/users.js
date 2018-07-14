import React from 'react';
import * as api from '../../api';
import { Component } from 'react';

class Users extends Component {
  state = {
    users: []
  };
  async componentDidMount() {
    const users = await api.fetchUsers(this.props.match.params.username);
    console.log(users.data[0], '????');
    this.setState({ users: users.data[0] });
  }

  render() {
    console.log(this.state.users, '<<<<<<');
    return (
      <div className="userClass">
        <img src={this.state.users.avatar_url} />
        <h1>{this.state.users.username}</h1>
        <h2>{this.state.users._id}</h2>
        <br />
        <br />
      </div>
    );
  }
}

export default Users;
