import React from 'react'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createGql } from '../helpers';

function actionPromiseRegistration (login, passw) {
  const name = 'REGISTRATION'
  // let gql = createGql ()
  // console.log(gql)
  const promise = createGql().request(`mutation reg($login:String!, $password:String!) {
  createUser(login: $login, password: $password) {
    _id, login   
  }
}`, {login: login, password: passw})

  const actionPending    = () => ({ type: 'PROMISE', status: 'PENDING', payload: null,name, error: null })
  const actionResolved    = payload => ({ type: 'PROMISE', status: 'RESOLVED', payload,name, error: null })
  const actionRejected    = error => ({ type: 'PROMISE', status: 'REJECTED', payload: null,name, error })
  return async dispatch => {
    dispatch(actionPending())
    try {
      let payload = await promise 
      dispatch(actionResolved(payload))
    }
    catch (e) {
      dispatch(actionRejected(e))
    }
  }
}

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
	this.props.send(this.state.username, this.state.password)
	// if (this.props.isUser){
	// 	console.log(1)
	// 	Router.history.push('/')
	// }
}

	render(){

		if (!isEmpty(this.props.isUser)) {
			return <Redirect to="/" />
		} 

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
					autoComplete="off"
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
					autoComplete="off"
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
					autoComplete="off"
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

function isEmpty(obj) {
	for(let key in obj) {
		return false
	}
	return true
}

function mapStateToProps(store){
	return {
		isUser: store.token
	}
}

function mapDispatchToProps(dispatch){
	return {
		send: (login, passw) => dispatch(actionPromiseRegistration(login, passw))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm)