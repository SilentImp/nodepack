import 'babel-polyfill';
import React from "react";
import { renderToString } from "react-dom/server";

import ExamplePage from 'shared/components/example/index';

const queryString = require('query-string');
const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', 'shared/template');

app.get('/', (req, res) => {

  const page = renderToString(<ExamplePage/>);

  res.render('index', { page });
});



app.listen(3000, () => console.log('Example app listening on port 3000!'))
