import React, { Component } from 'react';
import logo from '../../public/logo.jpg';
import { Link } from 'react-router-dom';
import { withStyles, Typography } from '@material-ui/core';
import { Instagram, AccountBox, ShoppingBasket } from '@material-ui/icons';

class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;
        return (
            <>
                <div className={classes.header}>
                    <div className={classes.tools}>
                        <a href='https://www.instagram.com/wool_mary/' target="_blank" className={classes.link}>
                            <Instagram fontSize="large" />
                        </a>
                        <a href='https://vk.com/id171959132' target="_blank" className={classes.link}>
                            <AccountBox fontSize="large" />
                        </a>
                    </div>
                    <Link to={'/catalog'}>
                        <img src={logo} alt='logo' className={classes.logo} />
                    </Link>
                    <div className={classes.tools} style={{ justifyContent: 'flex-end' }}>
                        <Typography className={classes.auth}>Авторизация</Typography>
                        <ShoppingBasket fontSize="large" />
                    </div>
                </div>
                <div className={classes.divider}>.</div>
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
        fontSize: 20,
        marginRight: 20,
    },
};

export default withStyles(styles)(Header);