// import axios from 'util/Api';
import { GET_MAIN_LAYOUTS, GET_MAIN_DATA } from '../../constants/actionTypes';

import layouts from '../../layoutConfig';
// import layouts from '../../layoutConfig'

export const getLayout = () => async (dispatch) => {
  console.log('Get LAYOUT JALAN');
  dispatch({
    type: GET_MAIN_LAYOUTS,
    payload: layouts,
  });
};

// export const getData = () => async (dispatch) => {

//     dispatch({
//       type: GET_MAIN_DATA,
//       payload: res.data.map((x) => ({ ...x.report, tanggal: x.day })),
//     });

// };
