import React, { Component } from 'react';
import logo from './logo.svg';
import Recursion from './recursion/Recursion';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <div className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h2>React Exercise - Recursion</h2>
          <p className='App-header__intro'>
            Visit&nbsp;
            <a href='https://github.com/blisher/react_recursion_exercise'>this repository</a>
            &nbsp;for instructions.
          </p>
        </div>
        <div>
          <Recursion />
        </div>
      </div>
    );
  }
}

export default App;
