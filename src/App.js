import React from 'react';
import './App.css';
import {Route, Redirect, Switch} from 'react-router-dom';
import {Provider}   from 'react-redux';
// import createHistory from "history/createBrowserHistory";
import jwt_decode from 'jwt-decode'

import MainPage from './components/MainPage/MainPage'
import About from './components/About/About'
import NavigationBar from './components/NavigationBar/NavigationBar'
import SignUp from './components/SignUp/SignUp'
import Login from './components/SignUp/LoginForm'
import AddMusic from './components/AddMusic/AddMusic'
import ShowPlaylist from './components/Playlist/ShowPlaylist'
import { store } from './components/SignUp/LoginForm'


// var decoded = jwt-decode();
// console.log(decoded);


// const gql = new GraphQLClient("/graphql", { headers: {} })

// gql.request(`query ZahodNaSite($login:String!, $password:String!){
//   login(login:$login,password:$password)
// }`, {login: "nik14_1", password: "nik123"}).then(result => console.log(result))

// gql.request(`query login{
//   login(login: "n1k14", password: "nik123")
// }`).then(result => console.log(1))

// const defaultState = {}

// let gqlReducer = (state, action) => {
//   if (state === undefined) {
//     return defaultState
//   }
//   if (action.type === 'LOGIN') {
//     localStorage.authToken = action.token
//     console.log("token  " + localStorage.authToken)
//     return {token: action.token, data: jwt_decode(action.token)}
//   }
//   if(action.type === 'LOGOUT') {
//     localStorage.removeItem('authToken')
//     console.log("token  " + localStorage.authToken)
//     return {}
//   }
//   return state
// }

// let promiseGqlReducer = (state, action) => {
//   const actions = {
//     PROMISE () {
//       const {status, name, payload, error} = action
//       return {
//         ...state,
//         [name]: {status, payload, error}
//       }
//     }
//   }
//   if (state === undefined){
//       return {}
//   }
//   if (action.type in actions) {
//     return actions[action.type]()
//   }
//   return state
// }

// const reducers = combineReducers({
//   token: gqlReducer,
//   promise: promiseGqlReducer
// })

// const store = createStore(reducers, applyMiddleware(thunk))

// const actionLogin = (token) => ({type: 'LOGIN', token})
// const actionLogout = () => ({type: 'LOGOUT'})

store.subscribe(() => console.log(store.getState()))


// const PrivateRoute = ({component: Component, ...rest}) => {
// 	<Route {...rest} render={(props) => (
// 			store.getState().token
// 			? <Component {...props} />
// 			: <Redirect to="/login" />
// 		)}
// 	/>
// }

const PrivateRoute = props =>  //обертка
<Route {...props}  //оригинальному роуту отдаются оригинальные пропсы...
    component={pageComponentProps => { //кроме оригинального компонента для отображения
        const PageComponent = props.component //достаем оригинальный компонент отображения
        console.log(pageComponentProps)
        if (localStorage.authToken) {//если токен завезли
            return ( //то рисуем компонент
                <PageComponent {...pageComponentProps}/>
            )}
        else { //иначе редирект
            return (
                <Redirect to={props.fallback} />
            )
        }
    }
}/>

function App() {
  return (
    <Provider store={store}>
		<div className="container">
		<NavigationBar />
			<Switch>
			    <PrivateRoute 
			        fallback="/login" 
			        path="/about" 
			        component = {About} />
                <PrivateRoute 
                    fallback="/login" 
                    path="/addmusic" 
                    component = {AddMusic} />
                <Route path="/find" component={ShowPlaylist} />
				<Route path="/" component={MainPage} exact />
				<Route path="/signup" component={SignUp} />
				<Route path="/login" component={Login} />
			</Switch>

		</div>
    </Provider>
  );
}

export default App;



