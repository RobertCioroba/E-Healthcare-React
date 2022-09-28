import React, { Component } from 'react';
import { DetailedCart } from './DetailedCart';

export class Cart extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <DetailedCart />
            </div>
        );
    }
}
