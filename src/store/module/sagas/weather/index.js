/* eslint-disable no-empty-function */
import {all, takeLatest, put} from 'redux-saga/effects';
import Types from '../../types';
import api from '../../../../services/Api';
import axios from 'axios';

function* requestWeather(action) {
  let sucess;
  let sucessPayload = {};
  let message = '';
  try {
    const res = yield api.get(`/onecall?lat=${action.payload.lat}&lon=${action.payload.lon}&appid=${action.payload.appid}&units=metric&lang=pt_br`);  
    const googleRes = yield axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${action.payload.lat},${action.payload.lon}&sensor=true&key=${action.payload.googleKey}`)    

    res.data = {
      ...res.data,
      addressInfo: googleRes.data
    }

    if (res && res.data) {
      sucess = true;
      sucessPayload = res.data;
    } else {
      sucess = false;
      message = 'Erro ao conectar com servidor';
    }
  } catch (error) {
    console.log('Algo ocorreu ', error);
    message = error.message;
    sucess = false;
  }

  if (sucess) {
    yield put({
      type: Types.weather.REQUEST_WEATHER_SUCCESS,
      payload: sucessPayload,
    });
  } else {
    yield put({
      type: Types.weather.REQUEST_WEATHER_FAILED,
      payload: {message},
    });
  }
}

export default all([
  takeLatest(Types.weather.REQUEST_WEATHER_SAGA, requestWeather),
]);