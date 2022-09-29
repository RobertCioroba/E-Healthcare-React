import React from 'react'
import './Product.css';

const ProductItem = (props) => {
    console.log('Detail props:', props);

    function handleAddToCart(e) {
        props.parentAddToCartCallback(props.product.id);
        e.preventDefault();
    }

    return (
        <div className="card bg-light mb-3 col-sm-3 listProducts">
            <h5 className="card-header productTitle">{props.product.name}</h5>
            <h5 className="card-body">
                <p className="card-text">Company: <small className="card-text-detail">{props.product.companyName}</small></p>
                <p className="card-text">Price: <small className="card-text-detail">{props.product.price}</small></p>
                <p className="card-text">Quantity: <small className="card-text-detail">{props.product.quantity}</small></p>
                <p className="card-text">Uses: <small className="card-text-detail">{props.product.uses}</small></p>
                <p className="card-text">Expire: <small className="card-text-detail">{props.product.expireDate}</small></p>
            </h5>
            <div className="card-footer productComponents">
                <button className="btn btn-success addToCartBtn" type="button" onClick={handleAddToCart}>Add to cart</button>
            </div>
        </div>
    );
};

export default ProductItem;