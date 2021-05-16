import React, { Component } from 'react';
import RecursiveComponent from './RecursiveComponent';

const One = class One extends Component {
  render() {
    return <div>One</div>;
  }
};
const Two = class Two extends Component {
  render() {
    return <div>Two</div>;
  }
};
const Three = class Three extends Component {
  render() {
    return <div>Three</div>;
  }
};

// assign components below
const components = [One, Two, Three];

export default class Recursion extends Component {
  render() {
    return (
      <div className="App-wrapper">
        <RecursiveComponent components={components} />
      </div>
    );
  }
}
