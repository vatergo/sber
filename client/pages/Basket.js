import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import Loading from './Loading';
import { withStyles, Card, CardContent, CardMedia, Typography, Grid, Button, Snackbar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';


class Basket extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            data: [],
            loading: true,
            userData: props.userData,
            snackbar: false,
        });
        this.onDelete.bind(this);
    }

    componentDidMount() {
        const headers = this.state.userData ? { "Authorization": `Bearer ${this.state.userData.token}` } : {};
        Promise.all([
            axios.get('/api/basket', { headers }),
            axios.get('/api/products'),
        ]).then(([
            { data: basket },
            { data: products },
        ]) => {
            const productsInBasket = basket.map((item) => item.productId);
            this.setState({
                data: products.filter((item) => productsInBasket.includes(item._id)),
                loading: false,
            });
        }).catch((e) => console.error(e));
    }

    onDelete(productId) {
        const headers = this.state.userData ? { "Authorization": `Bearer ${this.state.userData.token}` } : {};
        axios.delete('/api/basket', { headers, data: { productId } })
            .then((result) => {
                this.setState({
                    data: this.state.data.filter((item) => item._id !== result.data.productId),
                });
            })
            .catch((er) => console.error(er));
    }

    onPurchase() {
        const { data } = this.state;
        this.setState({ snackbar: true });
        for (let i = 0; i < data.length; i++) {
            this.onDelete(data[i]._id);
        }
    }

    render() {
        const { classes } = this.props;
        const { loading, data, snackbar } = this.state;
        const products = data.length === 0
            ? <div className={classes.empty}>
                <Typography align='center' variant="h5" component="h2">
                    В корзине еще нет товаров
                </Typography>
            </div>
            : data.map((item, i) =>
                (<Card key={item._id} className={classes.card} variant='outlined'>
                    <Link to={`/catalog/${item._id}`} className={classes.link}>
                        <CardMedia
                            className={classes.media}
                            component='img'
                            src={item.src}
                            title={item.name}
                        />
                    </Link>
                    <CardContent className={classes.content}>
                        <Typography className={classes.title} align='right'>
                            {item.cost}
                        </Typography>
                        <CloseIcon className={classes.closeButton} onClick={() => this.onDelete(item._id)} />
                    </CardContent>
                </Card >
                ));
        return (
            <>
                <div className={classes.head}>
                    <Typography align='left' variant="h5" component="h2">
                        Корзина
                </Typography>
                    <Button className={classes.button}
                        onClick={this.onPurchase.bind(this)}
                        disabled={data.length === 0}
                        variant="contained"
                        color="primary"
                        size="large">
                        Оформить заказ
                    </Button>
                </div>
                <Grid className={classes.basket}>
                    {loading
                        ? <Loading />
                        : products}
                </Grid>
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    open={snackbar}
                    autoHideDuration={3000}
                    onClose={() => this.setState({ snackbar: false })}
                    message={'Заказ успешно оформлен'} />
            </>
        );
    }
}

const styles = {
    card: {
        height: 260,
        width: 260,
        marginTop: 8,
        marginRight: 8,
    },
    media: {
        height: '80%',
    },
    title: {
        fontSize: 15,
    },
    link: {
        textDecoration: 'none',
        color: 'inherit',
    },
    empty: {
        marginTop: 8,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    basket: {
        display: 'flex',
        flexWrap: 'wrap',
        height: 'calc(100vh - 171px)',
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
        },
    },
    content: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    closeButton: {
        cursor: 'pointer',
    },
    head: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    }
};

export default withStyles(styles)(Basket);