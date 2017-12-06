import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
// import { yourReducer } from './yourReducer';

const rootReducer = combineReducers({
  // yourReducer,
  form: formReducer,
});

export default rootReducer;
