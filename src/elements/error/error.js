import React, { Component } from 'react';

class ErrorElement extends Component {
    render() {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <small><b>{this.props.errorMessage}</b></small>
                </div>
            );
        } else {
            return null;
        }
    }
}

export default ErrorElement;