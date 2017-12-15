import * as types from 'types/';

const initialState = {
  topics: {
    items: [],
    isFetching: false,
    isInitialized: false,
    isRequestFailed: false,
  },
  platformTypes: {
    items: [],
    isFetching: false,
    isInitialized: false,
    isRequestFailed: false,
  },
};

const uploads = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_TOPICS_REQUEST:
      return {
        ...state,
        topics: {
          ...state.topics,
          isFetching: true,
        },
      };

    case types.GET_TOPICS_SUCCESS:
      return {
        ...state,
        topics: {
          ...state.topics,
          isFetching: false,
          isInitialized: true,
          items: action.payload,
        },
      };

    case types.GET_TOPICS_FAILURE:
      return {
        ...state,
        topics: {
          ...state.topics,
          isFetching: false,
          isInitialized: true,
          isRequestFailed: true,
        },
      };

    case types.GET_PLATFORM_TYPES_REQUEST:
      return {
        ...state,
        platformTypes: {
          ...state.platformTypes,
          isFetching: true,
        },
      };

    case types.GET_PLATFORM_TYPES_SUCCESS:
      return {
        ...state,
        platformTypes: {
          ...state.platformTypes,
          isFetching: false,
          isInitialized: true,
          items: action.payload,
        },
      };

    case types.GET_PLATFORM_TYPES_FAILURE:
      return {
        ...state,
        platformTypes: {
          ...state.platformTypes,
          isFetching: false,
          isInitialized: true,
          isRequestFailed: true,
        },
      };

    default:
      return state;
  }
};

export default uploads;
