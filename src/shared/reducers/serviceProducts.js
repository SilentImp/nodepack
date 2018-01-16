import * as types from 'types/';

const initialState = {
  items: [],
  currentPageIndex: 0,
  lastPageIndex: 1,
  totalCount: 0,
  isFetching: false,
  isRequestFailed: false,
  isInitialized: false,
  sortBy: '-downloads',
  filters: [
    {
      name: 'design',
      min: 0,
      max: 100,
      value: {
        min: 0,
        max: 100,
      },
      active: false,
    },
    {
      name: 'sqi',
      min: 0,
      max: 100,
      value: {
        min: 0,
        max: 100,
      },
      active: false,
    },
    {
      name: 'rating',
      min: 0,
      max: 100,
      value: {
        min: 0,
        max: 100,
      },
      active: false,
    },
  ],
};

export const filter = (state = {}, action) => {
  switch (action.type) {

    case types.SET_PRODUCTS_FILTER:
      if (state.name !== action.payload.filterName) {
        return {
          ...state,
          active: false,
        };
      }

      return {
        ...state,
        value: {
          ...state.value,
          ...action.payload.value,
        },
        active: true,
      };

    case types.ADD_PRODUCTS_AGGREGATES:
      if (state.name === 'sqi') {
        return state;
      }

      if (state.name === 'design') {
        const minAggregate = action.payload['min_of_properties.dqi'].value;
        const maxAggregate = action.payload['max_of_properties.dqi'].value;

        return {
          ...state,
          min: minAggregate,
          max: maxAggregate,
          value: {
            min: minAggregate > state.value.min ? minAggregate : state.value.min,
            max: maxAggregate < state.value.max ? maxAggregate : state.value.max,
          },
        };
      }

      if (state.name === 'rating') {
        const minAggregate = Math.floor(parseFloat(action.payload['min_of_properties.reviewAverageScore'].value) * 20);
        const maxAggregate = Math.floor(parseFloat(action.payload['max_of_properties.reviewAverageScore'].value) * 20);

        return {
          ...state,
          min: minAggregate,
          max: maxAggregate,
          value: {
            min: minAggregate > state.value.min ? minAggregate : state.value.min,
            max: maxAggregate < state.value.max ? maxAggregate : state.value.max,
          },
        };
      }

      return state;

    default:
      return state;
  }
};

export const product = (state = {}, action) => {
  switch (action.type) {
    case types.GET_USER_DEPARTMENT_SUCCESS:
      if (+state.authorUserId !== +action.payload.user_id) {
        return state;
      }

      return {
        ...state,
        departmentId: action.payload.department_id,
        vendorId: action.payload.author_id,
      };

    case types.GET_PRODUCT_SQI_SUCCESS:
      if (+state.templateId !== +action.payload.templateId) {
        return state;
      }

      return {
        ...state,
        sqi: action.payload.sqi,
      };

    default:
      return state;
  }
};

const products = (state = initialState, action) => {
  switch (action.type) {

    case types.SET_PRODUCTS_FILTER_DEFAULT:
      return {
        ...state,
        filters: state.filters.map((item) => {
          if (item.name !== action.payload.filterName) return item;
          return {
            name: action.payload.filterName,
            min: 0,
            max: 100,
            value: action.payload.value,
            active: true,
          }
        })
      };

    case types.GET_PRODUCTS_REQUEST:
      return {
        ...state,
        isFetching: true,
        ...action.payload,
      };

    case types.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        items: [...state.items, ...action.payload.items],
        currentPageIndex: action.payload.currentPageIndex,
        lastPageIndex: action.payload.lastPageIndex,
        totalCount: action.payload.totalCount,
        isInitialized: true,
      };

    case types.GET_PRODUCTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        isRequestFailed: true,
        isInitialized: true,
      };

    case types.ADD_PRODUCTS_AGGREGATES:
      return {
        ...state,
        filters: state.filters.map(item => filter(item, action)),
      };

    case types.GET_USER_DEPARTMENT_SUCCESS:
      return {
        ...state,
        items: state.items.map(item => product(item, action)),
      };

    case types.GET_PRODUCT_SQI_SUCCESS:
      return {
        ...state,
        items: state.items.map(item => product(item, action)),
      };

    case types.SET_PRODUCTS_FILTER:
      return {
        ...state,
        filters: state.filters.map(item => filter(item, action)),
      };

    default:
      return state;
  }
};

export default products;
