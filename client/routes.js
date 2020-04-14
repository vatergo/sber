import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Students from './pages/Students';
import About from './pages/Other';

const useRoutes = (userData) => {
    if (userData) {
        return (
            <Switch>
                <Route path='/students' exact>
                    <Students />
                </Route>
                <Route path='/about' exact>
                    <About userData={userData} />
                </Route>
                <Redirect to='/students' />
            </Switch>
        );
    }
    return (
        <Switch>
            <Route path='/students' exact>
                <Students />
            </Route>
            <Redirect to='/students' />
        </Switch >
    );
};

export default useRoutes;