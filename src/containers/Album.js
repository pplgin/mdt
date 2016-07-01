import React,{Component,PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import '../styleSheet/album.style.scss';
import * as AlbumActions from '../actions/album.action';
import DtTools from '../untils/DtTools';
import Woo from '../components/woo.component';


class Album extends Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){
    this._loadfromServer();
  }
  render(){
    const { AlbumInfo } = this.props;
    return (
      <div className="album">
        {this._renderHeader(AlbumInfo)}
        {this._renderWoo(AlbumInfo) }
      </div>
    )
  }
  _renderHeader(_jsn){
    let styles,userAvatar;
    if(_jsn.covers.length>0){
       styles = {
        backgroundImage: 'url(' + _jsn.covers[0] + ')'
      }
      userAvatar = {
        backgroundImage: 'url(' + _jsn.user.avatar + ')'
      }
    }
    return (
      <div className="detail-album">
        <section className="block-title-3 not-first-time" style={styles}>
          <div className="backend"></div>
          <div className="content">
            <h1>{_jsn.name}</h1>
            <h2><span>{_jsn.count}</span> 个收集&nbsp;·&nbsp; <span>{_jsn.favorite_count}</span> 人喜欢</h2>
            <div className="v-l"></div>
            <div className="author">
              <a href={"/people/?user_id="+_jsn.user.id} className="avatar" style={userAvatar}></a>
            </div>
            <p>by&nbsp;&nbsp;{_jsn.user.username}</p>
          </div>
        </section>
      </div>
    )
  }
  _renderWoo(_jsn){
    return (
      <Woo data={_jsn.wooData}/>
    )
  }
  _loadfromServer(){
    const { AlbumInfo , fetchAlbum } = this.props;
    fetchAlbum({
      id:DtTools.getParams().id
    });
  }
}

Album.propTypes = {
  AlbumInfo: PropTypes.object.isRequired,
  fetchAlbum: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    AlbumInfo: state.AlbumInfoData
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, AlbumActions), dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Album);
