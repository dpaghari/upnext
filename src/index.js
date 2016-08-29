import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Layout from 'pages/Layout';



render(
  <Router history={hashHistory}>
    <Route path="/">
      <IndexRoute component={Layout}></IndexRoute>
    </Route>
  </Router>,
  document.getElementById('app'));
