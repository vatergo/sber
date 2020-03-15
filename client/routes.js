import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Other from './pages/Other';
import Catalog from './pages/Catalog';
import Product from './pages/Product';
import Basket from './pages/Basket';

const useRoutes = (userData) => {
    if (userData && userData.isAdmin) {
        return (
            <Switch>
                <Route path='/' exact>
                    <Other />
                </Route>
                <Redirect to='/' />
            </Switch>
        );
    } else if (userData) {
        return (
            <Switch>
                <Route path='/catalog' exact>
                    <Catalog />
                </Route>
                <Route path='/basket' exact>
                    <Basket userData={userData} />
                </Route>
                <Route path='/catalog/:id' render={(params) => <Product id={params.match.params.id} userData={userData} />} />
                <Redirect to='/catalog' />
            </Switch>
        );
    }
    return (
        <Switch>
            <Route path='/catalog' exact>
                <Catalog />
            </Route>
            <Route path='/catalog/:id' render={(params) => <Product id={params.match.params.id} userData={userData} />} />
            <Redirect to='/catalog' />
        </Switch >
    );
};

export default useRoutes;