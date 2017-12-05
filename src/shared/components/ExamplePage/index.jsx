import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './ExamplePage.css';

class ExamplePage extends Component {
  state = {
    color: "red"
  }
  render () {
    return (<h1 className={styles.ExamplePage}>I am component</h1>);
  }
}

export default withStyles(styles)(ExamplePage);
