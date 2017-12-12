import browserEnv from 'browser-env';

browserEnv();

// import fs from 'fs'; // eslint-disable-line
import React from 'react'; // eslint-disable-line
import { renderToString } from "react-dom/server"; // eslint-disable-line
import { AppContainer } from 'react-hot-loader'; // eslint-disable-line
import stylesReset from 'reset.css'; // eslint-disable-line
import sprite from 'svg-sprite-loader/runtime/sprite.build'; // eslint-disable-line
import template from 'shared/template/index.pug'; // eslint-disable-line
import store from '../shared/store'; // eslint-disable-line
import i18n from '../shared/i18n'; // eslint-disable-line
import Root from '../shared/Root'; // eslint-disable-line
import ContextProvider from '../shared/components/ContextProvider/index' // eslint-disable-line
import stylesMain from '../shared/assets/styles/main.pcss'; // eslint-disable-line
import assets from '../../build/webpack-assets.json'; // eslint-disable-line


const express = require('express');

const spriteContent = sprite.stringify();
const app = express();

app.use(express.static('build'));
app.get('*', (req, res) => {
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
