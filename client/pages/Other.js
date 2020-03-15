import React, { Component } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, Snackbar, DialogTitle, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';

class Other extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: '',
            addCategory: false,
            product: '',
            addProduct: false,
            snackbar: ''
        }
    }

    onAddCategory() {
        axios.post('/api/categories', { name: this.state.category })
            .then((result) => this.setState({
                snackbar: result.data.message,
            }))
            .catch((er) => this.setState({
                snackbar: er.response.data.message,
            }));
    }

    onAddProduct() {
        axios.post('/api/products', this.state.product)
            .then((result) => this.setState({
                snackbar: result.data.message,
            }))
            .catch((er) => this.setState({
                snackbar: er.response.data.message,
            }));
    }

    render() {
        const { classes } = this.props;
        const { category, addCategory, product, addProduct, snackbar } = this.state;
        return (
            <>
                <Button onClick={() => this.setState({ addCategory: true })}>Добавить новую категорию</Button>
                <Button onClick={() => this.setState({ addProduct: true })}>Добавить новый продукт</Button>
                <Dialog
                    open={addCategory}>
                    <DialogTitle>
                        Добавление новой категории
                        <IconButton className={classes.closeButton} onClick={() => this.setState({ addCategory: false, category: '' })}>
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent className={classes.content}>
                        <TextField
                            value={category}
                            variant='outlined'
                            fullWidth
                            label="Название"
                            onChange={({ target }) => this.setState({ category: target.value })} />
                    </DialogContent>
                    <DialogActions className={classes.actions}>
                        <Button
                            onClick={this.onAddCategory.bind(this)}
                            variant='contained'
                            color="secondary"
                            disabled={!category}>
                            Добавить категорию
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={addProduct}>
                    <DialogTitle>
                        Добавление нового товара
                        <IconButton className={classes.closeButton} onClick={() => this.setState({ addProduct: false, product: {} })}>
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent className={classes.content}>
                        <TextField
                            value={product.name}
                            variant='outlined'
                            fullWidth
                            label="Название"
                            onChange={({ target }) => this.setState({ product: { ...product, name: target.value } })} />
                        <TextField
                            value={product.description}
                            variant='outlined'
                            fullWidth
                            label="Описание"
                            onChange={({ target }) => this.setState({ product: { ...product, description: target.value } })} />
                        <TextField
                            value={product.src}
                            variant='outlined'
                            fullWidth
                            label="Ссылка на изображение"
                            onChange={({ target }) => this.setState({ product: { ...product, src: target.value } })} />
                        <TextField
                            value={product.cost}
                            variant='outlined'
                            fullWidth
                            label="Стоимость"
                            onChange={({ target }) => this.setState({ product: { ...product, cost: target.value } })} />
                        <TextField
                            value={product.categoryId}
                            variant='outlined'
                            fullWidth
                            label="ID категории"
                            onChange={({ target }) => this.setState({ product: { ...product, categoryId: target.value } })} />
                    </DialogContent>
                    <DialogActions className={classes.actions}>
                        <Button
                            onClick={this.onAddProduct.bind(this)}
                            variant='contained'
                            color="secondary"
                            disabled={!product}>
                            Добавить товар
                        </Button>
                    </DialogActions>
                </Dialog>
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    open={!!snackbar}
                    autoHideDuration={3000}
                    onClose={() => this.setState({ snackbar: '' })}
                    message={snackbar} />
            </>
        );
    }
}

const styles = {
    content: {
        width: 328,
    },
    actions: {
        padding: 20,
    },
    closeButton: {
        position: 'absolute',
        right: 7,
        top: 8,
    },
};

export default withStyles(styles)(Other);