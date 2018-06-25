import React, { Component } from 'react';
import './App.css';
import SignInPage from './pages/signIn/signIn';
import ChatPage from './pages/chat/chat';
import socketIOClient from 'socket.io-client'
import env from './env.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      page: 'signIn', 
      api: env.api,
      username: null,
      errorMessage: null
    };
    this.state = {...this.initialState};
  }

  initSocket() {
    this.socket = socketIOClient(this.state.api);
    window.onbeforeunload = () => {
      this.socket.close();
    }
    this.socket.on('login_successful', username => {
      this.setState({
          ...this.initialState,
          username: username,
          page: 'chat',
      });
    })
    this.socket.on('connect_error', error => {
      this.setState({
        ...this.initialState,
        errorMessage: 'Server unavailable.'
      });
    });

    this.socket.on('connect_timeout', () => {
      this.setState({
        ...this.initialState,
        errorMessage: 'Timeout'
      });
    });

    this.socket.on('error', () => {
      this.setState({
        ...this.initialState,
        errorMessage: 'Oops something went wrong.'
      });
    });
    
    this.socket.on('custom_error', message => {
      this.setState({
        ...this.initialState,
        errorMessage: message
      });
    });

    this.socket.on('disconnect', reason => {
      switch (reason) {
        case 'io client disconnect':
          this.setState(this.initialState);
          break;
        case 'transport close':
          this.setState({
            ...this.initialState,
            errorMessage: 'Connection lost.'
          });
          break;
        case 'io server disconnect':
          break;
        default:
          console.error('Unknown disconnect reason: ' + reason);
          this.setState({
            ...this.initialState,
            errorMessage: 'Oops something went wrong.'
          });
      }
    });
  }
  
  onSignIn(e) {
      e.preventDefault();
      this.setState(this.initialState);
      const data = new FormData(e.target);
      const username = data.get('username');
      this.initSocket();
      this.socket.emit('newUser', username);
  }

  onDisconnectPressed() {
    this.socket.close();
    this.setState(this.initialState);
  }

  render() {
    let page;

    switch (this.state.page) {
      case 'signIn': 
        page = (
          <SignInPage 
            socket={this.socket}
            onSignIn={this.onSignIn.bind(this)}
            errorMessage={this.state.errorMessage}
            />
        );
        break;
      case 'chat':
        page = (
          <ChatPage
            username={this.state.username}
            socket={this.socket}
            onDisconnectPressed={this.onDisconnectPressed.bind(this)}
            />
        );
        break;
      default:
        alert(`Page state "${this.state.page}" not found`);
    }

    return (
      <div className="App">
          {page}
      </div>
    );
  }
}

export default App;
