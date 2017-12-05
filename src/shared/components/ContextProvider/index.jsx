import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ContextProvider extends Component {
  static childContextTypes = {
    insertCss: PropTypes.func,
  }

  getChildContext() {
    return { ...this.props.context }
  }

  render () {
    const { children, ...props } = this.props;
    return React.cloneElement(children, props);
  }
}
