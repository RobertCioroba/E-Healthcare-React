import React, { Component } from 'react';
import './Account.css';

export class DetailedRegister extends Component {
    constructor() {
        super();

        this.handleFormSubmit = this.handleFormSubmit.bind(this);

        this.state = {
            loadingProfileInfo: true,
            profile: {
                id: 0,
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                address: '',
                dateOfBirth: ''
            },
            userId: localStorage.getItem("userId"),
        };
    }

    handleFormSubmit(event) {
        event.preventDefault();
        console.log('this:', this);
        console.log('User added:', this.state.profile);

        fetch('/api/authentication/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.profile)
        }).then(response => response)
            .then(data => {
                    document.getElementById("firstName").value = "";
                    document.getElementById("lastName").value = "";
                    document.getElementById("email").value = "";
                    document.getElementById("phone").value = "";
                    document.getElementById("password").value = "";
                    document.getElementById("dateOfBirth").value = "";
                    document.getElementById("address").value = "";
            }).catch((error) => {
                console.error('Error', error);
            });
    }


    handleFirstNameChange = (e) => {
        console.log('firstName:', e.target.value);
        const profile = this.state.profile;
        this.setState({ profile: { ...profile, firstName: e.target.value } });
    }

    handleLastNameChange = (e) => {
        console.log('lastName:', e.target.value);
        const profile = this.state.profile;
        this.setState({ profile: { ...profile, lastName: e.target.value } });
    }

    handleEmailChange = (e) => {
        console.log('email:', e.target.value);
        const profile = this.state.profile;
        this.setState({ profile: { ...profile, email: e.target.value } });
    }

    handlePasswordChange = (e) => {
        console.log('password:', e.target.value);
        const profile = this.state.profile;
        this.setState({ profile: { ...profile, password: e.target.value } });
    }

    handlePhoneChange = (e) => {
        console.log('phone:', e.target.value);
        const profile = this.state.profile;
        this.setState({ profile: { ...profile, phone: e.target.value } });
    }

    handleAddressChange = (e) => {
        console.log('address:', e.target.value);
        const profile = this.state.profile;
        this.setState({ profile: { ...profile, address: e.target.value } });
    }

    handleDateOfBirthChange = (e) => {
        console.log('dateOfBirth:', e.target.value);
        const profile = this.state.profile;
        this.setState({ profile: { ...profile, dateOfBirth: e.target.value } });
    }

    renderProfileInfo() {
        return (
            <div className="addForm">
                <div className="col-sm-4">
                    <h3 className="formTitle">Register</h3>
                    <div className="card bg-light">
                        <div className="card-body">
                            <form onSubmit={this.handleFormSubmit}>
                                <div className="form-group">
                                    <label htmlFor="productName">First name</label>
                                    <input type="text" className="form-control" id="firstName" name="firstName"
                                        placeholder="Enter first name" onChange={this.handleFirstNameChange} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="companyName">Last name</label>
                                    <input type="text" className="form-control" id="lastName" name="lastName"
                                        placeholder="Enter last name" onChange={this.handleLastNameChange} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="price">Email</label>
                                    <input type="text" className="form-control" id="email" name="email"
                                        placeholder="Enter email" onChange={this.handleEmailChange} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="price">Password</label>
                                    <input type="text" className="form-control" id="password" name="password"
                                        placeholder="Enter password" onChange={this.handlePasswordChange} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="quantity">Phone</label>
                                    <input type="text" className="form-control" id="phone" name="phone"
                                        placeholder="Enter phone number" onChange={this.handlePhoneChange} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="uses">Address</label>
                                    <input type="text" className="form-control" id="address" name="address"
                                        placeholder="Enter address" onChange={this.handleAddressChange} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="uses">Date of birth</label>
                                    <input type="date" className="form-control" id="dateOfBirth" name="dateOfBirth"
                                        onChange={this.handleDateOfBirthChange} required />
                                </div>
                                <br />
                                <button type="submit" className="btn btn-success actionBtn">Save</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.renderProfileInfo()}
            </div>
        );
    }
}