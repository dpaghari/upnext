import React from 'react';
import { render } from 'react-dom';
import { Provider } from "react-redux";
// import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { IndexRoute, Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import store from "./store";

import Layout from 'pages/Layout';
import Detail from 'pages/Detail';
import Profile from 'pages/Profile';
import Home from 'pages/Home';
import Settings from 'pages/Settings';
import Memories from 'pages/Memories';
import EventMap from 'pages/EventMap';

const history = syncHistoryWithStore(browserHistory, store);



render(<Provider store={store}>
  <Router history={history}>
    <Route path="/" component={Layout}>
    <IndexRoute component={Home}/>
    <Route path="/detail/:eventId" component={Detail}></Route>
    <Route path="/profiles/:userId" component={Profile}></Route>
    <Route path="/eventmap" component={EventMap}></Route>
    <Route path="/settings" component={Settings}></Route>
    <Route path="/memories" component={Memories}></Route>
    </Route>
  </Router>
  </Provider>,
  document.getElementById('app'));
