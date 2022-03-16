import React, { memo } from 'react';
import axios from 'axios';
import { API_END_POINT } from './Constants';
import './App.css';

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
            <div className="background" >
                <div className="content" >
                    <div className="image-container" >
                        <p>{"<<"}</p>
                        <img src={ url } className="img" />
                        <p>{">>"}</p>
                    </div>
                    <div className="fact-container" >
                        <p>{"<"}</p>
                        <div className="fact" >
                            <p>{ fact }</p>
                        </div>
                        <p>{">"}</p>
                    </div>
                </div>
            </div>
        );
    };

};

export default memo(App);