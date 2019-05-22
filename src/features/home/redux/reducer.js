import initialState from './initialState';
import { reducer as getWeatherReducer } from './getWeather';
import { reducer as getCurrentWeatherReducer } from './getCurrentWeather';

const reducers = [
  getWeatherReducer,
  getCurrentWeatherReducer,
];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    // Handle cross-topic actions here
    default:
      newState = state;
      break;
  }
  /* istanbul ignore next */
  return reducers.reduce((s, r) => r(s, action), newState);
}
