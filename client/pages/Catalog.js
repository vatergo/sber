import React, { Component } from 'react';
import { Grid, withStyles } from '@material-ui/core';
import Categories from './Categories';
import Products from './Products';

class Catalog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCategory: {},
        };
    }

    onSelectCategory(item, i) {
        this.setState({
            selectedCategory: { index: i, ...item },
        })
    }

    render() {
        const { classes } = this.props;
        const { selectedCategory } = this.state;
        return (
            <>
                <Grid container>
                    <Grid item xs={3} className={classes.categories}>
                        <Categories selected={selectedCategory.index} onClick={this.onSelectCategory.bind(this)} />
                    </Grid>
                    <Grid item xs={9} className={classes.products}>
                        <Products selected={selectedCategory._id} />
                    </Grid>
                </Grid>
            </>
        );
    }
}

const styles = {
    categories: {
        paddingRight: 5,
    },
    products: {
        display: 'flex',
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
    }
};


export default withStyles(styles)(Catalog);