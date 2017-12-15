import { push } from 'react-router-redux';
import { parse, stringify } from 'qs';
import * as types from 'types/';

import { getRouterLocation } from 'selectors';

export const addProductsFilter = (filterName, value) => ({
  type: types.SET_PRODUCTS_FILTER,
  payload: {
    filterName,
    value,
  },
});

export const setProductsFilter = (filterName, value) => (dispatch, getState) => {
  const currentState = getState();
  const location = getRouterLocation(currentState);

  const valueForURL = {
    [`${filterName}Min`]: value.min,
    [`${filterName}Max`]: value.max,
  };

  const newSearch = {
    ...parse(location.search.substring(1)),
    ...valueForURL,
  };

  dispatch(push({
    ...location,
    search: `?${stringify(newSearch)}`,
  }));

  return dispatch(addProductsFilter(filterName, value));
};

export default setProductsFilter;
