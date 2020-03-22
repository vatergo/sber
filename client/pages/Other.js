import React, { Component } from 'react';
import { Grid, Snackbar, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import DataGrid, { Column, Editing, Form, Popup, Lookup } from 'devextreme-react/data-grid';
import { Item } from 'devextreme-react/form';
import axios from 'axios';

import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';

class Other extends Component {
    constructor(props) {
        super(props);
        this.state = {
            snackbar: ''
        }
        this.loadData = this.loadData.bind(this);
    }

    loadData() {
        axios.get('/api/categories')
            .then((result) => this.setState({
                dataCategories: result.data,
            }))
            .catch((er) => this.setState({
                snackbar: er.response.data.message,
            }));
        if (this.state.selectedCategory) {
            axios.get(`/api/products/filter?categoryId=${this.state.selectedCategory}`)
                .then((result) => this.setState({
                    dataProducts: result.data,
                }))
                .catch((er) => this.setState({
                    snackbar: er.response.data.message,
                }));
        }
    }

    componentDidMount() {
        axios.get('/api/categories')
            .then((result) => this.setState({
                dataCategories: result.data,
            }))
            .catch((er) => this.setState({
                snackbar: er.response.data.message,
            }));
    }

    onCategoriesRowClick({ data }) {
        axios.get(`/api/products/filter?categoryId=${data._id}`)
            .then((result) => this.setState({
                selectedCategory: data._id,
                dataProducts: result.data,
            }))
            .catch((er) => this.setState({
                snackbar: er.response.data.message,
            }));
    }

    onAddCategory({ data }) {
        axios.post('/api/categories', { name: data.name })
            .then((result) => {
                this.loadData();
                this.setState({
                    snackbar: 'Категория успешно добавлена'
                });
            })
            .catch((er) => this.setState({
                snackbar: er.response.data.message,
            }));
    }

    onAddProduct({ data }) {
        axios.post('/api/products', {
            name: data.name,
            description: data.description,
            src: data.src,
            cost: data.cost,
            categoryId: data.categoryId,
        }).then((result) => {
            this.loadData();
            this.setState({
                snackbar: 'Товар успешно добавлен'
            });
        }).catch((er) => this.setState({
            snackbar: er.response.data.message,
        }));
    }

    onUpdateCategory({ data }) {
        axios.patch('/api/categories', data)
            .then((result) => {
                this.loadData();
                this.setState({
                    snackbar: 'Категория успешно обновлена'
                });
            })
            .catch((er) => this.setState({
                snackbar: er.response.data.message,
            }));
    }

    onUpdateProduct({ data }) {
        axios.patch('/api/products', data)
            .then((result) => {
                this.loadData();
                this.setState({
                    snackbar: 'Товар успешно обновлен'
                });
            })
            .catch((er) => this.setState({
                snackbar: er.response.data.message,
            }));
    }

    onDeleteCategory({ key }) {
        axios.delete('/api/categories', { data: { _id: key } })
            .then((result) => {
                this.setState({
                    dataCategories: this.state.data.filter((item) => item._id !== result.data._id),
                    snackbar: er.response.data.message,
                });
            })
            .catch((er) => this.setState({
                snackbar: er.response.data.message,
            }));
    }

    onDeleteProduct({ key }) {
        axios.delete('/api/products', { data: { _id: key } })
            .then((result) => {
                this.setState({
                    dataProducts: this.state.data.filter((item) => item._id !== result.data._id),
                    snackbar: er.response.data.message,
                });
            })
            .catch((er) => this.setState({
                snackbar: er.response.data.message,
            }));
    }

    render() {
        const { classes } = this.props;
        const { dataCategories, dataProducts, snackbar } = this.state;
        return (
            <>
                <Grid container spacing={3} className={classes.root}>
                    <Grid item xs={3}>
                        <Typography className={classes.titleDataGrid}>Категории товаров</Typography>
                        <DataGrid
                            className={classes.table}
                            keyExpr="_id"
                            hoverStateEnabled={true}
                            dataSource={dataCategories || []}
                            selection={{ mode: 'single' }}
                            onRowClick={this.onCategoriesRowClick.bind(this)}
                            showBorders={true}
                            showColumnLines={true}
                            showRowLines={true}
                            onRowInserted={this.onAddCategory.bind(this)}
                            onRowUpdated={this.onUpdateCategory.bind(this)}
                            onRowRemoved={this.onDeleteCategory.bind(this)}>
                            <Editing
                                mode="popup"
                                allowUpdating={true}
                                allowDeleting={true}
                                allowAdding={true}
                                useIcons={true}>
                                <Popup title="Категория товара" showTitle={true} width={350} height={250} />
                                <Form>
                                    <Item dataField="name" colSpan={2} />
                                </Form>

                            </Editing>
                            <Column dataField='name' caption='Наименование' />
                        </DataGrid>
                    </Grid>
                    <Grid item xs={9}>
                        <Typography className={classes.titleDataGrid}>Товары</Typography>
                        <DataGrid
                            className={classes.table}
                            keyExpr="_id"
                            hoverStateEnabled={true}
                            selection={{ mode: 'single' }}
                            dataSource={dataProducts || []}
                            showBorders={true}
                            showRowLines={true}
                            showColumnLines={true}
                            onRowInserted={this.onAddProduct.bind(this)}
                            onRowUpdated={this.onUpdateProduct.bind(this)}
                            onRowRemoved={this.onDeleteProduct.bind(this)}>
                            <Editing
                                mode="popup"
                                allowUpdating={true}
                                allowDeleting={true}
                                allowAdding={true}
                                useIcons={true}>
                                <Popup title="Товар" showTitle={true} width={700} height={400} />
                                <Form>
                                    <Item dataField="name" colSpan={2} />
                                    <Item dataField="description" colSpan={2} />
                                    <Item dataField="src" colSpan={2} />
                                    <Item dataField="cost" colSpan={2} />
                                    <Item dataField="categoryId" colSpan={2} />
                                </Form>
                            </Editing>
                            <Column dataField='name' caption='Наименование' />
                            <Column dataField='description' caption='Описание' />
                            <Column dataField='src' width={65} allowSorting={false} caption='Изображение' cellRender={cellRender} />
                            <Column dataField='cost' caption='Стоимость' />
                            <Column dataField="categoryId" caption="Категория">
                                <Lookup dataSource={dataCategories} valueExpr="_id" displayExpr="name" />
                            </Column>
                        </DataGrid>
                    </Grid>
                </Grid>
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

function cellRender(data) {
    return (
        <img style={{ width: '50px', height: '50px', objectFit: 'cover' }} src={data.value} />
    );
}

const styles = {
    root: {
        background: 'white',
        height: 'calc(100vh - 138px)',
        marginTop: 8,
        border: '1px solid',
        borderRadius: 4,
    },
    table: {
        height: 'calc(100vh - 165px)',
    },
    titleDataGrid: {
        fontSize: '1.25rem',
        position: 'absolute',
        zIndex: 1000,
    },
};

export default withStyles(styles)(Other);