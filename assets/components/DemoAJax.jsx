import React, { Component } from 'react'
import ListElement from './ListElement'
import axios from 'axios'

export default class DemoAJax extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            loading: true
        }
    }

    componentDidMount() {
        this.getUsers();
    }

    getUsers() {
        axios.get('https://127.0.0.1:8000/api/test').then(users => {
            this.setState({users: users.data, loading: false});
        });
    }

    render() {
        const list = [];

        for (let i = 0; i < this.state.users.length; i++) {
            list.push(<ListElement key={i} name={this.state.users[i].name} description={this.state.users[i].description} />);
        }

        return (
            <div>
                Detail page.s
                {list}
            </div>
        )
    }
}
