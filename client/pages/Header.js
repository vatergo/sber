import React, { Component } from 'react';
import logo from '../../public/logo.jpg';
import { Link } from 'react-router-dom';
import { withStyles, Button, IconButton } from '@material-ui/core';
import { Info } from '@material-ui/icons';
import Auth from './Auth';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenAuth: false,
        };
    }

    render() {
        const { classes, userData, onLogin, onExit } = this.props;
        const { isOpenAuth } = this.state;

        return (
            <>
                <div className={classes.header}>
                    <div className={classes.tools} style={{ justifyContent: 'flex-start' }}>
                        <Link to={'/students'}>
                            <img src={logo} alt='logo' className={classes.logo} />
                        </Link>
                    </div>

                    <div className={classes.tools} style={{ justifyContent: 'flex-end' }}>
                        {!userData
                            ? <Button
                                className={classes.auth}
                                onClick={() => this.setState({ isOpenAuth: true })}>
                                Авторизация
                        </Button>
                            : <Button
                                className={classes.auth}
                                onClick={onExit}>
                                Выйти
                        </Button>}
                        {userData && <Link to={'/about'}>
                            <IconButton>
                                <Info fontSize="large" />
                            </IconButton>
                        </Link>}
                    </div>
                </div>
                <div className={classes.divider}>.</div>
                <Auth isOpen={isOpenAuth} onLogin={onLogin} onClose={() => this.setState({ isOpenAuth: false })} />
            </>
        );
    }
}

const styles = {
    header: {
        background: 'white',
        width: 1090,
        height: 120,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    logo: {
        height: 120,
    },
    tools: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
    },
    divider: {
        width: '100%',
        height: 1,
        background: '#7c6d72',
    },
    link: {
        textDecoration: 'none',
        color: 'inherit',
    },
    auth: {
        color: 'inherit',
        textTransform: 'none',
        fontSize: 'medium',
    },
};

export default withStyles(styles)(Header);