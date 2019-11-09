import React from 'react'
import { connect }   from 'react-redux';


const actionLogout = () => ({type: 'LOGOUT'})

function NotLogged(props) {
	if (props.forLog) {
		return (		
		<div>
			<p>Hellow {props.user}!</p>
			<button onClick = {props.logOut}>Log out</button>
		</div>)
	}
	return (
		<p>please enter</p>
	)
}

function mapStateToProps(store){
	return{
		forLog: store.token.token,
		user: store.token.token ? store.token.data.sub.login : null
	}
}

function mapDispatchToProps(dispatch) {
	return {
		logOut: () => dispatch(actionLogout())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(NotLogged)
