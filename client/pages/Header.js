import React, { Component } from 'react';
import logo from '../../server/public/logo.jpg';
import { Link } from 'react-router-dom';
import { withStyles, Button, IconButton } from '@material-ui/core';
import { Instagram, AccountBox, ShoppingCart } from '@material-ui/icons';
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
                    <div className={classes.tools}>
                        <a href='https://www.instagram.com/wool_mary/' target="_blank" className={classes.link}>
                            <IconButton>
                                <Instagram fontSize="large" />
                            </IconButton>
                        </a>
                        <a href='https://vk.com/id171959132' target="_blank" className={classes.link}>
                            <IconButton>
                                <AccountBox fontSize="large" />
                            </IconButton>
                        </a>
                    </div>
                    <Link to={'/catalog'}>
                        <img src={logo} alt='logo' className={classes.logo} />
                    </Link>
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
                        <Link to={'/basket'}>
                            <IconButton>
                                <ShoppingCart fontSize="large" />
                            </IconButton>
                        </Link>

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
        width: '80vw',
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
        background: '#f0f0f0',
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