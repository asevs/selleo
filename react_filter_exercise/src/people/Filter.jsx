import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as types from '../types/people';

class Filter extends Component {
  static propTypes = {
    modifyFilterQuery: PropTypes.function,
  };

  render() {
    const { modifyFilterQuery } = this.props;
    return (
      <div className="App-box">
        <input
          type="text"
          onChange={(event) => modifyFilterQuery(event.target.value)}
        ></input>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      modifyFilterQuery: (payload) =>
        dispatch({ type: types.MODIFY_FILTER_QUERY, payload: payload }),
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(Filter);
