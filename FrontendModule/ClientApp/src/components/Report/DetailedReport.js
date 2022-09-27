import React, { Component } from 'react';
import './Report.css';

export class DetailedReport extends Component {
    constructor() {
        super();
        this.handleFormSubmit = this.handleFormSubmit.bind(this);

        this.state = {
            reportSettings: {
                sales: false,
                stock: false,
                range: 'total'
            },
            range: [
                { code: 'weekly', name: 'Weekly' },
                { code: 'monthly', name: 'Monthly' },
                { code: 'yearly', name: 'Yearly' }
            ],
            loadingMedicines: false,
            loadingOrders: false,
            medicines: [],
            orders: []
        };
    }

    renderRange() {
        return this.state.range.map((range) => {
            return <option key={range.code} value={range.code}>{range.name}</option>;
        });
    }

    handleSalesChange = (e) => {
        console.log('sales:', e.target.value);
        const reportSettings = this.state.reportSettings;
        var result = document.getElementById("sales").checked;
        if(result)
            this.setState({ reportSettings: { ...reportSettings, sales: true } });
        else
            this.setState({ reportSettings: { ...reportSettings, sales: false } });
    }

    handleStockChange = (e) => {
        console.log('stock:', e.target.value);
        const reportSettings = this.state.reportSettings;
        var result = document.getElementById("stock").checked;
        if (result)
            this.setState({ reportSettings: { ...reportSettings, stock: true } });
        else
            this.setState({ reportSettings: { ...reportSettings, stock: false } });
    }

    handleRangeChange = (e) => {
        console.log('range:', e.target.value);
        const reportSettings = this.state.reportSettings;
        this.setState({ reportSettings: { ...reportSettings, range: e.target.value } });
    }

    handleFormSubmit(event) {
        event.preventDefault();
        console.log('this:', this);
        console.log('Report generated:', this.state.reportSettings);
        let url = 'api/medicine/generateReport/' + this.state.reportSettings.sales + '/' + this.state.reportSettings.stock + '/' + this.state.reportSettings.range;
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.post)
        }).then(response => response.json())
            .then(data => {
                this.state.medicines = data.medicines;
                this.state.orders = data.orders;
                console.log(this.state.medicines);
                console.log(this.state.orders);

                if (this.state.medicines.length !== 0)
                    this.setState({loadingOrders: true})
                if (this.state.orders.length !== 0)
                    this.setState({ loadingMedicines: true })

                this.renderSales(this.state.orders);
                this.renderStock(this.state.medicines);
            }).catch((error) => {
                console.error('Error', error);
            });
    }

    renderForm() {
        return (
            <div className="addForm">
                <div className="col-sm-4">
                    <h3 className="formTitle">Reports generator</h3>
                    <div className="card bg-light row">
                        <div className="card-body reportSettings">
                            <form onSubmit={this.handleFormSubmit}>
                                <label class="switch">
                                    <input type="checkbox" className="form-control" id="sales" name="sales"
                                        value={this.state.reportSettings.sales} onChange={this.handleSalesChange} />
                                        <span class="slider round"></span>
                                </label>
                                <label htmlFor="productName">Sales</label>
                                <label class="switch">
                                    <input type="checkbox" className="form-control" id="stock" name="stock"
                                        value={this.state.reportSettings.stock} onChange={this.handleStockChange} />
                                    <span class="slider round"></span>
                                </label>
                                <label htmlFor="companyName">Stock</label>

                                <div className="form-group">
                                    <label htmlFor="category">Range</label>
                                    <select required className="form-control" id="range" name="range" value={this.state.reportSettings.range}
                                        onChange={this.handleRangeChange}>
                                        <option value=""></option>
                                        {this.renderRange()}
                                    </select>
                                </div>
                                <br />
                                <button type="submit" className="btn btn-success actionBtn">Generate</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderSales(orders) {
        if (this.state.loadingOrders == false)
            return (<div className="col-sm-12 reportInfo"><p><em>No sales on selected period...</em></p></div>)
        else {
            return (
                <table className="table table-striped">
                    <thead>
                        <th>Order id</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>User</th>
                        <th>Email</th>
                        <th>Date of birth</th>
                        <th>Phone</th>
                        <th>Address</th>
                    </thead>
                    <tbody>
                        {orders.map(order =>
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.placedOn}</td>
                                <td>{order.totalAmount}</td>
                                <td>{order.status}</td>
                                <td>{order.user.firstName} {order.user.lastName}</td>
                                <td>{order.user.email}</td>
                                <td>{order.user.dateOfBirth}</td>
                                <td>{order.user.phone}</td>
                                <td>{order.user.address}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            );
        }
    }

    renderStock(medicines) {
        if (this.state.loadingMedicines == false)
            return (<div className="col-sm-12 reportInfo"><p><em>No medicines on selected period...</em></p></div>)
        else {
            return (
                <table className="table table-striped">
                    <thead>
                        <th>Product</th>
                        <th>Company name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Uses</th>
                        <th>Expire date</th>
                    </thead>
                    <tbody>
                        {medicines.map(medicine =>
                            <tr key={medicine.id}>
                                <td>{medicine.name}</td>
                                <td>{medicine.companyName}</td>
                                <td>{medicine.price}</td>
                                <td>{medicine.quantity}</td>
                                <td>{medicine.uses}</td>
                                <td>{medicine.expireDate}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            );
        }
    }


    render() {
        return (
            <div>
                {this.renderForm()}
                {this.renderSales(this.state.orders)}
                {this.renderStock(this.state.medicines)}
            </div>
        );
    }
}