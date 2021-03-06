import { Function } from 'tcomb';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import { routerMiddleware, push } from 'react-router-redux';
import * as createLogger from 'redux-logger';
import { rootReducer } from '../reducers';

import * as counterActions from '../actions/counter';

const actionCreators = {
  ...counterActions,
  push,
};

const logger = createLogger({
  level: 'info',
  collapsed: true
});

const router = routerMiddleware(hashHistory);

// If Redux DevTools Extension is installed use it, otherwise use Redux compose
const reduxWindow = window as Window & {__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:Function};
const composeEnhancers = reduxWindow.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  reduxWindow.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // Options: http://zalmoxisus.github.io/redux-devtools-extension/API/Arguments.html
    actionCreators,
  }) :
  compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk, router, logger)
);

export default function configureStore(initialState:any) {
  const store = createStore(rootReducer, initialState, enhancer);

  if ((module as any).hot) {
    (module as any).hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers'))
    );
  }

  return store;
}
