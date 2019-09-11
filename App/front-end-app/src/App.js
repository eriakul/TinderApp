import React from 'react';
import TinderPage from './js/container/TinderPage'
import GeneralPage from './js/container/GeneralPage'

import { Switch, Route } from 'react-router-dom'

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={GeneralPage} />
        <Route path='/name/:name' component={GeneralPage} />
        <Route path='/tinder' component={TinderPage} />
      </Switch>
    );
  }
}

export default App;
