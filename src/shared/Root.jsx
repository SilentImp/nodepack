import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { I18nextProvider } from 'react-i18next';
import Header from '@plasma-platform/quark-library/lib/Header/Header';
import Footer from '@plasma-platform/quark-library/lib/Footer/Footer';
import App from 'components/App';
import Products from 'pages/Products/';

const Root = ({ store, i18n, history }) => (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <I18nextProvider i18n={i18n}>
          <App>
            <Header />
            <Switch>
              <Route
                exact
                path="/"
                component={Products}
              />
            </Switch>
            <Footer />
          </App>
        </I18nextProvider>
      </ConnectedRouter>
    </Provider>
  );

Root.propTypes = {
  store: PropTypes.objectOf(PropTypes.func).isRequired,
  i18n: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Root;
