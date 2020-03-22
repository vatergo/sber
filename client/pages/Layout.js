import React, { Component } from 'react';
import Header from './Header';
import Categories from './Categories';
import { withStyles } from '@material-ui/core/styles';

import ruMessages from "devextreme/localization/messages/ru.json";
import { locale, loadMessages } from "devextreme/localization";

import useRoutes from '../routes';
import { Box } from '@material-ui/core';

const styles = {
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    header: {
        width: '100%',
        background: 'white',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
    },
    layout: {
        width: 1090,
    },
};

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: JSON.parse(localStorage.getItem('userData')),
        };
        loadMessages(ruMessages);
        locale(navigator.language);
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
                <div className={classes.header}>
                    <Header userData={this.state.userData} onLogin={this.onLogin.bind(this)} onExit={this.onExit.bind(this)} />
                </div>
                <Box className={classes.layout}>
                    {useRoutes(this.state.userData)}
                </Box>
            </div>
        );
    }
}

export default withStyles(styles)(Layout);