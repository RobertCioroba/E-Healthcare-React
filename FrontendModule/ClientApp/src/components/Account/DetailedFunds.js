import React, { Component } from 'react';
import './Account.css';

export class DetailedFunds extends Component {
    constructor() {
        super();
        this.handleFormSubmit = this.handleFormSubmit.bind(this);

        this.state = {
            loadingFunds: true,
            userId: localStorage.getItem("userId")
        };
    }

    componentDidMount() {
        this.populateFundsData();
    }

    async populateFundsData() {
        const response = await fetch('api/account/getAccountById/' + this.state.userId);
        const data = await response.json();
        this.setState({ funds: data, loadingFunds: false });
        console.log(data);
    }

    handleFormSubmit() {
        var accountNumber = document.getElementById("accountNumber").value;
        var money = document.getElementById("money").value;
        var url = '/api/account/addFunds/' + accountNumber + '/' + this.state.userId + '/' + money;

        fetch(url, {
            method: 'PUT'
        }).then(response => response)
            .then(data => {
                console.log("Money added");
                this.populateFundsData();
            }).catch((error) => {
                console.error('Error', error);
            });
    }

    renderFunds() {
        if (this.state.loadingFunds)
            return (<div className="col-sm-8 loadingResult"><p ><em>Loading funds...</em></p></div>)
        else {
            return (
                <div>
                    <h1 className="FundsTitle">Funds: {this.state.funds.amount} RON</h1>
                    <br/>
                    <div className="addForm">
                        <div className="col-sm-4"> 
                            <h3 className="formTitle">Adding funds</h3>
                            <div className="card bg-light row">
                                <div className="card-body reportSettings">
                                    <form onSubmit={this.handleFormSubmit}>
                                        <div className="form-group">
                                            <label htmlFor="accountNumber">Account</label>
                                            <input type="text" className="form-control" id="accountNumber" name="accountNumber"
                                                onChange={this.handleFirstNameChange} required/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="money">Money</label>
                                            <input type="text" className="form-control" id="money" name="money"
                                                onChange={this.handleFirstNameChange} required/>
                                        </div>
                                        <br />
                                        <button type="submit" className="btn btn-success actionBtn">Add</button>
                                    </form>
                                </div>
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
                {this.renderFunds()}
            </div>
        );
    }
}