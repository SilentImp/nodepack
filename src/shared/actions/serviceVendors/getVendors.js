import fetch from 'isomorphic-fetch';
import Config from 'Config';
import * as types from 'types/';
import VendorsService from '@plasma-platform/tm-service-vendors';
import { normalize, schema } from 'normalizr';

const vendorSchema = new schema.Entity('vendor');
const vendorsListSchema = new schema.Array(vendorSchema);

const getVendorsRequest = () => ({
  type: types.GET_VENDORS_REQUEST,
});

const getVendorsSuccess = (data) => ({
  type: types.GET_VENDORS_SUCCESS,
  payload: { ...data },
});

const getVendorsFailure = () => ({
  type: types.GET_VENDORS_FAILURE,
});

export const getVendors = () => async (dispatch, getState) => {
  console.log('request');
  const previousState = getState().vendors;
  const {
    sortBy,
    sortAsc,
    lastPageIndex,
    currentPageIndex,
    perPage,
    nickname,
    queryTime,
  } = previousState;
  const nextPage = Math.min((currentPageIndex || 0) + 1, lastPageIndex);
  await dispatch(getVendorsRequest());

  try {
    const vendors = new VendorsService(Config.vendorsServiceURL);
    console.log('request start');
    const response = await vendors.get(sortBy, sortAsc, nextPage, perPage, nickname);
    console.log('request end', response);
    dispatch(getVendorsSuccess({
      ...response,
      items: normalize(response.items, vendorsListSchema),
    }));

    const response2 = await vendors.get(sortBy, sortAsc, nextPage+1, perPage, nickname);
    console.log('request end', response2);
    dispatch(getVendorsSuccess({
      ...response2,
      items: normalize(response2.items, vendorsListSchema),
    }));

    const response3 = await vendors.get(sortBy, sortAsc, nextPage+2, perPage, nickname);
    console.log('request end', response2);
    dispatch(getVendorsSuccess({
      ...response3,
      items: normalize(response3.items, vendorsListSchema),
    }));

  } catch (error) {
    console.log('error: ', error);
    dispatch(getVendorsFailure());
    return error;
  }
};
