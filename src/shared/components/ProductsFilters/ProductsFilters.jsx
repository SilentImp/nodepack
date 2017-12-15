import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import ProductsFilter from './ProductFilter';

import styles from './ProductsFilters.pcss';

import './monoicon/design-rating.svg';
import './monoicon/support-rating.svg';
import './monoicon/user-rating.svg';
import './monoicon/help.svg';

const FILTERS = [
  {
    title: 'Design',
    name: 'design',
    description: 'Evaluation of product design from our specialists.',
    icon: 'design-rating',
    id: 'dqi',
  },
  {
    title: 'Support',
    name: 'support',
    description: 'The average support quality for all tickets of the product.',
    icon: 'support-rating',
    id: 'sqi',
  },
  {
    title: 'Rating',
    name: 'rating',
    description: 'Based on customers reviews for the product.',
    icon: 'user-rating',
    id: 'rating',
  },
];

class ProductsFilters extends PureComponent {
  static contextTypes = {
    t: PropTypes.func,
  };

  static propTypes = {
    dqi: PropTypes.shape({
      min: PropTypes.number.isRequired,
      max: PropTypes.number.isRequired,
      value: PropTypes.shape({
        min: PropTypes.number.isRequired,
        max: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired,
    handleFilterBlur: PropTypes.func.isRequired,
    rating: PropTypes.shape({
      min: PropTypes.number.isRequired,
      max: PropTypes.number.isRequired,
      value: PropTypes.shape({
        min: PropTypes.number.isRequired,
        max: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired,
    sqi: PropTypes.shape({
      min: PropTypes.number.isRequired,
      max: PropTypes.number.isRequired,
      value: PropTypes.shape({
        min: PropTypes.number.isRequired,
        max: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired,
  };

  state = {
    fixedPosition: false,
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleWindowScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleWindowScroll);
  }

  setFiltersBarPosition = () => {
    const startFixYPos = 140;

    this.setState(() => ({
      fixedPosition: window.pageYOffset > startFixYPos,
    }));
  };

  handleWindowScroll = () => {
    this.setFiltersBarPosition();
  }

  render() {
    const {
      handleFilterBlur,
    } = this.props;

    const { fixedPosition } = this.state;

    return (
      <div className={`
        ${styles.ProductsFilters}
        ${fixedPosition ? styles['ProductsFilters--fixed'] : ''}
      `}>
        <div className={styles.ProductsFilters__list}>
          {FILTERS.map(({ id, ...filterInfo }) => (
            <ProductsFilter
              {...filterInfo}
              defaultValue={{ ...this.props[id].value }}
              min={this.props[id].min}
              max={this.props[id].max}
              onBlur={handleFilterBlur}
              disabled={id === 'sqi'}
              key={id}
            />
          ))}
        </div>
      </div>
    );
  }
}


export default withStyles(styles)(ProductsFilters);
