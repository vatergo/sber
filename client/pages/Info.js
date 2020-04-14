import React, { Component } from 'react';
import axios from 'axios';
import { withStyles, Grid, Card, CardMedia, Typography, Button, MenuItem, TextField } from '@material-ui/core';

function formatDate(date) {
    var dd = date.getDate();
    if (dd < 10) dd = '0' + dd;

    var mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    var yy = date.getFullYear() % 100;
    if (yy < 10) yy = '0' + yy;

    return dd + '.' + mm + '.' + yy;
}

class Info extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            data: undefined,
            currentVers: 0,
        });
        this.loadData = this.loadData.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.selected._id !== prevProps.selected._id) {
            this.loadData();
        }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        axios.get(`/api/info/filter?studentId=${this.props.selected._id}`)
            .then((result) => {
                if (result.data.length >= 0)
                    this.setState({
                        data: result.data,
                        currentVers: 0,
                    });
            })
            .catch((er) => console.error(er));
    }

    render() {
        const { classes, selected } = this.props;
        const { data, currentVers } = this.state;
        const currentData = data ? data[currentVers] : undefined;
        return (currentData
            ?
            <>
                <div className={classes.info}>
                    <Card className={classes.card} variant='outlined' >
                        <CardMedia
                            component='img'
                            src={currentData.photo}
                            title={selected.name}
                        />
                    </Card >
                    <div className={classes.nameBirthday}>
                        <Typography variant="h3" gutterBottom>
                            {selected.name}
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            {`Дата рождения: ${formatDate(new Date(currentData.birthday))}, Возраст: ${new Date().getYear() - new Date(currentData.birthday).getYear()}`}
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            {`Адрес: ${currentData.address}`}
                        </Typography>
                    </div>
                </div>
                <div className={classes.education}>
                    <Typography variant="h5" gutterBottom className={classes.title}>
                        Образование
                        </Typography>
                    <Typography variant="h6" gutterBottom>
                        {currentData.education}
                    </Typography>
                    <Typography variant="h5" gutterBottom className={classes.title}>
                        О себе
                        </Typography>
                    <Typography variant="body1" gutterBottom>
                        {currentData.info}
                    </Typography>
                    <Typography variant="h5" gutterBottom className={classes.title}>
                        Дипломная работа
                        </Typography>
                    <Typography variant="body1" gutterBottom>
                        {currentData.diplom}
                    </Typography>
                </div>
                {data.length > 1 &&
                    <TextField label="Версия резюме"
                        value={currentVers}
                        select
                        style={{ width: 100 }}
                        onChange={({ target }) => this.setState({
                            currentVers: target.value,
                        })}>
                        {data.map((item, i) => {
                            return <MenuItem value={i} key={item.photo}>{i + 1}</MenuItem>
                        })}
                    </TextField>}
            </>
            : <div className={classes.empty}>
                <Typography align='center' variant="h5" component="h2">
                    Студент еще не добавил информацию о себе
                </Typography>
            </div>
        );
    }
}

const styles = {
    info: {
        width: '100%',
        display: 'flex',
        marginBottom: 15,
    },
    card: {
        height: 260,
        width: 260,
        marginTop: 8,
        marginRight: 8,
        border: '1px solid #8e8e8e',
    },
    empty: {
        marginTop: 8,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100vh - 121px)',
    },
    education: {
        width: '100%',
    },
    title: {
        width: '100%',
        color: '#8e8e8e',
        borderBottom: '1px solid #8e8e8e',
    }
};

export default withStyles(styles)(Info);