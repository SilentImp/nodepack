import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { createBrowserHistory as createHistory } from 'history';
import stylesReset from 'reset.css';

import store from '../shared/store';
import i18n from '../shared/i18n';
import Root from '../shared/Root';
import ContextProvider from '../shared/components/ContextProvider/index'

import stylesMain from '../shared/assets/styles/main.pcss';


const history = createHistory();

const context = {
  insertCss: (...styles) => {
    styles.push(stylesReset);
    styles.push(stylesMain);
    const removeCss = styles.map(x => x._insertCss());
    return () => {
      removeCss.forEach(f => f());
    };
  },
}

ReactDOM.hydrate(
  <AppContainer>
    <ContextProvider context={context}>
      <Root store={store} history={history} i18n={i18n} />
    </ContextProvider>
  </AppContainer>,
  document.getElementById('root'),
);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('../shared/Root', () => {
    ReactDOM.render(
      <AppContainer>
        <ContextProvider context={context}>
          <Root store={store} history={history} i18n={i18n} />
        </ContextProvider>
      </AppContainer>,
      document.getElementById('root'),
    );
  });
}
