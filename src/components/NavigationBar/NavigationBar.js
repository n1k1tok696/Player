import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';

import NotLogged from '../NotLogged/NotLogged'

class NavigationBar extends React.Component {
	render(){
		return(
			<nav className="navbar">
				<Link to="/" >Main page</Link>
				<Link to="/signup" >Signup</Link>
				<Link to="/login" >Login</Link>
				<Link to="/about" >About</Link>
				<Link to="/addmusic" >Add music</Link>
				<NotLogged />
			</nav>
			)
	}
}

export default NavigationBar
