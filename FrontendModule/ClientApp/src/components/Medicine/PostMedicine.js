import React from 'react'
import './Medicine.css';

const PostMedicine = (props) => {
    console.log('Detail props:', props);

    function handleEdit(e) {
        props.parentEditCallback(props.post);
        e.preventDefault();
    }

    function handleDelete(e) {
        props.parentDeleteCallback(props.post.id);
        e.preventDefault();
    }

    return (
        <div className="card bg-light mb-3 col-sm-3 listProducts">
            <h5 className="card-header productTitle">{props.post.name }</h5>
            <h5 className="card-body">
                <p className="card-text">Company: <small className="card-text-detail">{ props.post.companyName}</small></p>
                <p className="card-text">Price: <small className="card-text-detail">{props.post.price}</small></p>
                <p className="card-text">Quantity: <small className="card-text-detail">{props.post.quantity}</small></p>
                <p className="card-text">Uses: <small className="card-text-detail">{props.post.uses}</small></p>
                <p className="card-text">Expire: <small className="card-text-detail">{props.post.expireDate}</small></p>
            </h5>
            <div className="card-footer">
                <button className="btn btn-sm btn-success"
                    type="button" onClick={handleEdit}>Edit</button>&nbsp;&nbsp;
                <button className="btn btn-sm btn-danger actionBtn"
                    type="button" onClick={handleDelete}>Delete</button>
            </div>
        </div>
        );
};

export default PostMedicine;