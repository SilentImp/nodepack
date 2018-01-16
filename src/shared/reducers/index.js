import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import { vendors } from './serviceVendors';
import { entitie } from './entities';

export default combineReducers({
  entitie,
  vendors,
  form: formReducer,
  router: routerReducer,
});
