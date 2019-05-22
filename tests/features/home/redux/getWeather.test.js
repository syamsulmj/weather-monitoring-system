import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_GET_WEATHER_BEGIN,
  HOME_GET_WEATHER_SUCCESS,
  HOME_GET_WEATHER_FAILURE,
  HOME_GET_WEATHER_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  getWeather,
  dismissGetWeatherError,
  reducer,
} from '../../../../src/features/home/redux/getWeather';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/getWeather', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getWeather succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getWeather())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_WEATHER_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_WEATHER_SUCCESS);
      });
  });

  it('dispatches failure action when getWeather fails', () => {
    const store = mockStore({});

    return store.dispatch(getWeather({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_WEATHER_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_WEATHER_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissGetWeatherError', () => {
    const expectedAction = {
      type: HOME_GET_WEATHER_DISMISS_ERROR,
    };
    expect(dismissGetWeatherError()).toEqual(expectedAction);
  });

  it('handles action type HOME_GET_WEATHER_BEGIN correctly', () => {
    const prevState = { getWeatherPending: false };
    const state = reducer(
      prevState,
      { type: HOME_GET_WEATHER_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getWeatherPending).toBe(true);
  });

  it('handles action type HOME_GET_WEATHER_SUCCESS correctly', () => {
    const prevState = { getWeatherPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_WEATHER_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getWeatherPending).toBe(false);
  });

  it('handles action type HOME_GET_WEATHER_FAILURE correctly', () => {
    const prevState = { getWeatherPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_WEATHER_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getWeatherPending).toBe(false);
    expect(state.getWeatherError).toEqual(expect.anything());
  });

  it('handles action type HOME_GET_WEATHER_DISMISS_ERROR correctly', () => {
    const prevState = { getWeatherError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_GET_WEATHER_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getWeatherError).toBe(null);
  });
});

