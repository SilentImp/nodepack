import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './ProductsSorters.pcss';

class ProductsSorters extends PureComponent {
  static contextTypes = {
    t: PropTypes.func,
  };

  static propTypes = {
    productsSortBy: PropTypes.string,
    sortProducts: PropTypes.func.isRequired,
  };

  static defaultProps = {
    productsSortBy: null,
  };

  render() {
    const { t } = this.context;
    const { productsSortBy, sortProducts } = this.props;
    return (
      <section className={styles.ProductsSorters}>
        <span className={styles.ProductsSorters__description}>{t('show first:')}</span>
        <span
          className={`
            ${styles.ProductsSorters__item}
            ${productsSortBy === '-downloads'
              ? styles['ProductsSorters__item--active']
              : ''}
          `}
          role="button"
          onClick={() => {
            sortProducts('-downloads');
          }}
          onKeyUp={() => {}}
          tabIndex="0"
        >
          {t('Bestsellers')}
        </span>
        <span
          className={`
            ${styles.ProductsSorters__item}
            ${productsSortBy === '-templateId'
              ? styles['ProductsSorters__item--active']
              : ''}
          `}
          role="button"
          onClick={() => {
            sortProducts('-templateId');
          }}
          onKeyUp={() => {}}
          tabIndex="0"
        >
          {t('Newest Products')}
        </span>
        <span
          className={`
            ${styles.ProductsSorters__item}
            ${productsSortBy === 'price'
              ? styles['ProductsSorters__item--active']
              : ''}
          `}
          role="button"
          onClick={() => {
            sortProducts('price');
          }}
          onKeyUp={() => {}}
          tabIndex="0"
        >
          {t('Lowest Price')}
        </span>
        <span
          className={`
            ${styles.ProductsSorters__item}
            ${productsSortBy === '-price'
            ? styles['ProductsSorters__item--active']
            : ''}`}
          role="button"
          onClick={() => {
            sortProducts('-price');
          }}
          onKeyUp={() => {}}
          tabIndex="0"
        >
          {t('Highest Price')}
        </span>
      </section>
    );
  }
}

export default withStyles(styles)(ProductsSorters);
