import React, { Component } from 'react';
import SignInForm from '../../elements/signInForm/signInForm';
import ErrorElement from '../../elements/error/error';
import './signIn.css';

class SignInPage extends Component {
    render () {
      return (
        <div className="signInPage container">
            <div className="row main-block">
                <div className="col-md-4 offset-md-4"> 
                    <div className="row">
                        <div className="col-md-12"> 
                            <h1>Join chat</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12"> 
                            <SignInForm
                                onSignIn={this.props.onSignIn}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <br/>
                            <ErrorElement
                                errorMessage={this.props.errorMessage}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
      );
    }
  };
  
  export default SignInPage;
  