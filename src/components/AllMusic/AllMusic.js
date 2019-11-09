import React from 'react';
import { store, createGql } from '../SignUp/LoginForm';
import { connect } from 'react-redux';
import SongTable from '../SongTable/SongTable';
import Playlist from '../Playlist/Playlist'



const actionAddMusic = (payload) => ({type: 'GET_MUSIC', payload})



export function actionPromiseGetMusic () {
	// let gql = createGql ()
	// console.log(gql)
  const name = 'ALL_MUSIC'
  const promise = createGql().request(`query findTrack{
  TrackFind(query: "[{}]"){
    _id, originalFileName, url, owner {login}, id3{
      title
    }
  }
}`)

  const actionPending    = () => ({ type: 'PROMISE', status: 'PENDING', payload: null,name, error: null })
  const actionResolved    = payload => ({ type: 'PROMISE', status: 'RESOLVED', payload,name, error: null })
  const actionRejected    = error => ({ type: 'PROMISE', status: 'REJECTED', payload: null,name, error })
  return async dispatch => {
    dispatch(actionPending())
    try {
      let payload = await promise 
      console.log(payload)
      dispatch(actionResolved(payload))
      	dispatch(actionAddMusic(payload))
    }
    catch (e) {
      dispatch(actionRejected(e))
    }
  }
}



store.dispatch(actionPromiseGetMusic())





// class AllMusic extends React.Component {
// 	constructor(props){
// 		super(props)

// 		this.choose = this.choose.bind(this)
// 	}

// 	choose(e){
// 		console.log(e._id)
// 	}

// 	render(){
// 		return(
// 			<div>
// 					{this.props.allMusic && this.props.allMusic.map(item => <SongTable key = {item._id} songName = {item} duration = "0.00" onClick ={this.choose.bind(this, item)}/>)}
				
// 			</div>
// 		)
// 	}
// }

class AllMusic extends React.Component {
	constructor(props){
		super(props)

		this.choose = this.choose.bind(this)
	}

	choose(e){
		console.log(e._id)
	}

	render(){
		return(
			<div>
				<Playlist songs = {this.props.allMusic} func={this.choose}/>			
			</div>
		)
	}
}

function mapStateToProps (store) {
	return {
		allMusic: store.music.allMusic
	}
}


// class AllMusicPage extends React.Component{
// 	componentDidMount(){
// 		this.props.getAllMusicList()
// 	}
// 	render(){
// 		return (
// 			<PlayList allMusic ={this.props.list} />
// 		)
// 	}
// }

// AllMusicPage = connect(s => ({list: s.list}), {getAllMusicList})


export default connect(mapStateToProps)(AllMusic)

{/*<div onClick = {this.onClick.bind(this, item)}>{item.originalFileName} {item.url}</div>*/}