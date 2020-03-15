import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import Loading from './Loading';
import { withStyles, Card, CardContent, CardMedia, Typography } from '@material-ui/core';


class Products extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            data: [],
            loading: true,
        });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.selected !== this.props.selected) {
            this.setState({ loading: true });
            axios.get(`/api/products/filter?categoryId=${this.props.selected}`)
                .then((result) => this.setState({
                    data: result.data,
                    loading: false,
                }))
                .catch((er) => console.error(er));
        }
    }

    componentDidMount() {
        axios.get('/api/products')
            .then((result) => this.setState({
                data: result.data,
                loading: false,
            }))
            .catch((er) => console.error(er));
    }

    render() {
        const { classes } = this.props;
        const { loading, data } = this.state;
        const products = data.length === 0
            ? <div className={classes.empty}>
                <Typography align='center' variant="h5" component="h2">
                    Товаров в данной категории пока нет
                </Typography>
            </div>
            : data.map((item, i) =>
                (<Link to={`/catalog/${item._id}`} key={item._id} className={classes.link}>
                    <Card className={classes.card} variant='outlined'>
                        <CardMedia
                            className={classes.media}
                            component='img'
                            src={item.src}
                            title={item.name}
                        />
                        <CardContent>
                            <Typography className={classes.title} align='right'>
                                {item.cost}
                            </Typography>
                        </CardContent>
                    </Card>
                </Link>));
        return (
            <>
                {loading
                    ? <Loading />
                    : products}
            </>
        );
    }
}

const styles = {
    card: {
        height: 260,
        width: 260,
        marginTop: 8,
    },
    media: {
        height: '80%',
    },
    title: {
        fontSize: 15,
    },
    link: {
        textDecoration: 'none',
    },
    empty: {
        marginTop: 8,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
};

export default withStyles(styles)(Products);