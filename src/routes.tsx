import * as React from 'react';
import { RouteProps } from 'react-router-dom';

export const routes: Array<RouteProps> = [
    {
        path: '/',
        exact: true,
        render: (stateProps) => {
            return (
                <div>Main Dashboard</div>
            );
        }
    },
    {
        path: '/pages/:pageId',
        render: (stateProps) => {
            return (
                <div>Dashboard Page</div>
            );
        }
    },
    {
        path: '/fiddle/:fiddlePath*',
        render: (stateProps) => {
            return (
                <div>Fiddle</div>
            );
        }
    },
    {
        path: '/settings',
        render: (stateProps) => {
            return (
                <div>Settings</div>
            );
        }
    },
    {
        path: '*',
        render: (stateProps) => {
            return (
                <div>Not Found</div>
            );
        }
    }
];