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
                <Grid container spacing={3}>
                    <Grid item xs={3}>
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
    products: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
};


export default withStyles(styles)(Catalog);