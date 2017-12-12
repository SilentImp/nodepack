import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from 'reducers/';

export const composeEnhancers = () => {
  if (
    process.env.IS_SERVER ||
    process.env.NODE_ENV === 'production' ||
    typeof window === 'undefined'
  ) {
    return compose(applyMiddleware(thunkMiddleware));
  }

  return compose(applyMiddleware(thunkMiddleware));
  // return compose(applyMiddleware(thunkMiddleware), window.devToolsExtension ? window.devToolsExtension() : (f) => f);
};

export const configureStore = () => createStore(rootReducer, composeEnhancers());

export default configureStore();
