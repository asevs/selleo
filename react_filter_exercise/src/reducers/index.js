import { combineReducers } from 'redux';
import peopleReducer from './people';
const rootReducer = combineReducers({
  people: peopleReducer,
});

export default rootReducer;
