import React, { Component } from 'react';
import './Cart.css';

export class DetailedCart extends Component {
    constructor() {
        super();

        this.state = {
            loadingCartItems: true,
            cartItems: [],
            userId: 3005,
            totalAmount: 0
        };
    }

    componentDidMount() {
        this.populateCartData();
    }

    async populateCartData() {
        const response = await fetch('api/cartItem/getAllCartItems/' + this.state.userId);
        const data = await response.json();
        var total = 0;

        data.forEach(calculateTotal);
        function calculateTotal(item, index) {
            total = total + parseInt(item.product.price) * parseInt(item.quantity);
        }

        this.setState({ cartItems: data, loadingCartItems: false, totalAmount: total });
        console.log(data);
    }

    renderCartItems() {
        if (this.state.loadingCartItems)
            return (<p><em>Loading cart items...</em></p>)
        else if (this.state.cartItems.length == 0)
            return (<div className="col-sm-8 loadingResult"><p><em>Your cart is empty...</em></p></div>)
        else {
            return (
                <div className="cartComponents">
                    <div className="col-sm-6">
                        <h1 className="cartTitle">Cart</h1>
                            <table className="table table-striped">
                            <thead>
                                <th className="th">Product name</th>
                                <th className="th">Quantity</th>
                                <th className="th"></th>
                                <th className="th">Price</th>
                            </thead>
                                <tbody>
                                {this.state.cartItems.map(cartItem =>
                                    <tr key={cartItem.id}>
                                        <td className="td">{cartItem.product.name}</td>
                                        <td className="td">{cartItem.quantity}</td>
                                        <td className="td">*</td>
                                        <td className="td">{cartItem.product.price}</td>
                                        <td><button className="btn btn-danger">Remove</button></td>
                                    </tr>
                                    )}                                    
                            </tbody>
                        </table>
                        <div className="totalPrice">Total: {this.state.totalAmount} RON</div>
                        <br />
                        <div className="cartComponents">
                            <button className="btn btn-success checkoutBtn">Checkout</button>
                        </div>
                    </div>

                </div>
            );
        }
    }

    render() {
        return (
            <div>
                {this.renderCartItems()}
            </div>
        );
    }
}