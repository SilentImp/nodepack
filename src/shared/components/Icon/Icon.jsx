import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import styles from './Icon.css';

/**
 * Generate random color
 * @return {string} rgb color
 */
const getRandomColor = (str)=> {
  let hash = 0;
  for (let i = 0; i < str.length; i++) { // eslint-disable-line
    hash = str.charCodeAt(i) + ((hash << 5) - hash); // eslint-disable-line
  }
  let colour = '#';
  for (let i = 0; i < 3; i++) { // eslint-disable-line
    const value = (hash >> (i * 8)) & 0xFF; // eslint-disable-line
    colour += ('00' + value.toString(16)).substr(-2); // eslint-disable-line
  }
  return colour;
}

/**
 * Abstract Icon class
 * @namespace Icon
 * @param {string} icon icon name id in the sprite
 * @param {string | null} viewBox viewbox size
 * @param {number} width icon width
 * @param {number} height icon height
 * @param {string} className modifier class when needed
 * @return {ReactComponent} return rendered component
 */
const Icon = ({ viewBox, width, height, icon, className, title }) => (
  <svg
    className={`
      ${styles.TMIcon ? styles.TMIcon : ''}
      ${styles[`TMIcon--${icon}`] ? styles[`TMIcon--${icon}`] : ''}
      ${className}`}
    viewBox={viewBox}
    aria-label={title}
    width={width}
    height={height}
  >
    <use xlinkHref={`#${icon}`} />
    <defs>
      <rect id={icon} fill={getRandomColor(icon)} width="100%" height="100%" rx="3" />
    </defs>
  </svg>
);

/**
 * Object that contains expected props and their types
 * and used for props validation
 * @namespace Icon
 * @static
 * @type {Object}
 */
Icon.propTypes = {
  icon      : PropTypes.string.isRequired,
  title     : PropTypes.string,
  className : PropTypes.string,
  viewBox   : PropTypes.string,
  width     : PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height    : PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

/**
 * Object containing default props value
 * @namespace Icon
 * @static
 * @type {Object}
 */
Icon.defaultProps = {
  className : '',
  title     : '',
  width     : 20,
  height    : 20,
  viewBox   : null
};

export default withStyles(styles)(Icon);
