import React, { Component } from 'react';
import { Grid, withStyles, Typography, withTheme, Paper } from '@material-ui/core';
import ListOfStudents from './ListOfStudents';
import Info from './Info';

class Students extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedStudent: undefined,
        };
    }

    onSelectStudent(item, i) {
        this.setState({
            selectedStudent: { index: i, ...item },
        })
    }

    render() {
        const { classes } = this.props;
        const { selectedStudent } = this.state;
        return (
            <>
                <Grid container className={classes.root}>
                    <Grid item xs={3} className={classes.list}>
                        <ListOfStudents
                            selected={selectedStudent ? selectedStudent.index : undefined}
                            onClick={this.onSelectStudent.bind(this)} />
                    </Grid>
                    <Grid item xs={9} className={classes.info}>
                        {selectedStudent
                            ? <Info selected={selectedStudent} />
                            : <div className={classes.empty}>
                                <Typography align='center' variant="h5" component="h2">
                                    Выберите студента
                            </Typography>
                            </div>}
                    </Grid>

                </Grid>
            </>
        );
    }
}

const styles = {
    root: {
        background: 'white',
        height: 'calc(100vh - 138px)',
        marginTop: 8,
        border: '1px solid',
        borderRadius: 4,
    },
    list: {
        paddingRight: 5,
    },
    info: {
        flexWrap: 'wrap',
        maxHeight: 'calc(100vh - 130px)',
        overflowY: 'scroll',
        '&::-webkit-scrollbar': {
            width: 6,
        },
        '&::-webkit-scrollbar-track': {
            borderRadius: 4,
        },
        '&::-webkit-scrollbar-thumb': {
            borderRadius: 4,
            background: 'transparent',
        },
        '&:hover': {
            '&::-webkit-scrollbar-thumb': {
                background: '#757575',
            },
        }
    },
    empty: {
        marginTop: 8,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
};


export default withStyles(styles)(Students);