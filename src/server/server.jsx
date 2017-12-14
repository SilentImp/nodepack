// import fs from 'fs';
import React from 'react';
import { renderToString } from "react-dom/server";
import { AppContainer } from 'react-hot-loader';
import stylesReset from 'reset.css';
import sprite from 'svg-sprite-loader/runtime/sprite.build';
import template from 'shared/template/index.pug';
import store from '../shared/store';
import i18n from '../shared/i18n';
import Root from '../shared/Root';
import ContextProvider from '../shared/components/ContextProvider/index';
import stylesMain from '../shared/assets/styles/main.pcss';
import assets from '../../build/webpack-assets.json';

const express = require('express');

const spriteContent = sprite.stringify();
const app = express();

app.use(express.static('build'));
app.get('*', (req, res) => {

  console.log('prepearing styles for ', req.path);

  const css = new Set();
  css.add(stylesReset._getCss());
  css.add(stylesMain._getCss());
  const context = {
    insertCss: (...styles) => {
      console.log('styles - : ', styles);
      styles.forEach(style => css.add(style._getCss()));
    }
  };

  console.log('prepearing markup!');

  const page = renderToString(
    <AppContainer>
      <ContextProvider context={context}>
        <Root store={store} location={req.url} i18n={i18n} />
      </ContextProvider>
    </AppContainer>,
  );

  console.log('rendered: ', page.length);

  const scripts = Object.keys(assets).sort().map((entry)=>`<script async src="${ assets[entry].js }"></script>`).join('');
  const rendered = template({
    title: 'Template Monster',
    page,
    styles: [...css].join(''),
    scripts,
    svgSprite: spriteContent
  });
  // fs.writeFile('./build/index.html', rendered, 'utf8');
  res.send(rendered);

});

app.listen(3000, () => console.log('Example app listening on port 3000!'))
