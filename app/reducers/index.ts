import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { counter} from './counter';

export const rootReducer = combineReducers({
  counter,
  routing
});
