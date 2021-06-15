
import {createStore, applyMiddleware} from 'redux';
import rootReducer from './module/reducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './module/sagas';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware]

const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

export default store;
 
