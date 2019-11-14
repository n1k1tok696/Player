import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import jwt_decode from 'jwt-decode'

const defaultState = {}


let gqlReducer = (state, action) => {
  if (state === undefined) {
    return defaultState
  }
  if (action.type === 'LOGIN') {
    localStorage.authToken = action.token
    // console.log("token  " + localStorage.authToken)
    return {token: action.token, data: jwt_decode(action.token)}
  }
  if(action.type === 'LOGOUT') {
    localStorage.removeItem('authToken')
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


let playlistsReducer = (state, action) => {
  if (state === undefined) {
    return {}
  }
  if (action.type === 'FIND_PLAYLIST') {
    return {findPlaylist: action.payload.PlaylistFind}
  }
  if (action.type === 'CHOOSEN_PLAYLIST') {
    return {
      ...state,
      choosenPlaylist: action.payload}
  }
  if (action.type === 'COOSE_PLAYLIST_SONG') {
    return {
      ...state,
      choosePlaylistSong: action.payload}
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

const reducers = combineReducers({
  token: gqlReducer,
  music: musicReducer,
  playlists: playlistsReducer,
  promise: promiseGqlReducer
})

export const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))