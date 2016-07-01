import { createStore, applyMiddleware } from 'redux';
import { BANNER_LIST_LOADING ,BANNER_LIST_RECIVED} from '../constants/ActionTypes';
import { BannerListAPI } from '../constants/ApiUrl';
import DtTools from '../untils/DtTools';


function reviceBannerList( jsn , params = {} ){
  return {
    type:BANNER_LIST_RECIVED,
    object_list: jsn.data.object_list,
    more:!!jsn.data.more,
    loaded:true,
    next_start:jsn.data.next_start,
    params:params
  }
}

//获取数据
function fetchBannerListData(_params) {
  return dispatch => {
    return DtTools.dtFetch({
        url:BannerListAPI+'?limit='+_params.limit+'&ad_id='+_params.aid+'&start='+_params.next_start
      })
      .then(json => dispatch(reviceBannerList(json,_params)));
  };
}

export function fetchBannerList(_params) {
  return (dispatch) => dispatch(fetchBannerListData(_params));
}
