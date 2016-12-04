import path from 'path';
import Express from 'express';
import React from "react";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import eventapp from './reducers';
import App from './pages/Layout';
import { renderToString } from "react-dom/server";

const app = Express();
const port = 3000;

app.use(handleRender);

function handleRender(req, res) {
  // Create a new Redux store instance
 const store = createStore(eventApp)

 // Render the component to a string
 const html = renderToString(
   <Provider store={store}>
     <App />
   </Provider>
 )

 // Grab the initial state from our Redux store
 const preloadedState = store.getState()

 // Send the rendered page back to the client
 res.send(renderFullPage(html, preloadedState))
}

function renderFullPage(html, preloadedState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="app">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}
        </script>
        <script src="../bundle.js"></script>
      </body>
    </html>
    `
}

app.listen(port);
