import React, { Component } from 'react';
import { DetailedRegister } from './DetailedRegister';

export class Register extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <DetailedRegister />
            </div>
        );
    }
}
