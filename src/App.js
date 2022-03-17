import React, { memo } from 'react';
import axios from 'axios';
import { API_END_POINT } from './Constants';
import './App.css';

class App extends React.Component {

    data = {
        urls: [],
        facts: [],
    };

    constructor() {
        super();

        this.fetch = this.fetch.bind(this);
        this.onLeftButtonClick = this.onLeftButtonClick.bind(this);
        this.onRightButtonClick = this.onRightButtonClick.bind(this);
        this.isLeftButtonDisabled = this.isLeftButtonDisabled.bind(this);
        this.isRightButtonDisabled = this.isRightButtonDisabled.bind(this);
        this.state = {
            url: "",
            fact: "",
            position: -1,
        };
    };

    componentDidMount() {
        this.fetch();
    };

    fetch(left = false) {
        const { position } = this.state;
        const { urls, facts } = this.data;
        if(left) {
            this.setState({
                url: urls[position - 1],
                fact: facts[position - 1],
                position: position - 1,
            });
        }
       else if(position !== -1 && position < (urls.length - 1)) {
            this.setState({
                url: urls[position + 1],
                fact: facts[position + 1],
                position: position + 1,
            });
       }
       else {
            axios.get(API_END_POINT)
                .then((response) => {
                    const { data: { url, facts: fact } } = response;
                    if (fact.trim() === '') {
                        console.warn("Empty fact!");
                        this.fetch();
                    }
                    else {
                        urls.push(url);
                        facts.push(fact);
                        this.setState({
                            url: url,
                            fact: fact,
                            position: position + 1,
                        });
                    }
                }).catch((error) => {
                    console.log(error);
                });
       }
            
    };

    isLeftButtonDisabled() {
        const { position } = this.state;
        return position <= 0;
    };

    isRightButtonDisabled() {
        const { position } = this.state;
        return position >= 99;
    };

    onLeftButtonClick() {
        this.fetch(true);
    };

    onRightButtonClick() {
        this.fetch(false);
    };

    render() {
        const { url, fact } = this.state;

        return (
            <div className="background" >
                <div className="content" >
                    <div className="image-container" >
                        <button className={!this.isLeftButtonDisabled() ? "img-left-button" : "img-left-button disabled"} onClick={this.onLeftButtonClick} disabled={this.isLeftButtonDisabled()} >{"<<"}</button>
                        <div className="img-div" >
                            <img src={ url } className="img" />
                        </div>
                        <button className={!this.isRightButtonDisabled() ? "img-right-button" : "img-right-button disabled"} onClick={this.onRightButtonClick} disabled={this.isRightButtonDisabled()} >{">>"}</button>
                    </div>
                    <div className="fact-container" >
                        <div className="fact" >
                            <p>{ fact }</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

};

export default memo(App);