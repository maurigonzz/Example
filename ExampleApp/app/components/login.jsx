import React from 'react';
import { Router, Route, Link, hashHistory, IndexRoute  } from 'react-router';
import './login.scss';
import * as firebase from 'firebase';

export default class Login extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			email : '',
			password : ''
		}
	
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
	}




	handleEmailChange(event){
		this.setState({ email : event.target.value});
		//console.log(this.state.email);
	}

	handlePasswordChange(event){
		this.setState({ password : event.target.value});
	}

	handleLoginSubmit(event){
		console.log(this.state.email);
		var user = {
			email : this.state.email,
			password : this.state.password
		}

		this.props.signIn(user);
	}

	render(){
		return(
			<div className="col-md-12">
		      <form className="form-signin" onSubmit={this.handleLoginSubmit}>
		        <h2 className="form-signin-heading">Login</h2>
		        
		        <label htmlFor="inputEmail" className="sr-only">Email address</label>
		        <input type="email" id="inputEmail" className="form-control" value={this.state.email} onChange={this.handleEmailChange} placeholder="Email address" required autoFocus/>
		        
		        <label htmlFor="inputPassword" className="sr-only">Password</label>
		        <input type="password" id="inputPassword" className="form-control"  value={this.state.password} onChange={this.handlePasswordChange} placeholder="Password" required/>
		        
		        <div className="checkbox">
		          <label>
		            <input type="checkbox" value="remember-me"/> Remember me
		          </label>
		        </div>
		        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
		      </form>
		    </div>
		);
	}
}