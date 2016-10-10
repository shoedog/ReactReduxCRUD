import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddware } from 'redux';
import { applyRouterMiddleware, Router, Route, IndexRoute, browserHistory } from 'react-router';

import configureStore from './store/configureStore';

import App from './containers/App';
import Home from './containers/home/Home';
//<Route path="/signup" component={Signup} />

import './main.css';

const initialState = {};
const store = configureStore(initialState);

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />;

      </Route>
    </Router>
  </Provider>
  , document.getElementById('root'));
