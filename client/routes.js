import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Other from './pages/Other';
import Catalog from './pages/Catalog';
import Product from './pages/Product';

const useRoutes = (isAdmin) => {
    if (isAdmin) {
        return (
            <Switch>
                <Route path='/' exact>
                    <Other />
                </Route>
                <Redirect to='/' />
            </Switch>
        );
    }
    return (
        <Switch>
            <Route path='/catalog' exact>
                <Catalog />
            </Route>
            <Route path='/catalog/:id' component={Product} />
            <Redirect to='/catalog' />
        </Switch >
    );
};

export default useRoutes;