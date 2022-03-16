import React, { memo } from 'react';
import axios from 'axios';
import { API_END_POINT } from './Constants';

class App extends React.Component {

    constructor() {
        super();

        this.state = {
            url: "",
            fact: "",
        };
    };

    componentDidMount() {
        axios.get(API_END_POINT)
        .then((response) => {
            const { data: { url, facts: fact } } = response;
            this.setState({
                url: url,
                fact: fact,
            });
        }).catch((error) => {
            console.log(error);
        });
    };

    render() {
        const { url, fact } = this.state;
        return (
            <div>
                <img src={ url } />
                <h1>{ fact }</h1>
            </div>
        );
    };

};

export default memo(App);