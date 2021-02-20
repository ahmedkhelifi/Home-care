import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Dashboard from './containers/Dashboard';
import './global.css';

class App extends Component {
  render() {
    return (
      <Router>
            <Switch>
              <Route exact path="/" component={Dashboard} />
            </Switch>
      </Router>
    );
  }
}

export default App;
