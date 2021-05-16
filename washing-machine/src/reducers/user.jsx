import * as t from '../actions/actionTypes';

const defaultState = {
  users: [{ id: 1, firstName: 'John', lastName: 'XDD', roomNumber: 2 }],
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case t.ADD_USER:
      action.user.id = state.users.length + 1;
      return {
        ...state,
        users: [...state.users, action.user],
      };
    case t.REMOVE_USER:
      return {
        ...state,
        users: [...state.users.filter((user) => user.id !== action.userId)],
      };
    default:
      return state;
  }
};
