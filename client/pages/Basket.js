import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import Loading from './Loading';
import {
    withStyles, Card, CardContent, CardMedia, Typography,
    Grid, Button, Snackbar, IconButton, Dialog, DialogContent, DialogActions, DialogTitle, TextField
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';


class Basket extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            data: [],
            loading: true,
            userData: props.userData,
            snackbar: false,
            openDialog: false,
            fio: '',
            address: '',
            phone: '',
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
        const { data, fio, address, phone } = this.state;
        const productsId = data.map((product) => product._id).join(', ');
        const orderInfo = `ФИО: ${fio}, Адрес: ${address}, Телефон: ${phone}`;
        const creationDate = new Date().toTimeString();
        const headers = this.props.userData ? { "Authorization": `Bearer ${this.props.userData.token}` } : {};
        this.setState({ openDialog: false });
        axios.post('/api/orders', { productsId, orderInfo, creationDate }, { headers })
            .then((result) => this.setState({ snackbar: true, fio: '', address: '', phone: '' }))
            .catch((er) => console.error(er));
        for (let i = 0; i < data.length; i++) {
            this.onDelete(data[i]._id);
        };
    }

    render() {
        const { classes } = this.props;
        const { loading, data, snackbar, openDialog, fio, address, phone } = this.state;
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
                        onClick={() => this.setState({ openDialog: true })}
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
                    autoHideDuration={15000}
                    onClose={() => this.setState({ snackbar: false })}
                    message={'Заказ успешно оформлен, в течение часа с вами свяжется наш менеджер'}
                    action={
                        <React.Fragment>
                            <IconButton size="small" aria-label="close" color="inherit" onClick={() => this.setState({ snackbar: false })}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </React.Fragment>
                    } />
                <Dialog
                    open={openDialog}>
                    <DialogTitle>
                        Заполните ваши данные
                        <IconButton className={classes.closeButtonDialog} onClick={() => this.setState({ openDialog: false })}>
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent className={classes.contentDialog}>
                        <TextField
                            className={classes.textfield}
                            value={fio}
                            variant='outlined'
                            fullWidth
                            label="ФИО"
                            onChange={({ target }) => this.setState({ fio: target.value })} />
                        <TextField
                            className={classes.textfield}
                            value={address}
                            variant='outlined'
                            fullWidth
                            label="Адрес"
                            onChange={({ target }) => this.setState({ address: target.value })} />
                        <TextField
                            className={classes.textfield}
                            value={phone}
                            variant='outlined'
                            fullWidth
                            label="Телефон"
                            onChange={({ target }) => this.setState({ phone: target.value })} />
                    </DialogContent>
                    <DialogActions className={classes.actions}>
                        <Button
                            onClick={this.onPurchase.bind(this)}
                            variant='contained'
                            color="secondary"
                            disabled={!(fio && address && phone)}>
                            Оформить заказ
                        </Button>
                    </DialogActions>
                </Dialog>
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
        border: '1px solid #7c6d72',
    },
    media: {
        width: '104%',
        marginTop: -4,
        marginLeft: -4,
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
        maxHeight: 'calc(100vh - 180px)',
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
        '&:hover': {
            color: '#7c6d72',
        },
    },
    head: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    contentDialog: {
        width: 400,
    },
    textfield: {
        marginBottom: 8,
    },
    actions: {
        padding: 20,
    },
    closeButtonDialog: {
        position: 'absolute',
        right: 7,
        top: 8,
    },
};

export default withStyles(styles)(Basket);