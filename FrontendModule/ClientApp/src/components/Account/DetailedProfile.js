import React, { Component } from 'react';
import './Account.css';

export class DetailedProfile extends Component {
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
            userId: 3005,
        };
    }

    componentDidMount() {
        this.populateProfileData();
    }

    async populateProfileData() {
        const response = await fetch('api/user/getUserById/' + this.state.userId);
        const data = await response.json();
        this.setState({ profile: data, loadingProfileInfo: false });
        console.log(data);
    }


    handleFormSubmit(event) {
        event.preventDefault();
        console.log('this:', this);
        console.log('Edited user:', this.state.profile);

        fetch('api/user/editUser/' + this.state.userId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.profile)
        }).then(response => response)
            .then(data => {
                if (data.status === 204) {
                    this.populateProfileData();
                }
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
        if (this.state.loadingProfileInfo)
            return (<div className="col-sm-8 loadingResult"><p ><em>Loading...</em></p></div>)
        else {
            return (
                <div className="addForm">
                <div className="col-sm-4">
                    <h3 className="formTitle">Personal profile</h3>
                    <div className="card bg-light">
                        <div className="card-body">
                            <form onSubmit={this.handleFormSubmit}>
                                <div className="form-group">
                                    <label htmlFor="productName">First name</label>
                                    <input type="text" className="form-control" id="firstName" name="firstName"
                                       value={this.state.profile.firstName} onChange={this.handleFirstNameChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="companyName">Last name</label>
                                    <input type="text" className="form-control" id="lastName" name="lastName"
                                            value={this.state.profile.lastName} onChange={this.handleLastNameChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="price">Email</label>
                                    <input type="text" className="form-control" id="email" name="email"
                                            placeholder="Enter price" value={this.state.profile.email} onChange={this.handleEmailChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="quantity">Phone</label>
                                    <input type="text" className="form-control" id="phone" name="phone"
                                            placeholder="Enter quantity" value={this.state.profile.phone} onChange={this.handlePhoneChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="uses">Address</label>
                                    <input type="text" className="form-control" id="address" name="address"
                                            placeholder="Enter a use" value={this.state.profile.address} onChange={this.handleAddressChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="uses">Date of birth</label>
                                    <input type="date" className="form-control" id="dateOfBirth" name="dateOfBirth"
                                            value={this.state.profile.dateOfBirth} onChange={this.handleDateOfBirthChange} />
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
    }

    render() {
        return (
            <div>
                {this.renderProfileInfo()}
            </div>
        );
    }
}