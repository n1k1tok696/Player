import React from 'react';
import { Route } from 'react-router-dom';

import App from '../App';
// import MainPage from './MainPage/MainPage';
import SignUp from './SignUp/SignUp';

export default (
	<Route path="/" component={App}>
		<Route path="/" component={SignUp} exact/>
	</Route>
)