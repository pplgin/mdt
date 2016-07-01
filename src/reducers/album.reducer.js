import * as AlbumActionType from '../constants/ActionTypes';
import { AlbumWooAPI } from '../constants/ApiUrl';
import DtTools from '../untils/DtTools';

const initialState = {
  covers:[],
  user:{
    username:'',
    id:''
  },
  wooData:{
    furl:AlbumWooAPI+'?start=',
    temp: 2,
    inputs:[{
      name: 'include_fields',
      value: 'sender,album'
    }, {
      name: 'limit',
      value: 24,
    }, {
      name: 'album_id',
      value: DtTools.getParams().id
    }]
  }
}


export default function AlbumInfoData(state = initialState ,action){
  switch (action.type) {
    case AlbumActionType.ALBUMINFO_RECIVED:
      state.wooData.inputs[2].value = action.data.id;
      return Object.assign({}, state,action.data);
      break;
    default:
      return state;
      break;
  }
}
