import React, { Component } from 'react';
import './Cart.css';

export class DetailedCart extends Component {
    constructor() {
        super();

        this.state = {
            loadingCartItems: true,
            cartItems: [],
            userId: localStorage.getItem("userId"),
            totalAmount: 0,
/*            cartItem: {
                id: 0,
                productID: 0,
                quantity: 0,
                cartID: 0
            }*/
        };
    }

    handleDelete(id) {
        fetch('api/cartItem/removeCartItem/' + id, {
            method: 'DELETE'
        }).then(response => response)
            .then(data => {
                console.log(data);
                this.populateCartData();
            }).catch((error) => {
                console.error('Error', error);
            });
    }

    handleCheckout(id) {
        fetch('/api/cart/checkout/' + id, {
            method: 'PUT'
        }).then(response => response)
            .then(data => {
                console.log("Order placed");
                this.populateCartData();
            }).catch((error) => {
                console.error('Error', error);
            });
    }

    handleEdit(id) {
        var quantity = document.getElementById(id).value;
        var url = '/api/cartItem/updateQuantity/' + id + '/' + quantity;
        fetch(url, {
            method: 'PUT'
        }).then(response => response)
            .then(data => {
                console.log("Cart updated");
                this.populateCartData();
            }).catch((error) => {
                console.error('Error', error);
            });
    }

    handleQuantityChange = (e) => {
        console.log('quantity:', e.target.value);
        var id = e.currentTarget.id;
        document.getElementById(id).setAttribute('value', e.target.value);
/*        const ceva = e._react
        const cartItem = document.getElementById(id);
        this.setState({ cartItem: { ...cartItem, quantity: e.target.value } });*/
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
            return (<div className="col-sm-8 loadingResult"><p ><em>Loading cart items...</em></p></div>)
        else if (this.state.cartItems.length == 0)
            return (<div className="col-sm-8 cartTitle"><p><em>Your cart is empty...</em></p></div>)
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
                                        <td className="td">
                                            <input type="text" className="form-control" id={cartItem.id} name="quantity"
                                                placeholder={cartItem.quantity} onChange={this.handleQuantityChange}/>
                                            
                                        </td>
                                        <td className="td">*</td>
                                        <td className="td">{cartItem.product.price} RON</td>
                                        <td><button className="btn btn-success" onClick={ () =>this.handleEdit(cartItem.id)}>Update</button></td>
                                        <td><button className="btn btn-danger" onClick={ () =>this.handleDelete(cartItem.id)}>Remove</button></td>
                                    </tr>
                                    )}                                    
                            </tbody>
                        </table>
                        <div className="totalPrice">Total: {this.state.totalAmount} RON</div>
                        <br />
                        <div className="cartComponents">
                            <button className="btn btn-success checkoutBtn" onClick={() => this.handleCheckout(this.state.userId)}>Checkout</button>
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