import * as types from 'types/';
import { normalize, schema } from 'normalizr';

const vendorSchema = new schema.Entity('vendor');
const vendorsListSchema = new schema.Array(vendorSchema);

const meta = {
  currentPageIndex: 0,
  lastPageIndex: 1,
  totalCount: 0,
  isFetching: false,
  isRequestFailed: 0,
  isInitialized: false,
  nickname: '',
  sortBy: 'rating',
  sortAsc: true,
  perPage: 10,
  items: [],
}

export const vendors = (previousState = meta, action) => {
  switch (action.type) {

    case types.GET_VENDORS_REQUEST:
      return {
        ...previousState,
        isFetching: true,
      };

    case types.GET_VENDORS_FAILURE:
      return {
        ...previousState,
        isFetching: false,
        isRequestFailed: previousState.isRequestFailed + 1
      };

    case types.GET_VENDORS_SUCCESS:
      console.log(normalize(action.payload.items, vendorsListSchema));
      return {
        ...previousState,
        isFetching: false,
        isRequestFailed: 0,
        isInitialized: true,
        currentPageIndex: action.payload.currentPageIndex,
        lastPageIndex: action.payload.pageCount,
        totalCount: action.payload.totalCount,
        items: normalize(action.payload.items, vendorsListSchema)
      };

    default:
      return previousState;
  }
};

export default vendors;
