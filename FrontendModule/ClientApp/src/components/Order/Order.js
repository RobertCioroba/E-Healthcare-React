import React, { Component } from 'react';
import { OrderDetailed } from './OrderDetailed';

export class Order extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <OrderDetailed />
            </div>
        );
    }
}
