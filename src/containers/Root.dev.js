import React,{Component,PropTypes} from 'react';
import { Router, Route, browserHistory } from 'react-router'
import { Provider } from 'react-redux';
import DevTools from './DevTools';


//路由
import routers from '../router';

class Root extends Component{
  render(){
    const { store,history } = this.props;
    return (
      <Provider store={store}>
        <div className="grid">
          <Router history={history} routes={routers} />
          <DevTools/>
        </div>
      </Provider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default Root;
