import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_GET_CURRENT_WEATHER_BEGIN,
  HOME_GET_CURRENT_WEATHER_SUCCESS,
  HOME_GET_CURRENT_WEATHER_FAILURE,
  HOME_GET_CURRENT_WEATHER_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  getCurrentWeather,
  dismissGetCurrentWeatherError,
  reducer,
} from '../../../../src/features/home/redux/getCurrentWeather';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/getCurrentWeather', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getCurrentWeather succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getCurrentWeather())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_CURRENT_WEATHER_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_CURRENT_WEATHER_SUCCESS);
      });
  });

  it('dispatches failure action when getCurrentWeather fails', () => {
    const store = mockStore({});

    return store.dispatch(getCurrentWeather({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_CURRENT_WEATHER_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_CURRENT_WEATHER_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissGetCurrentWeatherError', () => {
    const expectedAction = {
      type: HOME_GET_CURRENT_WEATHER_DISMISS_ERROR,
    };
    expect(dismissGetCurrentWeatherError()).toEqual(expectedAction);
  });

  it('handles action type HOME_GET_CURRENT_WEATHER_BEGIN correctly', () => {
    const prevState = { getCurrentWeatherPending: false };
    const state = reducer(
      prevState,
      { type: HOME_GET_CURRENT_WEATHER_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getCurrentWeatherPending).toBe(true);
  });

  it('handles action type HOME_GET_CURRENT_WEATHER_SUCCESS correctly', () => {
    const prevState = { getCurrentWeatherPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_CURRENT_WEATHER_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getCurrentWeatherPending).toBe(false);
  });

  it('handles action type HOME_GET_CURRENT_WEATHER_FAILURE correctly', () => {
    const prevState = { getCurrentWeatherPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_CURRENT_WEATHER_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getCurrentWeatherPending).toBe(false);
    expect(state.getCurrentWeatherError).toEqual(expect.anything());
  });

  it('handles action type HOME_GET_CURRENT_WEATHER_DISMISS_ERROR correctly', () => {
    const prevState = { getCurrentWeatherError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_GET_CURRENT_WEATHER_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getCurrentWeatherError).toBe(null);
  });
});

