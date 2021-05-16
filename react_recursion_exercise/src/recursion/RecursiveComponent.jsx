import React, { Component } from 'react';

export default class RecursiveComponent extends Component {
  recursiveMethod = () => {
    return this.props.components.map((Component) => <Component />);
  };
  render() {
    return <div>{this.recursiveMethod()}</div>;
  }
}
