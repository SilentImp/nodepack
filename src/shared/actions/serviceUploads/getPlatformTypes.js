import fetch from 'isomorphic-fetch';
import Config from 'Config';
import * as types from 'types/';

const getPlatformTypesRequest = () => ({
  type: types.GET_PLATFORM_TYPES_REQUEST,
});

const getPlatformTypesSuccess = payload => ({
  type: types.GET_PLATFORM_TYPES_SUCCESS,
  payload,
});

const getPlatformTypesFailure = () => ({
  type: types.GET_PLATFORM_TYPES_FAILURE,
});

export const getPlatformTypes = () => async (dispatch) => {
  dispatch(getPlatformTypesRequest());

  try {
    const response = await fetch(`${Config.uploadsServiceURL}types`);

    if (response.ok) {
      const json = await response.json();
      dispatch(getPlatformTypesSuccess(json));

      return json;
    }

    throw new Error(`${response.status}: ${response.statusText}`);
  } catch (error) {
    dispatch(getPlatformTypesFailure());

    return error;
  }
};

export default getPlatformTypes;
