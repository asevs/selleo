import { combineReducers } from 'redux';
import machine from './machine';
import users from './user';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  machine,
  form: formReducer,
  users,
});
