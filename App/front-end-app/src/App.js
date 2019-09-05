import React from 'react';
import MainContainer from './js/container/MainContainer'
import GeneralPage from './js/container/GeneralPage'

import { Switch, Route } from 'react-router-dom'

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={GeneralPage} />
        <Route path='/tinder' component={MainContainer} />
      </Switch>

    );
  }
}

export default App;
