import Types from '../../types';

const INITIAL_STATE = {
  loading: false,
  weather: null,
  failed: false
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.weather.REQUEST_WEATHER_SAGA: {
      const newState = {...state, action};
      newState.loading = true;
      newState.failed = false;
      return newState;
    }
    case Types.weather.REQUEST_WEATHER_SUCCESS: {
      const newState = {...state, action};
      newState.loading = false;
      newState.weather = action.payload;
      newState.failed = false;
      return newState;
    }
    case Types.weather.REQUEST_WEATHER_FAILED: {
      const newState = {...state, action};
      newState.loading = false;
      newState.failed = true;
      return newState;
    }

    default: {
      return state;
    }
  }
}
