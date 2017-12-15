import fetch from 'isomorphic-fetch';
import Config from 'Config';
import * as types from 'types/';

const getUserDepartmentRequest = () => ({
  type: types.GET_USER_DEPARTMENT_REQUEST,
});

const getUserDepartmentSuccess = data => ({
  type: types.GET_USER_DEPARTMENT_SUCCESS,
  payload: data,
});

const getUserDepartmentFailure = () => ({
  type: types.GET_USER_DEPARTMENT_FAILURE,
});

export const getUserDepartment = userId => async (dispatch) => {
  dispatch(getUserDepartmentRequest());

  try {
    const response = await fetch(`${Config.ticketsServiceURL}ticket-departments/user/${userId}`);

    if (response.status >= 200 && response.status < 300) {
      const json = await response.json();
      dispatch(getUserDepartmentSuccess(json));

      return json;
    }

    throw new Error(`${response.status}: ${response.statusText}`);
  } catch (error) {
    dispatch(getUserDepartmentFailure());

    return error;
  }
};

export default getUserDepartment;
