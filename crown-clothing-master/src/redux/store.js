import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import rootReducer from './root-reducer';

const middlewares = [logger];
//this step ensures we can add our own code if we want alter                                                       

const store = createStore(rootReducer, applyMiddleware(...middlewares))

export default store;