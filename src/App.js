import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import RoutingLogic from './containers/RoutingLogic';

// import './App.css';
import './global.css';

class App extends Component {
  render() {
    return (
      <Router>
            <Switch>
              <Route exact path="/" component={RoutingLogic} />
            </Switch>
      </Router>
    );
  }
}

export default App;
