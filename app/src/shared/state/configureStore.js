/* global NODE_ENV */

import { createStore } from 'redux';
import rootReducer from './reducers/index';

export default function configureStore(initialState = {}) {
  const devtools = (NODE_ENV === 'development'
    && (typeof window !== 'undefined')
    && window.__REDUX_DEVTOOLS_EXTENSION__)
    ? window.__REDUX_DEVTOOLS_EXTENSION__() : undefined;

  const store = createStore(rootReducer, initialState, devtools);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers/index'); // eslint-disable-line global-require
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
