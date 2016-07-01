import * as HomeActionType from '../constants/ActionTypes';
import DTools from '../untils/DtTools';


let BANNERLIST = [];
const initialState = {
  object_list: [] ,
  limit:30,
  next_start:0
}

const LINKMAP ={
  'album':'/album/?id=',
  'topic':'/topic/?id=',
  'pgc':'http://www.duitang.com/life_artist/article/detail/?id='
}

//数据处理
function handlerData(_res){
  let _templArr = [], i = 0;
  _res.forEach((_val,_index)=>{
    _val.link = LINKMAP[_val.content_type]?LINKMAP[_val.content_type]+_val.id : _val.target;
    if(_val.style==='large'){
      _val.image_url = DTools.dtImageTrans(_val.image_url,true,600,332,'c');
      if(_index>0&&_res[_index-1].style==='small'){
        i++;
      }
    }else{
      _val.image_url = DTools.dtImageTrans(_val.image_url,true,90,90,'c');
      if(_index>0&&_res[_index-1].style==='large'){
        i++;
      }
    }
    if(!_templArr[i]){
      _templArr[i] = {
        cate:_val.style,
        list:[]
      };
    }
    _templArr[i].list.push(_val);
  });
  return _templArr;
}

export default function BannerListData(state = initialState ,action){
  switch (action.type) {
    case HomeActionType.BANNER_LIST_RECIVED:
      BANNERLIST = BANNERLIST.concat(handlerData(action.object_list));
      return Object.assign({}, state, {
        object_list: BANNERLIST,
        more:!!action.more,
        loaded:action.loaded,
        next_start: action.next_start
      });
      break;
    default:
      return state;
      break;
  }
}
