import React, { Component } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, Snackbar, DialogTitle, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';

class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            login: '',
            password: '',
        }
    }

    onLogin() {
        const { login, password } = this.state;
        axios.post('/api/auth/login', { login, password })
            .then((result) => {
                localStorage.setItem('userData', JSON.stringify(result.data));
                this.setState({ login: '', password: '', title: '' });
                this.props.onLogin();
                this.props.onClose();
            })
            .catch((er) => this.setState({
                title: er.response.data.message,
            }));
    }

    onRegister() {
        const { login, password } = this.state;
        axios.post('/api/auth/register', { login, password })
            .then((result) => this.setState({
                title: result.data.message,
            }))
            .catch((er) => this.setState({
                title: er.response.data.message,
            }));
    }

    onClose() {
        this.setState({ login: '', password: '', title: '' });
        this.props.onClose();
    }

    render() {
        const { classes, isOpen } = this.props;
        const { login, password, title } = this.state;
        return (
            <>
                <Dialog
                    open={isOpen}>
                    <DialogTitle>
                        Авторизация
                    <IconButton className={classes.closeButton} onClick={this.onClose.bind(this)}>
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent className={classes.content}>
                        <TextField
                            value={login}
                            variant='outlined'
                            fullWidth
                            label="Логин"
                            onChange={({ target }) => this.setState({ login: target.value })} />
                        <TextField
                            value={password}
                            style={{ marginTop: 10 }}
                            variant='outlined'
                            fullWidth
                            label="Пароль"
                            type="password"
                            onChange={({ target }) => this.setState({ password: target.value })} />
                    </DialogContent>
                    <DialogActions className={classes.actions}>
                        <Button
                            onClick={this.onLogin.bind(this)}
                            variant='contained'
                            color="secondary"
                            disabled={!(login.length > 6 && password.length > 6)}>
                            Войти
                </Button>
                        <Button
                            onClick={this.onRegister.bind(this)}
                            variant='contained'
                            color="primary"
                            disabled={!(login.length > 6 && password.length > 6)}>
                            Зарегистрироваться
                </Button>
                    </DialogActions>
                </Dialog>
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    open={!!title}
                    autoHideDuration={15000}
                    onClose={() => this.setState({ title: '' })}
                    message={title}
                    action={
                        <React.Fragment>
                            <IconButton size="small" aria-label="close" color="inherit" onClick={() => this.setState({ title: '' })}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </React.Fragment>
                    } />
            </>
        );
    }
}

const styles = {
    content: {
        width: 328,
    },
    actions: {
        padding: 20,
    },
    closeButton: {
        position: 'absolute',
        right: 7,
        top: 8,
    },
};

export default withStyles(styles)(Auth);