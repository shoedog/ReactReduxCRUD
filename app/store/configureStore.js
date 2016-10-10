import { createStore, applyMiddleware, compose } from 'redux';
import browserHistory from 'react-router';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducer';



export default function configureStore(initialState) {
  let middlewares = [ thunkMiddleware ];

  const store = createStore(rootReducer, initialState, applyMiddleware(...middlewares));

  return store;
}
