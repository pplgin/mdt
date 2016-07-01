import { createStore, applyMiddleware } from 'redux';
import { ALBUMINFO_LOADING,ALBUMINFO_RECIVED} from '../constants/ActionTypes';
import { AlbumInfoAPI } from '../constants/ApiUrl';
import DTools from '../untils/DtTools';


function reviceAlbumData( jsn){
  return {
    type:ALBUMINFO_RECIVED,
    data:jsn.data
  };
}

//获取数据
function fetchAlbumData(_params) {
  return dispatch => {
    return DTools.dtFetch({
        url:AlbumInfoAPI,
        data:{
          include_fields:'share_links,share_info,covers,members,member_count,managers',
          album_id:_params.id
        }
      })
      .then(json => dispatch(reviceAlbumData(json)));
  };
}

export function fetchAlbum(_params) {
  return (dispatch) => dispatch(fetchAlbumData(_params));
}
