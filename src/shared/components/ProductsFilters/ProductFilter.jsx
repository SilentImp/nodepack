import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import N1C from '@plasma-platform/plasma-quark/lib/Notifications/N1C';
import Icon from '@plasma-platform/plasma-quark/lib/Icon';

import Filter from '../QuarkFilter';

import './monoicon/design-rating.svg';
import './monoicon/support-rating.svg';
import './monoicon/user-rating.svg';
import './monoicon/help.svg';

import styles from './ProductsFilters.pcss';

class ProductFilter extends Component {
  static contextTypes = {
    t: PropTypes.func,
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    onBlur: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
    defaultValue: PropTypes.objectOf(PropTypes.number).isRequired,
  }

  state = {
    value: this.props.defaultValue,
    showNotification: false,
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.defaultValue.min !== this.props.defaultValue.min
      || nextProps.defaultValue.max !== this.props.defaultValue.max
    ) {
      this.setState(() => ({
        value: nextProps.defaultValue,
      }));
    }
  }

  showNotification = () => {
    this.setState(() => ({
      showNotification: true,
    }));
  }

  hideNotification = () => {
    this.setState(() => ({
      showNotification: false,
    }));
  }

  handleChange = (value) => {
    this.setState(() => ({
      value,
    }));
  }

  handleBlur = () => {
    this.props.onBlur({
      name: this.props.name,
      value: this.state.value,
    });
  }

  render() {
    const { t } = this.context;

    const {
      title,
      description,
      icon,
      min,
      max,
      disabled,
    } = this.props;

    return (
      <div className={styles.ProductsFilters__item}>
        <Icon
          className={styles.ProductsFilters__icon}
          icon={icon}
        />

        <span className={styles.ProductsFilters__title}>{t(title)}</span>

        <div
          className={styles.ProductsFilters__iconHelpWrap}
          onMouseOver={this.showNotification}
          onFocus={this.showNotification}
          onMouseOut={this.hideNotification}
          onBlur={this.hideNotification}
        >
          <Icon
            className={styles.ProductsFilters__iconHelp}
            icon="help"
          />

          <N1C
            className={styles.ProductsFilters__notification}
            show={this.state.showNotification}
            onRequestHide={this.hideNotification}
          >
            {t(description)}
          </N1C>
        </div>

        <Filter
          className={styles.ProductsFilters__filter}
          min={min}
          max={max}
          value={this.state.value}
          onChange={this.handleChange}
          onMouseUp={this.handleBlur}
          onTouchEnd={this.handleBlur}
          disabled={disabled}
        />
      </div>
    );
  }
}

export default withStyles(styles)(ProductFilter);
