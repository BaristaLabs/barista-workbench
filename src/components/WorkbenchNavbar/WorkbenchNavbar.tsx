import * as React from 'react';
import { Link } from 'react-router-dom';
const logo = require('./logo.svg');

export class WorkbenchNavbar extends React.Component {
    render() {
        return (
            <nav className="pt-navbar pt-fixed-top pt-dark">
                <div style={{ margin: '0 auto' }}>
                    <div className="pt-navbar-group pt-align-left">
                        <Link className="pt-button pt-minimal" role="button" to="/">
                            <img src={logo} alt="BaristaLabs, LLC" style={{ height: '20px', paddingRight: '5px', verticalAlign: 'text-bottom' }} />
                            <span className="pt-navbar-heading">Barista Workbench</span>
                        </Link>
                    </div>
                    <div className="pt-navbar-group pt-align-right">
                        <Link className="pt-button pt-minimal pt-icon-dashboard" to="/">Dashboard</Link>
                        <Link className="pt-button pt-minimal pt-icon-code" to="fiddle">Fiddle</Link>
                        <span className="pt-navbar-divider" />
                        <Link className="pt-button pt-minimal pt-icon-cog" to="settings" />
                    </div>
                </div>
            </nav>
        );
    }
}