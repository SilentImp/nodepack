import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import styles from './Tag.pcss';

function Tag(props) {
  const { className, type, size, disabled, showCross, colorScheme, ...tagProps } = props;

  const tagStateClassName = disabled ? styles['tm-quark-tag_disabled'] : '';
  const tagCustomClassName = className ? ` ${className}` : '';
  let element;
  switch (props.type) {
    case 'button':
      element = (
        <button
          className={`
            ${styles['tm-quark-tag']}
            ${styles[`tm-quark-tag_type_${type}`]}
            ${styles[`tm-quark-tag_size_${size}${tagStateClassName}`]}
            ${styles[`tm-quark-tag_color-scheme_${colorScheme}${tagCustomClassName}`]}
          `}
          type="button"
          {...tagProps}
        >
          <span className={styles['tm-quark-tag__content']}>{props.children}</span>
          {showCross && <i className={styles['tm-quark-tag__cross']} />}
        </button>
      );
      break;
    case 'text':
      element = (
        <span
          className={`
            ${styles['tm-quark-tag']}
            ${styles[`tm-quark-tag_type_${type}`]}
            ${styles[`tm-quark-tag_size_${size}${tagStateClassName}`]}
            ${styles[`tm-quark-tag_color-scheme_${colorScheme}${tagCustomClassName}`]}
          `}
          {...tagProps}
        >
          <span className={styles['tm-quark-tag__content']}>{props.children}</span>
          {showCross && <i className={styles['tm-quark-tag__cross']} />}
        </span>
      );
      break;
    default:
      element = (
        <a
          className={`
            ${styles['tm-quark-tag']}
            ${styles[`tm-quark-tag_type_${type}`]}
            ${styles[`tm-quark-tag_size_${size}${tagStateClassName}`]}
            ${styles[`tm-quark-tag_color-scheme_${colorScheme}${tagCustomClassName}`]}
          `}
          {...tagProps}
        >
          <span className={styles['tm-quark-tag__content']}>{props.children}</span>
          {showCross && <i className={styles['tm-quark-tag__cross']} />}
        </a>
      );
  }

  return element;
}

Tag.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(['link', 'button', 'text']),
  size: PropTypes.oneOf(['small', 'medium']).isRequired,
  disabled: PropTypes.bool,
  showCross: PropTypes.bool,
  colorScheme: PropTypes.oneOf(['blue', 'red']),
};

Tag.defaultProps = {
  type: 'link',
  showCross: false,
  colorScheme: 'blue',
};

export default withStyles(styles)(Tag);
