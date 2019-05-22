import {
  HOME_GET_WEATHER_BEGIN,
  HOME_GET_WEATHER_SUCCESS,
  HOME_GET_WEATHER_FAILURE,
  HOME_GET_WEATHER_DISMISS_ERROR,
} from './constants';
import axios from 'axios';

export function getWeather(args = {}) {
  return (dispatch) => {
    dispatch({
      type: HOME_GET_WEATHER_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = axios.get('http://api.openweathermap.org/data/2.5/forecast?id=1733045&appid=90aebe33f34dec8243c8c926884f7c15')
      doRequest.then(
        (res) => {
          dispatch({
            type: HOME_GET_WEATHER_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: HOME_GET_WEATHER_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissGetWeatherError() {
  return {
    type: HOME_GET_WEATHER_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_GET_WEATHER_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        getWeatherPending: true,
        getWeatherError: null,
      };

    case HOME_GET_WEATHER_SUCCESS:
      // The request is success
      return {
        ...state,
        getWeatherPending: false,
        getWeatherError: null,
        weatherList: action.data,
      };

    case HOME_GET_WEATHER_FAILURE:
      // The request is failed
      return {
        ...state,
        getWeatherPending: false,
        getWeatherError: action.data.error,
      };

    case HOME_GET_WEATHER_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        getWeatherError: null,
      };

    default:
      return state;
  }
}
