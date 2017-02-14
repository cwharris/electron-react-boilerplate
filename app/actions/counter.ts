import * as Redux from "redux";

export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER';

export function increment() {
  return {
    type: INCREMENT_COUNTER
  };
}

export function decrement() {
  return {
    type: DECREMENT_COUNTER
  };
}

export function incrementIfOdd() {
  return (dispatch: Redux.Dispatch<any>, getState: Function) => {
    const { counter } = getState();

    if (counter % 2 === 0) {
      return;
    }

    dispatch(increment());
  };
}

export function incrementAsync(delay = 1000) {
  return (dispatch: Redux.Dispatch<any>) => {
    setTimeout(() => {
      dispatch(increment());
    }, delay);
  };
}
