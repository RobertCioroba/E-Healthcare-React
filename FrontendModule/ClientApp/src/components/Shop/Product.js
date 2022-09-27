import React, { Component } from 'react';
import { ShopProducts } from './ShopProducts';

export class Product extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <ShopProducts />
            </div>
        );
    }
}
