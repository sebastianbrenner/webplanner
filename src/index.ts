import React from 'react';
import ReactDOMServer from 'react-dom/server';

const AppHtml = ReactDOMServer.renderToString(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

const AppCss = (
    <style>
        {`body { margin: 0; }`}
    </style>
);

const AppJs = `<script src="/bundle.js"></script>`;

const Html = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>My React App</title>
      ${AppCss}
    </head>
    <body>
      <div id="root">${AppHtml}</div>
      ${AppJs}
    </body>
  </html>
`;

export default Html;