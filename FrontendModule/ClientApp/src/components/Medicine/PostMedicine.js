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
            <h5 className="card-header">{props.post.name }</h5>
            <h5 className="card-body">
                <p className="card-text">{ props.post.companyName}</p>
                <p className="card-text">{ props.post.price}</p>
                <p className="card-text">{ props.post.quantity}</p>
                <p className="card-text">{ props.post.uses}</p>
                <p className="card-text">{ props.post.expireDate}</p>
            </h5>
            <div className="card-footer">
                <button className="btn btn-sm btn-primary"
                    type="button" onClick={handleEdit}>Edit</button>&nbsp;&nbsp;
                <button className="btn btn-sm btn-danger actionBtn"
                    type="button" onClick={handleDelete}>Delete</button>
            </div>
        </div>
        );
};

export default PostMedicine;