import Types from '../../types';

const INITIAL_STATE = {
  loading: false,
  weather: null,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.weather.REQUEST_WEATHER_SAGA: {
      const newState = {...state, action};
      newState.loading = true;
      return newState;
    }
    case Types.weather.REQUEST_WEATHER_SUCCESS: {
      const newState = {...state, action};
      newState.loading = false;
      newState.weather = action.payload;
      return newState;
    }
    case Types.weather.REQUEST_WEATHER_FAILED: {
      const newState = {...state, action};
      newState.loading = false;
      return newState;
    }

    default: {
      return state;
    }
  }
}
