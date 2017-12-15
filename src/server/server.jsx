// import fs from 'fs';
import React from 'react';
import { renderToString } from "react-dom/server";
// import { renderToString } from 'react-async';
import { AppContainer } from 'react-hot-loader';
import { createMemoryHistory as createHistory } from 'history';
import stylesReset from 'reset.css';
import sprite from 'svg-sprite-loader/runtime/sprite.build';
import template from 'shared/template/index.pug';
// import { match } from 'react-router';
import configureStore from '../shared/store';
import i18n from '../shared/i18n';
import RootElement from '../shared/Root';
import ContextProvider from '../shared/components/ContextProvider/index';
import stylesMain from '../shared/assets/styles/main.pcss';
import assets from '../../build/webpack-assets.json';

const url = require('url');
const express = require('express');

import { getProducts } from 'actions';

const app = express();
app.use(express.static('build'));
app.use(async (req, res) => {

  // match({ routes, location: req.url }, (error, redirectLocation, routerState) => {

    const spriteContent = sprite.stringify();
    const history = createHistory();
    // const history = reduxReactRouter({ routes, createHistory });
    const currentURL = url.parse(req.url);
    history.location = {
      pathname: currentURL.pathname,
      search: currentURL.search === null ? '' : currentURL.search,
      hash: currentURL.hash === null ? '' : currentURL.hash,
    };

    const store = configureStore({} , history);
    const result = await store.dispatch(getProducts({locale: 'en'}));

    const css = new Set();
    css.add(stylesReset._getCss());
    css.add(stylesMain._getCss());
    const context = {
      insertCss: (...styles) => {
        styles.forEach(style => css.add(style._getCss()));
      }
    };

    const page = renderToString(
      <AppContainer>
        <ContextProvider context={context}>
          <RootElement
            store={store}
            history={history}
            location={req.url}
            i18n={i18n}
          />
        </ContextProvider>
      </AppContainer>,
    );

    console.log('store: ', store.getState().products);

    const scripts = Object.keys(assets).sort().map((entry)=>`<script async src="${ assets[entry].js }"></script>`).join('');
    const rendered = template({
      title: 'Template Monster',
      page,
      styles: [...css].join(''),
      scripts,
      svgSprite: spriteContent,
      state: JSON.stringify(store.getState()).replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029')
    });
    // fs.writeFile('./build/index.html', rendered, 'utf8');

    res.send(rendered);
  // });

});

app.listen(3000, () => console.log('Example app listening on port 3000!'))
