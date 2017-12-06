import { Component } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';

export class App extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    i18n: PropTypes.shape({
      changeLanguage: PropTypes.func.isRequired,
    }).isRequired,
    t: PropTypes.func.isRequired,
  };

  static childContextTypes = {
    i18n: PropTypes.shape({
      changeLanguage: PropTypes.func.isRequired,
    }).isRequired,
    t: PropTypes.func,
  };

  static defaultProps = {
    children: null,
  };

  getChildContext() {
    return {
      t: this.props.t,
      i18n: this.props.i18n,
    };
  }

  onRequestChangeAppLocale = (localeCode = 'en') => {
    this.props.i18n.changeLanguage(localeCode);
  };

  render() {
    const { children } = this.props;
    return children;
  }
}

export default translate()(App);
