import React ,{ Component ,PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import '../styleSheet/home.style.scss';
import * as HomeActions from '../actions/home.action';
import SwiperCom from '../components/swiper.component';

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      more:false
    }
  }
  componentDidMount(){
    this._loadfromServer();
    this._onScrollAjax();
  }
  componentWillReceiveProps(props){
    console.log(this.props);
    const { BannerListData } = this.props;
    this.setState({
      more:BannerListData.more
    });
  }
  render(){
    const { BannerListData } = this.props;
    let _domStr = this._renderDom();
    return (
      <div className="home">
        {_domStr}
      </div>
    )
  }
  _renderDomVis(){
    return(
      <div>
        <div className="swiper-box">
          <ul>
            <li className="hot-rec">
              <a>
                <div className="hot-info">
                <h3 className="hot-tit"></h3>
                <p className="hot-desc"></p>
                </div>
              </a>
            </li>
          </ul>
        </div>
        <ul className="list-box">
          <li className="recommend">
            <a className="recom-link">
              <span className="rec-photo">
              </span>
              <span className="rec-info">
                <b></b>
                <em></em>
                <i></i>
              </span>
            </a>
          </li>
          <li className="recommend">
            <a className="recom-link">
              <span className="rec-photo">
              </span>
              <span className="rec-info">
                <b></b>
                <em></em>
                <i></i>
              </span>
            </a>
          </li>
          <li className="recommend">
            <a className="recom-link">
              <span className="rec-photo">
              </span>
              <span className="rec-info">
                <b></b>
                <em></em>
                <i></i>
              </span>
            </a>
          </li>
          <li className="recommend">
            <a className="recom-link">
              <span className="rec-photo">
              </span>
              <span className="rec-info">
                <b></b>
                <em></em>
                <i></i>
              </span>
            </a>
          </li>
        </ul>
      </div>
    )
  }
  _renderDom(){
    const { BannerListData } = this.props;
    return BannerListData.object_list.map((item,i) => {
      let _type = item.cate;
      switch (_type) {
        case 'large':
         return(
           <div className="swiper-box" key={i}>
             <SwiperCom list={item.list}/>
           </div>
         )
          break;
        case 'small':
          return(
            <ul className="list-box" key = {i}>{item.list.map((_li,_key) => {
              let lineBottom = _key < item.list.length-1?(<hr className="hr-line hr-b"></hr>):null;
               return (
                 <li key={_key} className="recommend">
                   <a href={_li.link} className="recom-link">
                     <span className="rec-photo">
                       <img src={_li.image_url} />
                     </span>
                     <span className="rec-info">
                       <b>{_li.stitle}</b>
                       <em>{_li.description}</em>
                       <i><img src={_li.icon_url}/>{_li.dynamic_info}</i>
                     </span>
                   </a>
                   {lineBottom}
                 </li>
               )
             })}</ul>
          )
          break;
      }
    })
  }
  _loadfromServer(){
    const { fetchBannerList , BannerListData } = this.props;
    if(BannerListData.more){
    }
    fetchBannerList({
      limit:BannerListData.limit,
      aid:'IGA009',
      next_start:BannerListData.next_start
    });
  }
  _onScrollAjax(){
    const $ele = document.querySelector('.home');
    //滚动监听
    window.addEventListener('scroll',()=>{
      let totalHeight = window.innerHeight + document.body.scrollTop;
      let overHeight = parseFloat(document.body.scrollHeight);
      if(overHeight <= totalHeight){
        if(this.state.more){
          this._loadfromServer();
        }
      }
    },false);
  }
}

Home.propTypes = {
  BannerListData: PropTypes.object.isRequired,
  fetchBannerList: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    BannerListData: state.HomeBannerData
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, HomeActions), dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);
