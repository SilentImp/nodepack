import * as types from 'types/';

const entities = {
  vendor: {},
  user: {},
  product: {},
}

export const entitie = (previousState = entities, action) => {
  switch (action.type) {
    case types.GET_VENDORS_SUCCESS:
      console.log('get vendors entities', action, {
        ...previousState,
        vendor: {
          ...previousState.vendor,
          ...action.payload.items.entities.vendor
        }});
      return {
        ...previousState,
        vendor: {
          ...previousState.vendor,
          ...action.payload.items.entities.vendor
        }
      };

    default:
      return previousState;
  }
};

export default entitie;
