import React from 'react';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
// import { promiseMusicReducer } from '../AllMusic/AllMusic';
import {Redirect} from 'react-router-dom';


import jwt_decode from 'jwt-decode'
import { GraphQLClient } from 'graphql-request'

export function createGql () {
  let gql
  if (localStorage.authToken) {
     gql = new GraphQLClient("/graphql", { headers: {Authorization: "Bearer " + localStorage.authToken}})
  } else {
     gql = new GraphQLClient("/graphql", { headers: {}})
  }
  return gql
}


// const gql = new GraphQLClient("/graphql", { headers: {} })

const defaultState = {}





function actionPromiseGetOneMusic () {
	// let gql = createGql ()
	// console.log(gql)
  const name = 'ONE_MUSIC'
  const promise = createGql().request(`query f($query: String){
  TrackFindOne(query: $query){
  _id, id3{
    title
  }}
}`, {query: JSON.stringify([{_id: "5da4a800d5b9e276030947fc"}])})

  const actionPending    = () => ({ type: 'PROMISE', status: 'PENDING', payload: null,name, error: null })
  const actionResolved    = payload => ({ type: 'PROMISE', status: 'RESOLVED', payload,name, error: null })
  const actionRejected    = error => ({ type: 'PROMISE', status: 'REJECTED', payload: null,name, error })
  return async dispatch => {
    dispatch(actionPending())
    try {
      let payload = await promise 
      console.log(payload)
      dispatch(actionResolved(payload))
      // payload.login && dispatch(actionLogin(payload.login))
    }
    catch (e) {
      dispatch(actionRejected(e))
    }
  }
}






let gqlReducer = (state, action) => {
  if (state === undefined) {
    return defaultState
  }
  if (action.type === 'LOGIN') {
    localStorage.authToken = action.token
    console.log("token  " + localStorage.authToken)
    return {token: action.token, data: jwt_decode(action.token)}
  }
  if(action.type === 'LOGOUT') {
    localStorage.removeItem('authToken')
    console.log("token  " + localStorage.authToken)
    return {}
  }
  return state
}





let musicReducer = (state, action) => {
  if (state === undefined) {
    return {}
  }
  if (action.type === 'GET_MUSIC') {
    return {allMusic: action.payload.TrackFind}
  }
    if (action.type === 'FIND_MUSIC') {
      console.log(action.payload.TrackFind)
    return {
      ...state,
      findMusic: action.payload.TrackFind}
  }
  return state
}





let promiseGqlReducer = (state, action) => {
  const actions = {
    PROMISE () {
      const {status, name, payload, error} = action
      return {
        ...state,
        [name]: {status, payload, error}
      }
    }
  }
  if (state === undefined){
      return {}
  }
  if (action.type in actions) {
    return actions[action.type]()
  }
  return state
}





export const reducers = combineReducers({
  token: gqlReducer,
  music: musicReducer,
  promise: promiseGqlReducer
})





export const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))




store.dispatch(actionPromiseGetOneMusic())




const actionLogin = (token) => ({type: 'LOGIN', token})




if (localStorage.authToken){
	store.dispatch(actionLogin(localStorage.authToken))
}




function actionPromiseLogin (login, passw) {
  const name = 'LOGIN'
  // const promise = gql.request(`query login ($login: String!, $passw: String!) {
  //     login(login: $login, password: $passw)
  //   }`, {login, passw})

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
			password: ''
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
		console.log(username)
		console.log(password)

		store.dispatch(actionPromiseLogin(username, password))


		// let smth = gql.request(`query myfrontname($login: String!, $password: String!){
		//   login(login: $login, password: $password)
		// }`, {login: username, password: password})

		// console.log(smth)
	}

	render(){
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

export default Login