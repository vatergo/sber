import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { useRoutes } from './routes';

ReactDOM.render(<Router basename={'/'}>
    {useRoutes(true)}
</Router>, document.getElementById('mount-point'));