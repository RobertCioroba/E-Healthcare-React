import React, { Component } from 'react';
import { DetailedFunds } from './DetailedFunds';

export class Funds extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <DetailedFunds />
            </div>
        );
    }
}
