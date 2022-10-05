import React, { Component } from 'react';
import axios from 'axios';
import jwt from "jwt-decode";

export class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    async handleSave() {
        let item = {
            email: this.state.email,
            password: this.state.password
        }

        var _headers = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        let result = await axios.post('/api/authentication/login', JSON.stringify(item), _headers);
        const token = result.data;

        const decodedToken = jwt(token);
        const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        const userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];

        console.log(role);
        console.log(userId);

        localStorage.setItem("token", role);
        localStorage.setItem("userId", userId);

        if (result.status === 200) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            window.location.href = '/product';
        }
        else
            delete axios.defaults.headers.common["Authorization"];
    }
        
    handleEmailChange = (value) => {
        this.setState({ email: value });
    }

    handlePasswordChange = (value) => {
        this.setState({ password: value })
    }

    render() {
        return (
            <div>
                <div className="addForm">
                    <div className="col-sm-4">
                        <h3 className="formTitle">Login</h3>
                        <div className="card bg-light row">
                            <div className="card-body reportSettings">
                                <div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input type="text" className="form-control" id="email" name="email"
                                            onChange={(e) => this.handleEmailChange(e.target.value)} required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" className="form-control" id="password" name="password"
                                            onChange={(e) => this.handlePasswordChange(e.target.value)} required />
                                    </div>
                                    <br />
                                    <button onClick={() => this.handleSave()} className="btn btn-success actionBtn">Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}