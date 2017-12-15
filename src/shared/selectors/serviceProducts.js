export const getProductsItems = state => state.products.items;
export const isProductsFetching = state => state.products.isFetching;
export const getProductsSortingStatus = state => state.products.sortBy;
export const isProductsInitialized = state => state.products.isInitialized;

export const getProductsTotalCount = state => state.products.totalCount;
export const getProductsCurrentPage = state => state.products.currentPageIndex;
export const getProductsLastPage = state => state.products.lastPageIndex;
export const getDQIFilterInfo = state =>
  state.products.filters.find(filter => filter.name === 'design');
export const getSQIFilterInfo = state =>
  state.products.filters.find(filter => filter.name === 'sqi');
export const getRatingFilterInfo = state =>
  state.products.filters.find(filter => filter.name === 'rating');
