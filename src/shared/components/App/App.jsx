import { Component } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';

// import { getTopics, getPlatformTypes } from 'actions';

export class App extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    i18n: PropTypes.shape({
      changeLanguage: PropTypes.func.isRequired,
    }).isRequired,
    t: PropTypes.func.isRequired,
  }

  static childContextTypes = {
    insertCss: PropTypes.func,
    i18n: PropTypes.shape({
      changeLanguage: PropTypes.func.isRequired,
    }).isRequired,
    t: PropTypes.func,
  }

  getChildContext() {
    return {
      t: this.props.t,
      i18n: this.props.i18n,
    };
  }

  componentDidMount() {
  }

  onRequestChangeAppLocale = (localeCode = 'en') => {
    this.props.i18n.changeLanguage(localeCode);
  }

  render() {
    const { children } = this.props;
    return children;
  }
}

export default connect(null, null)(translate()(App));
