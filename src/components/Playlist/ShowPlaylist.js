import React from 'react';
import { connect } from 'react-redux';

import { searchRegExp } from '../helpers';
import { createGql } from '../helpers';
import PlaylistTable from '../PlaylistTable/PlaylistTable'


const actionFindPlaylist = (payload) => ({type: 'FIND_PLAYLIST', payload})

const actionChoosePlaylist = (payload) => ({type: 'CHOOSEN_PLAYLIST', payload})

export function actionPromiseFindPlaylist (str) {
	// let gql = createGql ()
	// console.log(gql)
  const name = 'FIND_PLAYLIST'
  const promise = createGql().request(`query findPlaylist($query: String){
  PlaylistFind(query: $query){
     _id, name, tracks{ _id, url, originalFileName, id3{ artist, title}}
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
      	dispatch(actionFindPlaylist(payload))
    }
    catch (e) {
      dispatch(actionRejected(e))
    }
  }
}



class ShowPlaylist extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			playlistSearch: ''
		}

		this.onChange = this.onChange.bind(this)
	}

	onChange(e) {
		this.setState({[e.target.name]: e.target.value})
	}

	choosePlaylist(pl){
		console.log(this)
		this.props.choosePlaylist(pl)
	}

	render(){
		return(
			<div>
				<button onClick = {this.props.search.bind(this, this.state.playlistSearch)}>Find all playlists</button>
				<input 
					type="text" 
					value = {this.state.playlistSearch}
					name="playlistSearch"
					onChange = {this.onChange}/>
				<p>Playlists</p>
				{this.props.findedPlaylists === undefined ? null : this.props.findedPlaylists.map(item => <PlaylistTable playlists={item} func={this.choosePlaylist.bind(this, item)}/>)}
			</div>
		)
	}
}

function mapStateToProps (store) {
	return {
		findedPlaylists: store.playlists.findPlaylist
	}
}

function mapDispatchToProps(dispatch){
	return{
		search: (str) => (dispatch(actionPromiseFindPlaylist(str))),
		choosePlaylist: (pl) => (dispatch(actionChoosePlaylist(pl)))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowPlaylist)