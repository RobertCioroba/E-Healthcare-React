import React, { Component } from 'react';
import PostMedicine from './PostMedicine';

export class PostMedicineList extends Component {
    constructor() {
        super();

        this.handleFormSubmit = this.handleFormSubmit.bind(this);

        this.state = {
            loadingProducts: true,
            post: {
                id: 0,
                name: '',
                companyName: '',
                price: 0,
                quantity: 0,
                imageUrl: '',
                uses: '',
                expireDate: ''
            },
            postCleared: {
                id: 0,
                name: '',
                companyName: '',
                price: 0,
                quantity: 0,
                imageUrl: '',
                uses: '',
                expireDate: ''
            },
            posts: []
        };
    }

    componentDidMount() {
        this.populateMedicineData();
    }

    async populateMedicineData() {
        const response = await fetch('api/medicine/getAllMedicine');
        const data = await response.json();
        this.setState({ posts: data, loadingProducts: false });
        console.log(data);
    }

    handleEditCallback = (postToEdit) => {
        this.setState({ post: postToEdit })
    }

    handleDeleteCallback = (postId) => {
        let postIndex = this.state.posts.findIndex(p => p.id === postId)
        if (postIndex !== -1) {
            fetch('api/medicine/deleteMedicineById/' + postId, {
                method: 'DELETE'
            }).then(response => response)
                .then(data => {
                    let postsUpdated = this.state.posts;
                    postsUpdated.splice(postIndex, 1);
                    this.setState({ posts: postsUpdated });
                }).catch((error) => {
                    console.error('Error', error);
                });
        }
    }

    handleFormSubmit(event) {
        event.preventDefault();
        console.log('this:', this);
        console.log('Product added:', this.state.post);

        if (this.state.post.id === 0) {
            fetch('api/medicine/addMedicine', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.post)
            }).then(response => response.json())
                .then(data => {
                    let postsUpdated = this.state.posts;
                    postsUpdated.push(data);
                    this.setState({ post: this.state.postCleared, posts: postsUpdated })
                }).catch((error) => {
                    console.error('Error', error);
                });
        }
        else {
            fetch('api/medicine/updateMedicine/' + this.state.post.id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.post)
            }).then(response => response)
                .then(data => {
                    if (data.status === 204) {
                        let postIndex = this.state.posts.findIndex(p => p.id === this.state.post.id)
                        let postsUpdated = this.state.posts;
                        postsUpdated[postIndex] = this.state.post;
                        this.setState({ post: this.state.postCleared, posts: postsUpdated })
                    }
                }).catch((error) => {
                    console.error('Error', error);
                });
        }
    }

    handleProductNameChange = (e) => {
        console.log('productName:', e.target.value);
        const post = this.state.post;
        this.setState({ post: {...post, name: e.target.value}});
    }

    handleCompanyNameChange = (e) => {
        console.log('companyName:', e.target.value);
        const post = this.state.post;
        this.setState({ post: { ...post, companyName: e.target.value } });
    }

    handlePriceChange = (e) => {
        console.log('price:', e.target.value);
        const post = this.state.post;
        this.setState({ post: { ...post, price: e.target.value } });
    }

    handleQuantityChange = (e) => {
        console.log('quantity:', e.target.value);
        const post = this.state.post;
        this.setState({ post: { ...post, quantity: e.target.value } });
    }

    handleUsesChange = (e) => {
        console.log('uses:', e.target.value);
        const post = this.state.post;
        this.setState({ post: { ...post, uses: e.target.value } });
    }

    handleExpireDateChange = (e) => {
        console.log('expireDate:', e.target.value);
        const post = this.state.post;
        this.setState({ post: { ...post, expireDate: e.target.value } });
    }

    renderForm() {
        return (
            <div className="addForm">
            <div className="col-sm-4">
                <h3 className="formTitle">Add a medicine</h3>
                <div className="card bg-light">
                    <div className="card-body">
                        <form onSubmit={this.handleFormSubmit}>
                            <div className="form-group">
                                <label htmlFor="productName">Product name</label>
                                <input type="text" className="form-control" id="name" name="name"
                                    placeholder="Enter name" required value={this.state.post.name} onChange={this.handleProductNameChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="companyName">Company name</label>
                                <input type="text" className="form-control" id="companyName" name="companyName"
                                        placeholder="Enter name" required value={this.state.post.companyName} onChange={this.handleCompanyNameChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="price">Price</label>
                                <input type="text" className="form-control" id="price" name="price"
                                        placeholder="Enter price" required value={this.state.post.price} onChange={this.handlePriceChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="quantity">Quantity</label>
                                <input type="text" className="form-control" id="quantity" name="quantity"
                                        placeholder="Enter quantity" required value={this.state.post.quantity} onChange={this.handleQuantityChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="uses">Uses</label>
                                <input type="text" className="form-control" id="uses" name="uses"
                                        placeholder="Enter a use" required value={this.state.post.uses} onChange={this.handleUsesChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="uses">Expire date</label>
                                <input type="date" className="form-control" id="expireDate" name="expireDate"
                                        value={this.state.post.expireDate} required onChange={this.handleExpireDateChange}/>
                                </div>
                                <br/>
                            <button type="submit" className="btn btn-success actionBtn">Save</button>
                        </form>
                    </div>
                </div>
                </div>
            </div>
        );
    }

    renderPosts() {
        if (this.state.loadingProducts)
            return (<p><em>Loding products...</em></p>)
        else if (this.state.posts.length == 0)
            return (<div className="col-sm-8"><p><em>No products available...</em></p></div>)
        else {
            return (
                <div className="col-sm-16">
                    <h3 className="listTitle">Products</h3>
                    <div className="listParent">
                    {this.state.posts.map((post) => {
                        return <PostMedicine key={post.id} post={post}
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
                {this.renderForm()}
                {this.renderPosts()}
            </div>
        );
    }
}