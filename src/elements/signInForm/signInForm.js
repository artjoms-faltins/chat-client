import React, {Component} from 'react';

class SignInForm extends Component {
    
    render() {
        return (
            <form action="/" className="signInForm" onSubmit={this.props.onSignIn}>
                <div className="form-group">
                    <input type="text" className="form-control" id="username" placeholder="Display name" name="username" autoFocus/>
                    <small id="emailHelp" className="form-text text-muted">Please enter your display name.</small>
                </div>
                
                <button type="submit" className="btn btn-primary">Sign In</button>
            </form>
        );
    }
}

export default SignInForm;