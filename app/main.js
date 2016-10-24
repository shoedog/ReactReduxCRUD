import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';

import configureStore from './store/configureStore';
import App from './containers/App';
//import Root from './containers/Root';

//const store = configureStore();
const history = browserHistory;

ReactDOM.render(
  <Provider store={configureStore()}>
    <App />
  </Provider>,
document.getElementById('root')
);
