import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import { vendors } from './serviceVendors';

export default combineReducers({
  vendors,
  form: formReducer,
  router: routerReducer,
});
