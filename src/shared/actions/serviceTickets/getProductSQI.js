import fetch from 'isomorphic-fetch';
import Config from 'Config';
import * as types from 'types/';

const getProductSQIRequest = () => ({
  type: types.GET_PRODUCT_SQI_REQUEST,
});

const getProductSQISuccess = (data, templateId) => ({
  type: types.GET_PRODUCT_SQI_SUCCESS,
  payload: { ...data, templateId },
});

const getProductSQIFailure = () => ({
  type: types.GET_PRODUCT_SQI_FAILURE,
});

export const getProductSQI = (departmentId, templateId) => async (dispatch) => {
  dispatch(getProductSQIRequest());

  try {
    const response = await fetch(`${Config.ticketsServiceURL}ticket-departments/${departmentId}/templates/${templateId}/sqi`);

    if (response.status >= 200 && response.status < 300) {
      const json = await response.json();
      dispatch(getProductSQISuccess(json, templateId));

      return json;
    }

    throw new Error(`${response.status}: ${response.statusText}`);
  } catch (error) {
    dispatch(getProductSQIFailure());

    return error;
  }
};

export default getProductSQI;
