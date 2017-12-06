import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { createBrowserHistory as createHistory } from 'history';
import 'reset.css';
import 'Styles/main.pcss';
import store from './store';
import i18n from './i18n';
import Root from './Root';

const history = createHistory();

ReactDOM.render(
  <AppContainer>
    <Root store={store} history={history} i18n={i18n} />
  </AppContainer>,
  document.getElementById('root'),
);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./Root', () => {
    ReactDOM.render(
      <AppContainer>
        <Root store={store} history={history} i18n={i18n} />
      </AppContainer>,
      document.getElementById('root'),
    );
  });
}
