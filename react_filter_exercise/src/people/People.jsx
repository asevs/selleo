import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class People extends Component {
  static propTypes = {
    person: PropTypes.object,
    people: PropTypes.array.object,
    name: PropTypes.string,
  };

  render() {
    function searchingFor(searchPerson) {
      return function (person) {
        return (
          person.name.toLowerCase().includes(searchPerson.toLowerCase()) ||
          !searchPerson
        );
      };
    }
    const { people } = this.props;
    return (
      <div>
        {people.people
          .filter(searchingFor(people.filterQuery))
          .map((person) => (
            <div class="App-box">{person.name}</div>
          ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { people: state.people };
};

export default connect(mapStateToProps)(People);
