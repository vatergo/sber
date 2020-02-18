import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Auth } from './pages/Auth';
import { Main } from './pages/Main';
import { Other } from './pages/Other';

export const useRoutes = (isAuthenticated) => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path='/main' exact>
                    <Main />
                </Route>
                <Route path='/other' exact>
                    <Other />
                </Route>
                <Redirect to='/main' />
            </Switch>
        );
    }
    return (
        <Switch>
            <Route path='/' exact>
                <Auth />
            </Route>
            <Redirect to='/' />
        </Switch>
    );
}