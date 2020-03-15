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
    },
    layout: {
        width: '80vw',
    },
};

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: JSON.parse(localStorage.getItem('userData')),
        };
    }

    onExit() {
        localStorage.removeItem('userData');
        this.setState({
            userData: undefined,
        });
    }

    onLogin() {
        this.setState({
            userData: JSON.parse(localStorage.getItem('userData')),
        });
    }

    render() {
        const { classes } = this.props;
        
        return (
            <div className={classes.root}>
                <Header userData={this.state.userData} onLogin={this.onLogin.bind(this)} onExit={this.onExit.bind(this)} />
                <Box className={classes.layout}>
                    {useRoutes(this.state.userData && this.state.userData.isAdmin)}
                </Box>
            </div>
        );
    }
}

export default withStyles(styles)(Layout);