import React from 'react'
import {  Route, IndexRoute } from 'react-router'

import App from './containers/App';
//首页
import Home from './containers/Home';
//专辑
import Album from './containers/Album';
//blog
import Blog from './containers/Blog';

export default(
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="album" component={Album}/>
    <Route path="blog" component={Blog}/>
  </Route>
)
