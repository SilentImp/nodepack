import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import styles from './VendorsList.pcss';

class VendorsList extends Component {

  render() {

    return (
      <section className={styles.VendorsList}>test!</section>
    );
  }
}

export default withStyles(styles)(VendorsList);
