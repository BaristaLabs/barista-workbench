import * as React from 'react';
import './App.scss';

import { WorkbenchNavbar } from './components/WorkbenchNavbar';

class App extends React.Component {
  render() {
    return (
      <div className="App pt-focus-disabled">
        <WorkbenchNavbar />
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
