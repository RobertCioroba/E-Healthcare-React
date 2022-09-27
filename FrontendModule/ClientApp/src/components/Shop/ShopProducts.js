﻿import React, { Component } from 'react';
import ProductItem from './ProductItem';

export class ShopProducts extends Component {
    constructor() {
        super();

        this.state = {
            loadingProducts: true,
            products: []
        };
    }

    componentDidMount() {
        this.populateMedicineData();
    }

    async populateMedicineData() {
        const response = await fetch('api/medicine/getAllMedicine');
        const data = await response.json();
        this.setState({ products: data, loadingProducts: false });
        console.log(data);
    }

    handleEditCallback = (postToEdit) => {
        this.setState({ post: postToEdit })
    }

    handleDeleteCallback = (postId) => {
        let postIndex = this.state.products.findIndex(p => p.id === postId)
        if (postIndex !== -1) {
            fetch('api/medicine/deleteMedicineById/' + postId, {
                method: 'DELETE'
            }).then(response => response)
                .then(data => {
                    let postsUpdated = this.state.products;
                    postsUpdated.splice(postIndex, 1);
                    this.setState({ posts: postsUpdated });
                }).catch((error) => {
                    console.error('Error', error);
                });
        }
    }
 
    renderProducts() {
        if (this.state.loadingProducts)
            return (<p><em>Loding products...</em></p>)
        else if (this.state.products.length == 0)
            return (<div className="col-sm-8"><p><em>No products available...</em></p></div>)
        else {
            return (
                <div className="col-sm-16">
                    <h3 className="listTitle">Shop</h3>
                    <div className="listParent">
                        {this.state.products.map((product) => {
                            return <ProductItem key={product.id} product={product}
                                parentEditCallback={this.handleEditCallback}
                                parentDeleteCallback={this.handleDeleteCallback} />
                        })}
                    </div>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                {this.renderProducts()}
            </div>
        );
    }
}