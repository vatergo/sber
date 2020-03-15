import React, { Component } from 'react';
import { CircularProgress, withStyles } from '@material-ui/core';


class Loading extends Component {
    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <CircularProgress size={80} color="secondary" />
            </div>
        );
    }
}

const styles = {
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100vh - 121px)',
        width: '100%',
    },
};

export default withStyles(styles)(Loading);