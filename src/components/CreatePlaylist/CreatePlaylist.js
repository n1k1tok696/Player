import React from 'react';
import AllMusic from '../AllMusic/AllMusic'
import { connect } from 'react-redux';
import { store, createGql } from '../SignUp/LoginForm';

import SongTable from '../SongTable/SongTable';
import PlayList from '../Playlist/Playlist'
import ShowPlaylist from '../Playlist/ShowPlaylist'



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




export function actionPromiseFindPlaylist (str) {
	// let gql = createGql ()
	// console.log(gql)
  const name = 'FIND_PLAYLIST'
  const promise = createGql().request(`query findPlaylist($query: String){
  PlaylistFind(query: $query){
     name, tracks{ _id, url, id3{ artist, title}}
  }
}`, {query: searchRegExp(str)})

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





class CreatePlaylist extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			musicSearch: '',
			playlistSearch: ''
		}

		this.tracks = []

		this.onChange = this.onChange.bind(this)
		this.onChangePlaylist = this.onChangePlaylist.bind(this)
		this.searchPlaylist = this.searchPlaylist.bind(this)
		this.search = this.search.bind(this)
		this.choose = this.choose.bind(this)
	}

	onChange(e) {
		this.setState({[e.target.name]: e.target.value})
		this.search(e.target.value)

	}

	onChangePlaylist(e) {
		this.setState({[e.target.name]: e.target.value})
		this.searchPlaylist()

	}

	searchPlaylist(){
		this.props.findPlaylist(this.state.playlistSearch)
	}

	search(str){
		this.props.queryTrack(str)
	}

	choose(target){
		console.log(target)
		this.tracks.push(target)
		console.log(this.tracks)

	}

	render(){
		return(
			<div>
				<p>Choose songs</p>
				<input type="text" 
						value = {this.state.musicSearch}
						name="musicSearch"
						onChange = {this.onChange}
				/>
				<p>Name of playlist</p>
				<input type="text" 
						value = {this.state.playlistSearch}
						name="playlistSearch"
						onChange = {this.onChangePlaylist}
				/>
				<button onClick ={() => {}}>Create</button>
				<button onClick ={this.props.searchPlaylist}>Find all playlist</button>
				<div>
					<PlayList songs={this.props.findMusic ? this.props.findMusic : this.props.allMusic} func={this.choose}/>
				</div>
			</div>
		)
	}
}

function searchRegExp(str) {
  return JSON.stringify([{$or:[
  		{originalFileName: "/" + str.trim().split(/\s+/).join('|') + "/"},
  		{"id3.album": "/" + str.trim().split(/\s+/).join('|') + "/"},
  		{name: "/" + str.trim().split(/\s+/).join('|') + "/"}
]}])
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
		findPlaylist: (str) => (dispatch(actionPromiseFindPlaylist(str)))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePlaylist)

// {this.props.findMusic === undefined ? <AllMusic /> : this.props.findMusic.map(item => <SongTable key = {item._id} songName = {item} duration = "0.00" onClick ={this.choose.bind(this, item)}/>)}