import React from 'react';
import { Link } from 'react-router';

export default class Top extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        let nav = (
                <div className="portal-nav-box">
                    <div className="portal-nav-logo">
                        <img src="image/demo/demo-portal-logo.png"/>
                    </div>
                    <div className="portal-nav-setting">
                        <img src="image/demo/demo-portal-setting.png"/>
                    </div>
                </div>
            );

        return (
            <div className="portal-nav">
                {nav}
            </div>

        );
    }
};
