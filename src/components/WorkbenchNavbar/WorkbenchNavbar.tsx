import * as React from 'react';
const logo = require('./logo.svg');

export class WorkbenchNavbar extends React.Component {
    render() {
        return (
            <nav className="pt-navbar pt-fixed-top pt-dark">
                <div style={{ margin: '0 auto' }}>
                    <div className="pt-navbar-group pt-align-left">
                        <img src={logo} alt="BaristaLabs, LLC" style={{ height: '20px', paddingRight: '5px' }} />
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
        );
    }
}