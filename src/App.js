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
                        <button className="img-left-button" >{"<<"}</button>
                        <img src={ url } className="img" />
                        <button className="img-right-button" >{">>"}</button>
                    </div>
                    <div className="fact-container" >
                        <button className="fact-left-button" >{"Previous"}</button>
                        <div className="fact" >
                            <p>{ fact }</p>
                        </div>
                        <button className="fact-right-button" >{"Next"}</button>
                    </div>
                </div>
            </div>
        );
    };

};

export default memo(App);