import * as Redux from "redux";
import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../actions/counter';

export const counter = function (state: number = 0, action: Redux.Action) {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return state + 1;
    case DECREMENT_COUNTER:
      return state - 1;
    default:
      return state;
  }
}
