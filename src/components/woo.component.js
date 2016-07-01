import React ,{ Component,PropTypes } from 'react';
import $ from 'jquery';
import '../libs/woo/index';

class Woo extends Component {
  componentDidMount(){
    let WW = $(window).width();
    let conf = {
      "arrform": ['hot'],
      "arrsplit": '',
      "arrmasnw": (WW - 36) / 2 + 12,
      "arrmargin": 12,
      "arrfmasnw": 0,
      "arrgap": 12,
      "footer": '#footer,#preserve',
      "resize": false,
      "pageflips": 1,
      "exrecycle": true,
      "exrecycletop": 4000,
      "exrecyclebot": 4000
    };
    $.Woo(conf);
  }
  render(){
    const { data } = this.props;
    return(
      <section id="woo-holder">
        <a className="woo-swa" name="woo-anchor"></a>
        <div className="woo-swb">
          <div className="woo-pcont woo-masned stpics" data-wootemp={data.temp}></div>
          <div className="woo-pager"></div>
        </div>
        <form id="woo-form-hot" action={data.furl}>
          {
            data.inputs.map(function(_input){
              return (
                <input type="hidden" name={_input.name} value={_input.value} />
              )
            })
          }
        </form>
      </section>
    )
  }
}
Woo.propTypes = {
  data: PropTypes.object.isRequired
}
export default Woo;
