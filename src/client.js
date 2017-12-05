import React from 'react';
import ReactDOM from 'react-dom';
import ExamplePage from 'shared/components/ExamplePage/index';
import ContextProvider from 'shared/components/ContextProvider/index'

const context = {
  insertCss: (...styles) => {
    const removeCss = styles.map(x => x._insertCss());
    return () => {
      removeCss.forEach(f => f());
    };
  },
}
ReactDOM.hydrate(
  <ContextProvider context={context}>
    <ExamplePage />
  </ContextProvider>,
  document.getElementById('root')
);
