import React, { Component } from 'react';
import { DetailedProfile } from './DetailedProfile';

export class Profile extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <DetailedProfile />
            </div>
        );
    }
}
