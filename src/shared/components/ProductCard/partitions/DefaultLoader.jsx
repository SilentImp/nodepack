import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Icon from '@plasma-platform/plasma-quark/lib/Icon';

import styles from './DefaultLoader.pcss';

import './../monoicon/default.svg';

const DefaultLoader = ({ loading }) => (
  <div
    className={`
      ${styles.TMLibraryProductCardLoader}
      ${loading ? styles['TMLibraryProductCardLoader--loading'] : ''}
    `}
  >
    <Icon
      className={styles.TMLibraryProductCardLoader__icon}
      icon="default"
    />
  </div>
);

DefaultLoader.propTypes = {
  loading: PropTypes.bool,
};

DefaultLoader.defaultProps = {
  loading: false,
};

export default withStyles(styles)(DefaultLoader);
