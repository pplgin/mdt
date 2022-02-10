import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PageHome from './pages/classroom';
import PageDebug from './pages/debug';

export default () => (
  <Switch>
    <Route exact path="/" render={PageHome} />
    <Route exact path="/debug" render={PageDebug} />
  </Switch>
);
