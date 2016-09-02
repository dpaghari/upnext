import React from 'react';
import { render } from 'react-dom';
// import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { Provider } from "react-redux";
import store from "./store";

import Layout from 'pages/Layout';

render(<Provider store={store}>
  <Layout/>
  </Provider>,
  document.getElementById('app'));
