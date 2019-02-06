const proxy = require('http-proxy-middleware');
const Bundler = require('parcel-bundler');
const express = require('express');
const path = require('path');

const bundler = new Bundler(path.join(__dirname, '../index.html'));
const app = express();

app.use(
  '/calculatePrice',
  proxy({
    target: 'http://localhost:3000',
  }),
);

app.use(bundler.middleware());

app.listen(1234);
