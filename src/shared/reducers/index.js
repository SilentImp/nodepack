import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import products from './serviceProducts';
import uploads from './serviceUploads';

export default combineReducers({
  products,
  uploads,
  form: formReducer,
  router: routerReducer,
});
