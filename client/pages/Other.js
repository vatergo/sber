import React, { Component } from 'react';
import { Grid, Snackbar, Typography, IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import DataGrid, { Column, Editing, Form, Popup, SearchPanel } from 'devextreme-react/data-grid';
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
        axios.get(`/api/students/filter?userId=${this.props.userData.userId}`)
            .then((result) => {
                if (result.data.length > 0) {
                    axios.get(`/api/info/filter?studentId=${result.data[0]._id}`)
                        .then((result2) => this.setState({
                            dataInfo: result2.data,
                            dataStudents: result.data,
                            selectedStudent: result.data[0]._id,
                        }))
                        .catch((er) => this.setState({
                            snackbar: er.response.data.message,
                        }));
                } else {
                    this.setState({
                        dataStudents: result.data,
                    });
                }
            })
            .catch((er) => this.setState({
                snackbar: er.response.data.message,
            }));
    }

    componentDidMount() {
        axios.get(`/api/students/filter?userId=${this.props.userData.userId}`)
            .then((result) => {
                if (result.data.length > 0) {
                    axios.get(`/api/info/filter?studentId=${result.data[0]._id}`)
                        .then((result2) => this.setState({
                            dataInfo: result2.data,
                            dataStudents: result.data,
                            selectedStudent: result.data[0]._id,
                        }))
                        .catch((er) => this.setState({
                            snackbar: er.response.data.message,
                        }));
                } else {
                    this.setState({
                        dataStudents: result.data,
                    });
                }
            })
            .catch((er) => this.setState({
                snackbar: er.response.data.message,
            }));
    }

    onStudentsRowClick({ data }) {
        axios.get(`/api/info/filter?studentId=${data._id}`)
            .then((result) => this.setState({
                selectedStudent: data._id,
                dataInfo: result.data,
            }))
            .catch((er) => this.setState({
                snackbar: er.response.data.message,
            }));
    }

    onAddStudent({ data }) {
        axios.post('/api/students', { name: data.name, userId: this.props.userData.userId })
            .then((result) => {
                this.loadData();
                this.setState({
                    snackbar: 'Студент добавлена'
                });
            })
            .catch((er) => this.setState({
                snackbar: er.response.data.message,
            }));
    }

    onAddInfo({ data }) {
        axios.post('/api/Info', {
            studentId: this.state.selectedStudent,
            photo: data.photo,
            birthday: data.birthday,
            address: data.address,
            education: data.education,
            info: data.info,
            diplom: data.diplom,
        }).then((result) => {
            this.loadData();
            this.setState({
                snackbar: 'Информация добавлена'
            });
        }).catch((er) => this.setState({
            snackbar: er.response.data.message,
        }));
    }

    onUpdateStudent({ data }) {
        axios.patch('/api/students', data)
            .then((result) => {
                this.loadData();
                this.setState({
                    snackbar: 'Имя изменено'
                });
            })
            .catch((er) => this.setState({
                snackbar: er.response.data.message,
            }));
    }

    onUpdateInfo({ data }) {
        axios.patch('/api/Info', data)
            .then((result) => {
                this.loadData();
                this.setState({
                    snackbar: 'Информация обновлена'
                });
            })
            .catch((er) => this.setState({
                snackbar: er.response.data.message,
            }));
    }

    onDeleteStudent({ key }) {
        axios.delete('/api/students', { data: { _id: key } })
            .then((result) => {
                this.setState({
                    dataStudents: this.state.data.filter((item) => item._id !== result.data._id),
                    snackbar: er.response.data.message,
                });
            })
            .catch((er) => this.setState({
                snackbar: er.response.data.message,
            }));
    }

    onDeleteInfo({ key }) {
        axios.delete('/api/Info', { data: { _id: key } })
            .then((result) => {
                this.setState({
                    dataInfo: this.state.data.filter((item) => item._id !== result.data._id),
                    snackbar: er.response.data.message,
                });
            })
            .catch((er) => this.setState({
                snackbar: er.response.data.message,
            }));
    }

    render() {
        const { classes } = this.props;
        const { dataStudents, dataInfo, snackbar } = this.state;
        return (
            <>
                <Grid container spacing={3} className={classes.root}>
                    <Grid item xs={3}>
                        <Typography className={classes.titleDataGrid}>Студент</Typography>
                        <DataGrid
                            className={classes.table}
                            keyExpr="_id"
                            hoverStateEnabled={true}
                            dataSource={dataStudents || []}
                            selection={{ mode: 'single' }}
                            onRowClick={this.onStudentsRowClick.bind(this)}
                            showBorders={true}
                            showColumnLines={true}
                            showRowLines={true}
                            onRowInserted={this.onAddStudent.bind(this)}
                            onRowUpdated={this.onUpdateStudent.bind(this)}
                            onRowRemoved={this.onDeleteStudent.bind(this)}>
                            <SearchPanel visible={true}
                                width={0}
                                placeholder="Поиск..." />
                            <Editing
                                mode="popup"
                                allowUpdating={true}
                                allowDeleting={true}
                                allowAdding={dataStudents && dataStudents.length === 0}
                                useIcons={true}>
                                <Popup title="Студент" showTitle={true} width={350} height={250} />
                                <Form>
                                    <Item dataField="name" colSpan={2} />
                                </Form>
                            </Editing>
                            <Column dataField='name' caption='ФИО' />
                        </DataGrid>
                    </Grid>
                    <Grid item xs={9}>
                        <Typography className={classes.titleDataGrid}>Информация</Typography>
                        <DataGrid
                            className={classes.table}
                            keyExpr="_id"
                            hoverStateEnabled={true}
                            selection={{ mode: 'single' }}
                            dataSource={dataInfo || []}
                            showBorders={true}
                            showRowLines={true}
                            showColumnLines={true}
                            onRowInserted={this.onAddInfo.bind(this)}
                            onRowUpdated={this.onUpdateInfo.bind(this)}
                            onRowRemoved={this.onDeleteInfo.bind(this)}>
                            <SearchPanel visible={true}
                                width={240}
                                placeholder="Поиск..." />
                            <Editing
                                mode="popup"
                                allowUpdating={true}
                                allowDeleting={true}
                                allowAdding={true}
                                useIcons={true}>
                                <Popup title="Информация" showTitle={true} width={700} height={400} />
                                <Form>
                                    <Item dataField="photo" colSpan={2} />
                                    <Item dataField="birthday" colSpan={2} />
                                    <Item dataField="address" colSpan={2} />
                                    <Item dataField="education" colSpan={2} />
                                    <Item dataField="info" colSpan={2} />
                                    <Item dataField="diplom" colSpan={2} />
                                </Form>
                            </Editing>
                            <Column dataField='photo' width={65} allowSorting={false} caption='Фото' cellRender={cellRender} />
                            <Column dataField='birthday' dataType='date' caption='Дата рождения' />
                            <Column dataField='address' caption='Адрес' />
                            <Column dataField='education' caption='Образование' />
                            <Column dataField='info' caption='О себе' />
                            <Column dataField='diplom' caption='О дипломе' />
                        </DataGrid>
                    </Grid>
                </Grid>
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    open={!!snackbar}
                    autoHideDuration={15000}
                    onClose={() => this.setState({ snackbar: '' })}
                    message={snackbar}
                    action={
                        <React.Fragment>
                            <IconButton size="small" aria-label="close" color="inherit" onClick={() => this.setState({ snackbar: '' })}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </React.Fragment>
                    } />
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