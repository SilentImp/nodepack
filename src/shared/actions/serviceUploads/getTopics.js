import fetch from 'isomorphic-fetch';
import Config from 'Config';
import * as types from 'types/';

const getTopicsRequest = () => ({
  type: types.GET_TOPICS_REQUEST,
});

const getTopicsSuccess = payload => ({
  type: types.GET_TOPICS_SUCCESS,
  payload,
});

const getTopicsFailure = () => ({
  type: types.GET_TOPICS_FAILURE,
});

export const getTopics = () => async (dispatch) => {
  dispatch(getTopicsRequest());

  try {
    const response = await fetch(`${Config.uploadsServiceURL}topics?sort=depth,left`);

    if (response.ok) {
      const json = await response.json();
      dispatch(getTopicsSuccess(json));

      return json;
    }

    throw new Error(`${response.status}: ${response.statusText}`);
  } catch (error) {
    dispatch(getTopicsFailure());

    return error;
  }
};

export default getTopics;
