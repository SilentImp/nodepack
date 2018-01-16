import * as types from 'types/';

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
      return {
        ...previousState,
        isFetching: false,
        isRequestFailed: 0,
        isInitialized: true,
        currentPageIndex: action.payload.currentPageIndex,
        lastPageIndex: action.payload.pageCount,
        totalCount: action.payload.totalCount,
        items: previousState.items.concat(action.payload.items.result)
      };

    default:
      return previousState;
  }
};

export default vendors;
