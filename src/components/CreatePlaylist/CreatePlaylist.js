import React from 'react';
import { connect } from 'react-redux';

import { searchRegExp } from '../helpers';
import { createGql } from '../helpers';
import Playlist from '../Playlist/Playlist'
import { actionPromiseGetMusic } from '../MainPage/MainPage'



const actionFindMusic = (payload) => ({type: 'FIND_MUSIC', payload})

export function actionPromiseFindMusic (str) {
	// let gql = createGql ()
	// console.log(gql)
  const name = 'FIND_MUSIC'
  const promise = createGql().request(`query findTrackByName($smth: String){
  TrackFind(query: $smth){
    _id, originalFileName, owner {login}, id3{title, album}
  }
}`, {smth: searchRegExp(str)})

  const actionPending    = () => ({ type: 'PROMISE', status: 'PENDING', payload: null,name, error: null })
  const actionResolved    = payload => ({ type: 'PROMISE', status: 'RESOLVED', payload,name, error: null })
  const actionRejected    = error => ({ type: 'PROMISE', status: 'REJECTED', payload: null,name, error })
  return async dispatch => {
    dispatch(actionPending())
    try {
      let payload = await promise 
      console.log(payload)
      dispatch(actionResolved(payload))
      	dispatch(actionFindMusic(payload))
    }
    catch (e) {
      dispatch(actionRejected(e))
    }
  }
}



export function actionPromiseChangePlaylist (str) {
	// let gql = createGql ()
	// console.log(gql)
  const name = 'CHANGE_PLAYLIST'
  const promise = createGql().request(`mutation RedPlaylistArr($searchPlaylist: PlaylistInput){
   PlaylistUpsert(playlist: $searchPlaylist)
  {_id, name, tracks{id3{artist, title}}}
 }`, {searchPlaylist: searchRegExp(str)})

  const actionPending    = () => ({ type: 'PROMISE', status: 'PENDING', payload: null,name, error: null })
  const actionResolved    = payload => ({ type: 'PROMISE', status: 'RESOLVED', payload,name, error: null })
  const actionRejected    = error => ({ type: 'PROMISE', status: 'REJECTED', payload: null,name, error })
  return async dispatch => {
    dispatch(actionPending())
    try {
      let payload = await promise 
      console.log(payload)
      dispatch(actionResolved(payload))
      	dispatch(actionFindMusic(payload))
    }
    catch (e) {
      dispatch(actionRejected(e))
    }
  }
}


export function actionPromiseCreatePlaylist (title, tracks) {
	// let gql = createGql ()
	// console.log(gql)
  const name = 'CREATE_PLAYLIST'
  const promise = createGql().request(`mutation newPlaylist($name: String, $tracks: [TrackInput]){ 
   PlaylistUpsert(playlist: { name: $name, tracks: $tracks})
   	{_id, name, tracks{id3{title}}}
 }`, {name: title, tracks: tracks})

  const actionPending    = () => ({ type: 'PROMISE', status: 'PENDING', payload: null,name, error: null })
  const actionResolved    = payload => ({ type: 'PROMISE', status: 'RESOLVED', payload,name, error: null })
  const actionRejected    = error => ({ type: 'PROMISE', status: 'REJECTED', payload: null,name, error })
  return async dispatch => {
    dispatch(actionPending())
    try {
      let payload = await promise 
      console.log(payload)
      dispatch(actionResolved(payload))
      	// dispatch(actionFindMusic(payload))
    }
    catch (e) {
      dispatch(actionRejected(e))
    }
  }
}



class CreatePlaylist extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			musicSearch: '',
			playlistSearch: ''
		}


		// this.check = true
		this.tracks = [] //написал отдельно чтоб при каждом добавлении трека не перерисовывался весь компонент

		this.onChange = this.onChange.bind(this)
		this.onChangePlaylist = this.onChangePlaylist.bind(this)
		this.search = this.search.bind(this)
		this.choose = this.choose.bind(this)
		// this.create = this.create.bind(this)
	}

	onChange(e) {
		this.setState({[e.target.name]: e.target.value})
		this.search(e.target.value)

	}

	onChangePlaylist(e) {
		this.setState({[e.target.name]: e.target.value})
		// this.searchPlaylist()

	}

	search(str){
		this.props.queryTrack(str)
	}

	choose({_id}){
		console.log(this)
		this.tracks.push({_id})
		console.log(this.tracks)

	}

	componentDidMount(){
		this.props.songs()
	}


	render(){
		return(
			<div>
				<p>Name of playlist</p>
				<input type="text" 
						value = {this.state.playlistSearch}
						name="playlistSearch"
						onChange = {this.onChangePlaylist}
				/>
				<p>Choose songs</p>
				<input type="text" 
						value = {this.state.musicSearch}
						name="musicSearch"
						autoComplete="off"
						onChange = {this.onChange}
				/>
				<button onClick ={this.props.createPl.bind(this, this.state.playlistSearch, this.tracks)}>Create</button>
				<div>
					<Playlist songs={this.props.findMusic ? this.props.findMusic : this.props.allMusic} func={this.choose} />
				</div>
			</div>
		)
	}
}



// function searchPlay(str) {
//   return str ? JSON.stringify([{$or:[{name: "/" + str.trim().split(/\s+/).join('|') + "/"}]}]) : null
// }

function mapStateToProps (store) {
	return {
		allMusic: store.music.allMusic,
		findMusic: store.music.findMusic
	}
}

function mapDispatchToProps(dispatch){
	return{
		queryTrack: (str) => (dispatch(actionPromiseFindMusic(str))),
		createPl: (title, tracks) => (dispatch(actionPromiseCreatePlaylist(title, tracks))),
		songs: () => (dispatch(actionPromiseGetMusic()))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePlaylist)

// {this.props.findMusic === undefined ? <AllMusic /> : this.props.findMusic.map(item => <SongTable key = {item._id} songName = {item} duration = "0.00" onClick ={this.choose.bind(this, item)}/>)}