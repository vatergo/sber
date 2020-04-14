import React, { Component } from 'react';
import axios from 'axios';
import Loading from './Loading';
import { List, ListItem, ListItemText } from '@material-ui/core';


class ListOfStudents extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            data: [],
            loading: true,
        });
    }

    componentDidMount() {
        axios.get('/api/students')
            .then((result) => this.setState({
                data: result.data,
                loading: false,
            }))
            .catch((er) => console.error(er));
    }

    render() {
        const { selected, onClick } = this.props;
        const { loading, data } = this.state;
        const listItems = data.map((item, i) => (<ListItem
            key={item._id}
            selected={selected === i}
            onClick={() => onClick(item, i)}
            button>
            <ListItemText primary={item.name} />
        </ListItem>));
        return (
            <>
                {loading
                    ? <Loading />
                    : <List component="nav">
                        {listItems}
                    </List>}
            </>
        );
    }
}

export default ListOfStudents;