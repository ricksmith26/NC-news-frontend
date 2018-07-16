import React from 'react';

const state = {
  username: '5b3b73af9289af05a338beb1'
};

const userContext = React.createContext(state.username); //passing initial value

export default userContext;
