import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import DocumentTitle from 'react-document-title';
import Icon from '@plasma-platform/plasma-quark/lib/Icon';
import Footer from '@plasma-platform/quark-library/lib/Footer/Footer';
import Header from '@plasma-platform/quark-library/lib/Header/Header';
// import '@plasma-platform/quark-library/lib/IconsTypeSet';

import * as actions from 'actions/';
import Config from 'Config';

import './icon/like.svg';
import styles from './ExamplePage.pcss';

const mapStateToProps = state => ({
  state,
});

const mapDispatchToProps = () => ({
  ...actions,
});

@connect(mapStateToProps, mapDispatchToProps)

class ExamplePage extends Component {
  static contextTypes = {
    t: PropTypes.func,
  };

  render() {
    const { t } = this.context;
    return (
      <DocumentTitle title="Example Title">
        <section className={styles.ExamplePage}>
          <Header />
          <h1 className={styles.ExamplePage__title}>
            <Icon icon="like" />
            {t('Example')}
            so: {Config.test}
          </h1>
          <Footer/>
        </section>
      </DocumentTitle>
    );
  }
}

export default withStyles(styles)(ExamplePage);
