import React,{Component} from 'react';
import Swiper from 'Swiper';

class SwiperCom extends Component{
  constructor(porps) {
    super(porps);
    this.state = {
      pageIndex:1
    }
  }
  componentDidMount(){
    var mySwiper = new Swiper ('.swiper-container', {
      loop: false,
      onSlideNextEnd:(swiper)=>{
      }
    })
  }
  render(){
    return (
      <div className="swiper-container">
        <div className="swiper-wrapper">
          {
            this.props.list.map((_li,_key) => {
              return (
                <li key={_key} className="swiper-slide hot-rec">
                  <a href={_li.link}>
                    <img src={_li.image_url} />
                    <div className="hot-info">
                      <h3 className="hot-tit">{_li.stitle}</h3>
                      <p className="hot-desc">{_li.description}</p>
                    </div>
                  </a>
                </li>
              )
            })
          }
        </div>
        <i className="swiper-pagination page" style={{ display:this.props.list.length===1?'none':'block'}}>{this.state.pageIndex}/{this.props.list.length}</i>
      </div>
    )
  }
}
export default SwiperCom;
