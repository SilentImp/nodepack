import fetch from 'isomorphic-fetch';
import Config from 'Config';
import * as types from 'types/';

import { convertLocaleToDBFormat } from 'utils/';
import { getUserDepartment, getProductSQI, addProductsFilter } from 'actions';
import {
  getProductsItems,
  isProductsFetching,
  isProductsInitialized,
  getProductsSortingStatus,
  getProductsTotalCount,
  getProductsCurrentPage,
  getProductsLastPage,
  getDQIFilterInfo,
  getRatingFilterInfo,
} from 'selectors';

const addAggregates = aggregates => ({
  type: types.ADD_PRODUCTS_AGGREGATES,
  payload: aggregates,
});

const getProductsRequest = params => ({
  type: types.GET_PRODUCTS_REQUEST,
  payload: { ...params },
});

const getProductsSuccess = data => ({
  type: types.GET_PRODUCTS_SUCCESS,
  payload: data,
});

const getProductsFailure = () => ({
  type: types.GET_PRODUCTS_FAILURE,
});

const loadProductSQI = async (dispatch, authorUserId, templateId) => {
  const response = await dispatch(getUserDepartment(authorUserId));

  if (response.department_id) {
    dispatch(getProductSQI(response.department_id, templateId));
  }
};

export const getProducts = ({
  locale = 'en',
  sortingBy,
  perPage = 13,
  isRefresh = false,
  searchParams,
  designFilterInitialValue = null,
  ratingFilterInitialValue = null,
}) => async (dispatch, getState) => {

  console.log('dispatch: ', dispatch);
  console.log('getState: ', getState(), getState().form);

  const localeInDBFormat = convertLocaleToDBFormat(locale);
  const currentState = getState();
  const currentStateSearchForm = getState().form.productsSearch;

  const productsSortingStatus = getProductsSortingStatus(currentState);
  const dqiFilter = designFilterInitialValue || getDQIFilterInfo(currentState);
  const ratingFilter = ratingFilterInitialValue || getRatingFilterInfo(currentState);
  const productsItems = getProductsItems(currentState);
  const isFetching = isProductsFetching(currentState);
  const isInitialized = isProductsInitialized(currentState);
  const currentPageIndex = getProductsCurrentPage(currentState);
  const lastPageIndex = getProductsLastPage(currentState);
  const totalCount = getProductsTotalCount(currentState);

  const sortBy = sortingBy || productsSortingStatus;
  let currentSearchText;
  if (typeof currentStateSearchForm !== 'undefined') {
    currentSearchText =
      currentStateSearchForm.values && currentStateSearchForm.values.tags.length > 0
        ? `&text=${currentStateSearchForm.values.tags.map(tag => tag.value).join(' ')}`
        : '';
  } else {
    currentSearchText = '';
  }
  const searchText = searchParams ? `&text=${searchParams}` : currentSearchText;

  const requestPageIndex = productsSortingStatus === sortBy && !isRefresh
    ? currentPageIndex + 1
    : 1;

  if (
    !(
      (productsItems.length < totalCount || !isInitialized) &&
      !isFetching &&
      requestPageIndex <= lastPageIndex
    ) &&
    !isRefresh
  ) {
    return;
  }

  const aggregations =
    'aggregations[][min]=properties.dqi&aggregations[][max]=properties.dqi&aggregations[][min]=properties.reviewAverageScore&aggregations[][max]=properties.reviewAverageScore';

  const rangesDQI = `range[properties.dqi][gte]=${dqiFilter.value.min}&range[properties.dqi][lte]=${
    dqiFilter.value.max
  }`;
  const rangesRating = `range[properties.reviewAverageScore][gte]=${Math.floor(ratingFilter.value.min / 20)}&range[properties.reviewAverageScore][lte]=${Math.floor(ratingFilter.value.max / 20)}`;

  const fetchUrl = `${Config.productsServiceURL}products/${localeInDBFormat}/search?page=${
    requestPageIndex
  }&per-page=${perPage}&sort=${sortBy}&${rangesDQI}&${rangesRating}&${aggregations}${
    searchText
  }&expand=properties&state=1`;

  const paginationData = {};

  if (isRefresh) {
    dispatch(getProductsRequest({ sortBy, items: [] }));
  } else {
    dispatch(getProductsRequest());
  }

  try {
    const response = await fetch(fetchUrl);

    if (response.ok) {
      const json = await response.json();
      const {
        products,
        aggregates,
      } = json;

      if (ratingFilterInitialValue && !isInitialized) {
        dispatch(addProductsFilter('rating', ratingFilterInitialValue.value));
      }

      if (designFilterInitialValue && !isInitialized) {
        dispatch(addProductsFilter('design', designFilterInitialValue.value));
      }

      if (aggregates && !isInitialized) {
        dispatch(addAggregates(aggregates));
      }

      paginationData.currentPageIndex = parseInt(
        response.headers.get('X-Pagination-Current-Page') || requestPageIndex,
        10,
      );
      paginationData.lastPageIndex = parseInt(
        response.headers.get('X-Pagination-Page-Count') || lastPageIndex,
        10,
      );
      paginationData.totalCount = parseInt(
        response.headers.get('X-Pagination-Total-Count') || totalCount,
        10,
      );

      dispatch(getProductsSuccess({
        items: products,
        ...paginationData,
      }));

      products.forEach((product) => {
        if (product.authorUserId) {
          loadProductSQI(dispatch, product.authorUserId, product.templateId);
        }
      });

      return;
    }

    throw new Error(`${response.status}: ${response.statusText}`);
  } catch (error) {
    dispatch(getProductsFailure());
  }
};

export default getProducts;
