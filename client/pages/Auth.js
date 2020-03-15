import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, Button, Paper, Container, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';


class Auth extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;
        return (
            <Paper elevation={3} className={classes.form}>
                <TextField
                    fullWidth
                    label="Логин"
                />
                <TextField
                    fullWidth
                    label="Пароль"
                    type="password"
                />
                <Button className={classes.button}>
                    Войти
                </Button>
                <Button className={classes.button}>
                    Зарегистрироваться
                </Button>
            </Paper>
        );
    }
}

const styles = {
    form: {
        width: 350,
        padding: 25,
    },
};

export default withStyles(styles)(Auth);