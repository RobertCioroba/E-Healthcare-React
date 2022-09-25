import React, { Component } from 'react';
import { PostMedicineList } from './PostMedicineList';

export class Medicine extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <PostMedicineList/>
            </div>
        );
    }
}
