import 'babel-polyfill';
import fs from 'fs';
import React from "react";
import {resolve} from 'path';
import { renderToString } from "react-dom/server";

import ExamplePage from 'shared/components/ExamplePage/index';
import ContextProvider from 'shared/components/ContextProvider/index'

import template from 'shared/template/index.pug';
import assets from '../build/webpack-assets.json';

const queryString = require('query-string');
const express = require('express');
const app = express();


app.use(express.static('build'));

app.get('/', (req, res) => {
  const css = new Set();
  const context = {
    insertCss: (...styles) => {
      styles.forEach(style => css.add(style._getCss()));
    }
  };
  let page = renderToString(<ContextProvider context={context}><ExamplePage/></ContextProvider>);
  const scripts = Object.keys(assets).sort().map((entry)=>`<script async src="${ assets[entry].js }"></script>`).join('');

  res.send(template({
    title: 'Template Monster',
    page: page,
    styles: [...css].join(''),
    scripts: scripts
  }));

});



app.listen(3000, () => console.log('Example app listening on port 3000!'))
