import { GET_MAIN_LAYOUTS, GET_MAIN_DATA } from '../../constants/actionTypes';

const INIT_STATE = {
  layouts: {},
  data: {},
};

const home = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_MAIN_LAYOUTS: {
      return {
        ...state,
        layouts: action.payload,
      };
    }
    case GET_MAIN_DATA: {
      return {
        ...state,
        data: action.payload,
      };
    }
    default:
      return state;
  }
};
export default home;
