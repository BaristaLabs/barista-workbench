import * as React from 'react';
import './App.scss';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <nav className="pt-navbar pt-fixed-top pt-dark">
          <div style={{ margin: '0 auto' }}>
            <div className="pt-navbar-group pt-align-left">
              <div className="pt-navbar-heading">Barista Workbench</div>
            </div>
            <div className="pt-navbar-group pt-align-right">
              <button className="pt-button pt-minimal pt-icon-dashboard">Dashboard</button>
              <button className="pt-button pt-minimal pt-icon-code">Fiddle</button>
              <span className="pt-navbar-divider" />
              <button className="pt-button pt-minimal pt-icon-cog" />
            </div>
          </div>
        </nav>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
