import React, { Component } from 'react';

export class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: 0
        };
    }

    async handleSave() {
        let item = {
            email: this.state.email,
            password: this.state.password
        }

/*        const response = await fetch('/api/authentication/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'text/plain'
            },
            body: JSON.stringify(item)
        });*/

        fetch('/api/authentication/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        }).then(response => response)
            .then(data => {
                console.log(data.status);
                let jwtToken = data.json();
                console.log(jwtToken.jwtToken);
                console.log(jwtToken.userName);
                console.log(jwtToken.userId);
            }).catch((error) => {
                console.error('Error', error);
            });
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
                                <form>
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
                                    <button onClick={() => this.handleSave()} className="btn btn-success actionBtn">Add</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}