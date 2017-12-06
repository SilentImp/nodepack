import React from 'react';
import { renderToString } from "react-dom/server";
import { AppContainer } from 'react-hot-loader';
import stylesReset from 'reset.css';
import sprite from 'svg-sprite-loader/runtime/sprite.build';
import template from 'shared/template/index.pug';
import store from '../shared/store';
import i18n from '../shared/i18n';
import Root from '../shared/Root';
import ContextProvider from '../shared/components/ContextProvider/index'
import stylesMain from '../shared/assets/styles/main.pcss';
import assets from '../../build/webpack-assets.json';

const express = require('express');

const spriteContent = sprite.stringify();
const app = express();

app.use(express.static('build'));
app.get('/', (req, res) => {
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
        <Root store={store} location={req.url} i18n={i18n} />
      </ContextProvider>
    </AppContainer>,
  );
  const scripts = Object.keys(assets).sort().map((entry)=>`<script async src="${ assets[entry].js }"></script>`).join('');

  res.send(template({
    title: 'Template Monster',
    page,
    styles: [...css].join(''),
    scripts,
    svgSprite: spriteContent
  }));

});



app.listen(3000, () => console.log('Example app listening on port 3000!'))
