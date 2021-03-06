import {h} from 'preact' // eslint-disable-line no-unused-vars
import render from 'preact-render-to-string';
import App from './../app/app';
import {Router} from 'express';
import {readFileSync} from 'fs';

const assets = JSON.parse(readFileSync(`${__dirname}/public/rev-manifest.json`));


const AppShell = (inHtml) => `<!DOCTYPE html>
<html lang="en-US">
  <head>
    <title>Preact SSR</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="theme-color" content="#673ab8">
    <link rel="shortcut icon"type="image/x-icon" href="data:image/x-icon;,">
    <link rel="stylesheet" href="/${assets['style.css']}">
  </head>
  <body>
    <main id="app">${inHtml}</main>
    <script>window.__INITIAL_STATE__=${JSON.stringify({test:1234}).replace(/</g, '\\u003c')}</script>
    <script src="/${assets['bundle.js']}"></script>
  </body>
</html>`;


export default Router().get('/', (req, res) => {

  res.send(
    AppShell( render(<App />) )
  );

});
