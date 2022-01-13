import { combineReducers } from 'redux';

function user(state = {}, action:any) {
  switch (action.type) {
    case 'USER_ACCOUNT':
      return { ...state,  address: action.address }
    case 'USER_CRYPTO':
      return { ...state,  crypto: action.crypto }
    case 'USER_NETWORK' :
      return { ...state, network: action.network }
    default:
      return state
  }
}

const rootReducer = combineReducers({
    user
});
  
export default rootReducer
  