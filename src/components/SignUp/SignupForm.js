import React from 'react'

class SignupForm extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			username: '',
			password: '',
			passwordConfirmation: '',
		}
		this.onChange = this.onChange.bind(this)
		this.onSend = this.onSend.bind(this)
	}

onChange(e) {
	this.setState({[e.target.name]: e.target.value})
}

onSend() {
	console.log(this.state)
}

	render(){
		return(
			<>
				<h2>Are you ready!?!?!</h2>
				<div className="form-group">
				<label className="control-label">Username</label>
				<input
					value={this.state.username}
					type="text"
					name="username"
					className="form-control"
					onChange = {this.onChange}

				/>
				</div>
				<div className="form-group">
				<label className="control-label">Password</label>
				<input
					value={this.state.password}
					type="password"
					name="password"
					className="form-control"
					onChange = {this.onChange}

				/>
				</div>					
				<div className="form-group">
				<label className="control-label">PasswordConfirmation</label>
				<input
					value={this.state.passwordConfirmation}
					type="password"
					name="passwordConfirmation"
					className="form-control"
					onChange = {this.onChange}
				/>
				</div>
				<div className="form-group">
					<button 
					className="btn btn-primary btn-lg"
					onClick = {this.onSend}
					>
					Sign up</button>
				</div>
			</>
		)
	}
}





export default SignupForm