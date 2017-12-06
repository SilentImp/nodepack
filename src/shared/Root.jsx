import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import App from 'Components/App';
import ExamplePage from './pages/ExamplePage';

const Root = ({ store, i18n }) => (
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <App>
        <ExamplePage />
      </App>
    </I18nextProvider>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.objectOf(PropTypes.func).isRequired,
  i18n: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Root;
