import React, { Component } from 'react';
import { DetailedReport } from './DetailedReport';

export class Report extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <DetailedReport/>
            </div>
        );
    }
}
