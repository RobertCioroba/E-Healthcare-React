import React, { Component } from 'react';

export class OrderDetailed extends Component {
    constructor() {
        super();

        this.state = {
            loadingOrders: true,
            orders: [],
            userId: 3005,
        };
    }

    componentDidMount() {
        this.populateOrderData();
    }

    async populateOrderData() {
        const response = await fetch('api/order/getOrdersByUser/' + this.state.userId);
        const data = await response.json();
        data.forEach(setStatus);
        function setStatus(item, index) {
            if (item.status == 0)
                item.status = "New";
            else if (item.status == 1)
                item.status = "In progress";
            else
                item.status = "Completed";
        }

        this.setState({ orders: data, loadingOrders: false });
        console.log(data);
    }

    renderOrders() {
        if (this.state.loadingOrders)
            return (<div className="col-sm-8 loadingResult"><p ><em>Loading orders...</em></p></div>)
        else if (this.state.orders.length == 0)
            return (<div className="col-sm-8 cartTitle"><p><em>Your have no order...</em></p></div>)
        else {
            return (
                <div className="cartComponents">
                    <div className="col-sm-6">
                        <h1 className="cartTitle">Order history</h1>
                        <table className="table table-striped">
                            <thead>
                                <th className="th">Placed on</th>
                                <th className="th">Total</th>
                                <th className="th">Status</th>
                            </thead>
                            <tbody>
                                {this.state.orders.map(order =>
                                    <tr key={order.id}>
                                        <td className="td">{order.placedOn}</td>
                                        <td className="td">{order.totalAmount} RON</td>
                                        <td className="td">{order.status}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                </div>
            );
        }
    }

    render() {
        return (
            <div>
                {this.renderOrders()}
            </div>
        );
    }
}