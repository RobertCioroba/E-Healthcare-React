import React, { Component } from 'react';
import ProductItem from './ProductItem';

export class ShopProducts extends Component {
    constructor() {
        super();

        this.state = {
            loadingProducts: true,
            userId: 3005,
            searchResult: true,
            products: []
        };
    }

    handleAddToCartCallback = (id) => {
        let url = 'api/cartItem/addCartItem/' + id + '/' + this.state.userId + '/1';
        fetch(url, {
            method: 'POST'
        }).then(response => response)
            .then(data => {
                console.log("Product added to the cart.");
                this.populateMedicineData();
            }).catch((error) => {
                console.error('Error', error);
            });
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

    async handleSearch() {
        var uses = document.getElementById("searchByUse").value;

        if (uses === "") {
            this.populateMedicineData();
        }
        else {
            let url = 'api/medicine/searchByUse/' + uses;
            const response = await fetch(url);
            const data = await response.json();
            if(data.length !== 0)
                this.setState({ products: data, loadingProducts: false, searchResult: true });
            else
                this.setState({ products: [], searchResult: false });

        }
    }
 
    renderProducts() {
        if (this.state.searchResult == false)
            return (<div className="col-sm-8"><p><em>No product found...</em></p></div>)
        if (this.state.loadingProducts)
            return (<p><em>Loding products...</em></p>)
        else if (this.state.products.length == 0)
            return (<div className="col-sm-8"><p><em>No products available...</em></p></div>)
        else {
            return (
                <div className="col-sm-16">
                    <h3 className="listTitle">Shop</h3>
                    <div className="searchByUse listParent">
                        <input type="search" id="searchByUse" placeholder="Search by use..." />
                        <button onClick={() => this.handleSearch()}>Search</button>
                    </div>
                    <br/>
                    <br/>
                    <div className="listParent">
                        {this.state.products.map((product) => {
                            return <ProductItem key={product.id} product={product}
                                parentAddToCartCallback={this.handleAddToCartCallback}/>
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