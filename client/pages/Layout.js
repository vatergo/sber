import React, { Component } from 'react';
import Header from './Header';
import Categories from './Categories';
import { withStyles } from '@material-ui/core/styles';

import useRoutes from '../routes';
import { Box } from '@material-ui/core';

const styles = {
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: 'calc(100vh - 64px)',
    },
    layout: {
        width: '80vw',
    },
};

class Layout extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Header />
                <Box className={classes.layout}>
                    {useRoutes(true)}
                </Box>
            </div>
        );
    }
}

export default withStyles(styles)(Layout);