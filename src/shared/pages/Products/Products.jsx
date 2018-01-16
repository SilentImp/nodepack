import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import { change } from 'redux-form';
import L1 from '@plasma-platform/plasma-quark/lib/Loaders/L1';
import B3D from '@plasma-platform/plasma-quark/lib/Buttons/types/B3D';
import Icon from '@plasma-platform/plasma-quark/lib/Icon';
import Page from 'components/Page';

import {
  getProducts,
  setProductsFilter,
} from 'actions';

import {
  getProductsItems,
  isProductsFetching,
  getProductsSortingStatus,
  getProductsLastPage,
  getProductsTotalCount,
  getDQIFilterInfo,
  getSQIFilterInfo,
  getRatingFilterInfo,
  getProductsSearhForm,
  getRouterLocationSearchParsed,
} from 'selectors';

import { isEndOfPage } from 'utils';

import ProductsSearch from 'components/ProductsSearch';
import ProductsFilters from 'components/ProductsFilters';
import ProductsSorters from 'components/ProductsSorters';
import ProductsList from 'components/ProductsList';
import ProductsEmpty from 'components/ProductsEmpty';
import DidYouFind from 'components/DidYouFind';

import './monoicon/reload.svg';

import styles from './Products.pcss';

class Products extends Component {
  static contextTypes = {
    t: PropTypes.func,
  };

