import React from 'react';
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { createGql } from '../helpers';
import { store } from '../redusers/redusers';

// const gql = new GraphQLClient("/graphql", { headers: {} })


// function actionPromiseGetOneMusic () {
// 	// let gql = createGql ()
// 	// console.log(gql)
//   const name = 'ONE_MUSIC'
//   const promise = createGql().request(`query f($query: String){
//   TrackFindOne(query: $query){
//   _id, id3{
//     title
//   }}
// }`, {query: JSON.stringify([{_id: "5da4a800d5b9e276030947fc"}])})

//   const actionPending    = () => ({ type: 'PROMISE', status: 'PENDING', payload: null,name, error: null })
//   const actionResolved    = payload => ({ type: 'PROMISE', status: 'RESOLVED', payload,name, error: null })
//   const actionRejected    = error => ({ type: 'PROMISE', status: 'REJECTED', payload: null,name, error })
//   return async dispatch => {
//     dispatch(actionPending())
//     try {
//       let payload = await promise 
//       console.log(payload)
//       dispatch(actionResolved(payload))
//       // payload.login && dispatch(actionLogin(payload.login))
//     }
//     catch (e) {
//       dispatch(actionRejected(e))
//     }
//   }
// }



const actionLogin = (token) => ({type: 'LOGIN', token})




if (localStorage.authToken){
	store.dispatch(actionLogin(localStorage.authToken))
}




function actionPromiseLogin (login, passw) {
  const name = 'LOGIN'
  let gql = createGql ()
  console.log(gql)
  const promise = gql.request(`query myfrontname($login: String!, $password: String!){
    login(login: $login, password: $password)
  }`, {login: login, password: passw})

  const actionPending    = () => ({ type: 'PROMISE', status: 'PENDING', payload: null,name, error: null })
  const actionResolved    = payload => ({ type: 'PROMISE', status: 'RESOLVED', payload,name, error: null })
  const actionRejected    = error => ({ type: 'PROMISE', status: 'REJECTED', payload: null,name, error })
  return async dispatch => {
    dispatch(actionPending())
    try {
      let payload = await promise 
      dispatch(actionResolved(payload))
      payload.login && dispatch(actionLogin(payload.login))
    }
    catch (e) {
      dispatch(actionRejected(e))
    }
  }
}





class Login extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			username: '',
			password: '',
			// tok: this.props.isUser
		}
		this.onChange = this.onChange.bind(this)
		this.onSend = this.onSend.bind(this)
	}

	onChange(e) {
		this.setState({[e.target.name]: e.target.value})

	}

	onSend() {
		let {username, password} = this.state
		// console.log(this.state)
		// console.log(username)
		// console.log(password)

		this.props.sendLog(username, password)

		// store.dispatch(actionPromiseLogin(username, password))
		// async function smth() {
		// 	await this.props.isUser
		// 	this.props.history.push("/find")
		// }
		// smth.call(this)


		// console.log(this.props.isUser)
		// setTimeout(() => {
		// 	if (!isEmpty(this.props.isUser)) {
		// 		console.log(this.props.isUser)
		// 		this.props.history.push("/find")
		// 	}
		// },1000)

		// if (!isEmpty(this.state.tok)) {
		// 	// console.log(this.props.isUser)
		// 	this.props.history.push("/find")
		// }

		


		// let smth = gql.request(`query myfrontname($login: String!, $password: String!){
		//   login(login: $login, password: $password)
		// }`, {login: username, password: password})

		// console.log(smth)
	}

	render(){

		if (!isEmpty(this.props.isUser)) {
			return <Redirect to="/" />
		}


		return (
			<>
				<h2>Login</h2>
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
				<label className="control-label">Password</label>
				<input
					value={this.state.password}
					type="text"
					name="password"
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
	return{
		isUser: store.token
	}
}

function mapDispathToProps(dispatch){
	return{
		sendLog: (username, password) => dispatch(actionPromiseLogin(username, password))
	}
} 

export default connect(mapStateToProps, mapDispathToProps)(Login)