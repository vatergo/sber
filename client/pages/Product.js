import React, { Component } from 'react';
import axios from 'axios';
import Loading from './Loading';
import { withStyles, Grid, Card, CardMedia, Typography, Button } from '@material-ui/core';


class Product extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            loading: true,
            product: [],
        });
    }

    componentDidMount() {
        axios.get(`/api/products/filter?_id=${this.props.match.params.id}`)
            .then((result) => this.setState({
                product: result.data[0],
                loading: false,
            }))
            .catch((er) => console.error(er));
    }

    render() {
        const { classes } = this.props;
        const { product, loading } = this.state;

        return (
            <>
                {loading
                    ? <Loading />
                    : <Grid container spacing={3} className={classes.container}>
                        <Grid item xs={6}>
                            <Card className={classes.card} variant='outlined'>
                                <CardMedia
                                    component='img'
                                    src={product.src}
                                    title={product.name}
                                />
                            </Card>
                        </Grid>
                        <Grid item xs={6} className={classes.info}>
                            <Typography variant="h5" component="h2">{product.name}</Typography>
                            <Typography className={classes.cost}>{product.cost}</Typography>
                            <Typography color="textSecondary" >{product.description || 'Это супур-пупер крутая продукция, обязательно приобрети её себе!'}</Typography>
                            <Button className={classes.button} variant="contained" color="primary" size="large">Добавить в корзину</Button>
                        </Grid>
                    </Grid>}
            </>
        );
    }
}

const styles = {
    container: {
        marginTop: 8,
    },
    card: {
        width: 500,
        height: 500,
    },
    cost: {
        color: '#d18193',
    },
    button: {
        marginTop: 8,
    },
};

export default withStyles(styles)(Product);