  static propTypes = {
    getProducts: PropTypes.func.isRequired,
    filterDQI: PropTypes.shape({
      min: PropTypes.number.isRequired,
      max: PropTypes.number.isRequired,
      active: PropTypes.bool.isRequired,
    }).isRequired,
    filterRating: PropTypes.shape({
      min: PropTypes.number.isRequired,
      max: PropTypes.number.isRequired,
      active: PropTypes.bool.isRequired,
    }).isRequired,
    filterSQI: PropTypes.shape({
      min: PropTypes.number.isRequired,
      max: PropTypes.number.isRequired,
      active: PropTypes.bool.isRequired,
    }).isRequired,
    isProductsFetching: PropTypes.bool.isRequired,
    locationSearch: PropTypes.objectOf(PropTypes.string),
    products: PropTypes.arrayOf(PropTypes.object).isRequired,
    productsLastPage: PropTypes.number.isRequired,
    productsSortBy: PropTypes.string,
    productsTotalCount: PropTypes.number.isRequired,
    setProductsFilter: PropTypes.func.isRequired,
    setProductsSearchTags: PropTypes.func.isRequired,
    tags: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })),
  };

  static defaultProps = {
    locationSearch: {},
    productsSortBy: null,
    tags: [],
  };

  state = {
    multiplier: 1,
    activeFilterNotification: null,
    page: 1,
  };

  componentDidMount() {
    const { locationSearch } = this.props;

    if (typeof window.__REDUX_STATE__ === 'undefined') this.props.getProducts({ locale: 'en' }).then(() => {
      const designMin = +locationSearch.designMin || 0;
      const designMax = +locationSearch.designMax || 100;
      const ratingMin = +locationSearch.ratingMin || 0;
      const ratingMax = +locationSearch.ratingMax || 100;

      if (
        designMin > 0
        || designMax < 100
        || ratingMin > 0
        || ratingMax < 100
      ) {
        this.props.getProducts({
          locale: 'en',
          designFilterInitialValue: {
            value: {
              min: designMin,
              max: designMax,
            },
          },
          ratingFilterInitialValue: {
            value: {
              min: ratingMin,
              max: ratingMax,
            },
          },
          isRefresh: true,
        }).then(() => {

          this.props.getProducts({
            locale: 'en',
            designFilterInitialValue: {
              value: {
                min: designMin,
                max: designMax,
              },
            },
            ratingFilterInitialValue: {
              value: {
                min: ratingMin,
                max: ratingMax,
              },
            },
          });

          this.props.setProductsFilter('design', {
            min: designMin,
            max: designMax,
          });

          this.props.setProductsFilter('rating', {
            min: ratingMin,
            max: ratingMax,
          });

        });
      } else {
        this.props.getProducts({ locale: 'en' });
      }
    });

    window.__REDUX_STATE__ = undefined;

    this.defineDpiMultiplier();
    window.addEventListener('scroll', this.handleWindowScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleWindowScroll);
  }

  handleWindowScroll = () => {
    const { page } = this.state;

    if (page < 6) {
      if (isEndOfPage()) {
        this.loadProducts();
      }
    }
  };

  handleFilterHelpIconHover = (notification) => {
    this.setState(() => ({
      activeFilterNotification: notification,
    }));
  };

  hideFilterNotification = () => {
    this.setState(() => ({
      activeFilterNotification: null,
    }));
  };

  handleFilterBlur = ({ value, name }) => {
    this.props.getProducts({
      locale: 'en',
      isRefresh: true,
      [`${name}FilterInitialValue`]: {
        value,
      },
    }).then(() => {
      this.props.setProductsFilter(name, value);
    });
  };

  defineDpiMultiplier = () => {
    if (window.matchMedia('(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)').matches) {
      this.setState(() => ({
        multiplier: 2,
      }));
    } else if (window.matchMedia('(-webkit-min-device-pixel-ratio: 1.3), (min-resolution: 124.8dpi)').matches) {
      this.setState(() => ({
        multiplier: 1.5,
      }));
    }
  };

  loadProducts = () => {
    const { page } = this.state;

    if (page < this.props.productsLastPage && !this.props.isProductsFetching) {
      this.setState(() => ({
        page: page + 1,
      }));
    }

    this.props.getProducts({ locale: 'en' });
  };

  sortProducts = (sortBy) => {
    this.setState(() => ({
      page: 1,
    }));

    this.props.getProducts({
      locale: 'en',
      sortingBy: sortBy,
      isRefresh: true,
    }).then(() => {
      this.props.getProducts({ locale: 'en' });
    });
  };

  handleClickTag = (id) => {
    const newtags = this.props.tags.filter(tag => tag.id !== id);
    this.props.setProductsSearchTags(newtags);

    const searchParams = newtags.map(tag => tag.value).join(' ');
    this.props.getProducts({
      locale: 'en',
      isRefresh: true,
      searchParams,
    });
  };

  render() {
    const { t } = this.context;

    const {
      page,
      multiplier,
    } = this.state;

    const {
      products,
      filterDQI,
      filterSQI,
      filterRating,
      productsLastPage,
      productsSortBy,
      productsTotalCount,
      tags,
    } = this.props;

    return (
      <Page title={t('Products')}>
        <div className={styles.Products}>
          <ProductsSearch getProducts={this.props.getProducts} />

          <ProductsFilters
            dqi={{
              min: filterDQI.min,
              max: filterDQI.max,
              value: filterDQI.value,
            }}
            sqi={{
              min: filterSQI.min,
              max: filterSQI.max,
              value: filterSQI.value,
            }}
            rating={{
              min: filterRating.min,
              max: filterRating.max,
              value: filterRating.value,
            }}
            handleFilterBlur={this.handleFilterBlur}
            activeNotification={this.state.activeFilterNotification}
            showNotification={this.handleFilterHelpIconHover}
            hideNotification={this.hideFilterNotification}
          />

          {(this.props.isProductsFetching || products.length > 0) && (
            <section className={styles.Products__content}>
              <ProductsSorters
                productsSortBy={productsSortBy}
                sortProducts={this.sortProducts}
              />

              {this.props.isProductsFetching && products.length === 0 ? (
                <L1 className={styles.Products__contentLoader} />
              ) : (
                <ProductsList
                  products={products.slice(0, page * 13)}
                  multiplier={multiplier}
                />
              )}

              {this.props.isProductsFetching && products.length > 0 && (
                <L1 className={styles.Products__loader} />
              )}

              {products.length > 0 && page >= 6 && page < productsLastPage && (
                <B3D
                  className={styles.Products__button}
                  onClick={this.loadProducts}
                >
                  <Icon
                    className={styles.Products__buttonIcon}
                    icon="reload"
                  />
                  {t('Show More Templates')}
                </B3D>
              )}
            </section>
          )}

          {!this.props.isProductsFetching &&
            products.length === 0 && (
              <ProductsEmpty
                lastTag={tags[tags.length - 1]}
                handleClickTag={this.handleClickTag}
              />
            )}

          {productsTotalCount >= 1 && productsTotalCount <= 20 && (
            <DidYouFind />
          )}
        </div>
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  store: state,
  products: getProductsItems(state),
  isProductsFetching: isProductsFetching(state),
  productsSortBy: getProductsSortingStatus(state),
  productsLastPage: getProductsLastPage(state),
  productsTotalCount: getProductsTotalCount(state),
  filterDQI: getDQIFilterInfo(state),
  filterSQI: getSQIFilterInfo(state),
  filterRating: getRatingFilterInfo(state),
  tags: getProductsSearhForm(state, 'tags'),
  locationSearch: getRouterLocationSearchParsed(state),
});

const mapDispatchToProps = dispatch => ({
  getProducts: params => dispatch(getProducts(params)),
  setProductsFilter: (filterName, value) => dispatch(setProductsFilter(filterName, value)),
  setProductsSearchTags: value => dispatch(change('productsSearch', 'tags', value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Products));
