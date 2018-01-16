import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import B2E from '@plasma-platform/plasma-quark/lib/buttons/types/B2E';
import VendorsList from 'components/VendorsList';

import {
  getVendors,
} from 'actions';

import styles from './Vendors.pcss';

const PAGE_AUTOLOAD = 5;

class Vendors extends Component {

  static contextTypes = {
    t: PropTypes.func,
  };

  /**
   * Constructor will set context to the methods,
   * request list of the vendors and save viewport height
   * @constructor
   * @param  {object} props component props\
   */
  constructor(props) {
    super(props);

    // if (
    //   props.vendors.list === undefined ||
    //   !Array.isArray(props.vendors.list) ||
    //   props.vendors.list.length === 0
    // ) { this.getNextPage(); }

    // this.setVH();
    // this.sortByRating = this.sortBy.bind(this, 'rating');
  }

  componentDidMount() {
    console.log('get vendors');
    this.props.getVendors();
  }

  render() {
    const { t } = this.context;

    return (
      <main
        ref={(element)=>{this.container = element;}}
        className={styles.Vendors}>
        <VendorsList
          key="vendorsList"
          />
      </main>
    );
  }
}

const mapStateToProps = state => ({
  store: state,
});

const mapDispatchToProps = dispatch => ({
  getVendors: params => dispatch(getVendors(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Vendors));
