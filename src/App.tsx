import * as React from 'react';
import {
  HashRouter as Router,
  Route
} from 'react-router-dom';

import { routes } from './routes';
import { WorkbenchNavbar } from './components/WorkbenchNavbar';

import './App.scss';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div id="workbench" className="App pt-focus-disabled">
          <WorkbenchNavbar />
          {routes.map((route, index) => (
            <Route
              key={index}
              {...route}
            />
          ))}
        </div>
      </Router>
    );
  }
}

export default App;
