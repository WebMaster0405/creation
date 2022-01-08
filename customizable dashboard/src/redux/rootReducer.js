import { combineReducers } from 'redux';

import home from './reducers/home';

const rootReducer = combineReducers({
  home: home,
});

export default rootReducer;
