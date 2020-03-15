import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Auth from './pages/Auth';
import Other from './pages/Other';
import Catalog from './pages/Catalog';
import Product from './pages/Product';

const useRoutes = (isAuthenticated) => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path='/catalog' exact>
                    <Catalog />
                </Route>
                <Route path='/catalog/:id' component={Product} />
                <Route path='/other' exact>
                    <Other />
                </Route>
                <Redirect to='/catalog' />
            </Switch >
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
};

export default useRoutes;