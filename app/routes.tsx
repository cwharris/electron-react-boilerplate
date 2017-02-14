import * as React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';

export const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/counter" component={CounterPage} />
  </Route>
);
