import React from 'react';
import { createGql } from '../helpers';
import { connect } from 'react-redux';

import Player from '../Player/Player'


const actionGetMusic = (payload) => ({type: 'GET_MUSIC', payload})



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
      	dispatch(actionGetMusic(payload))
    }
    catch (e) {
      dispatch(actionRejected(e))
    }
  }
}

class MainPage extends React.Component {

	componentDidMount(){
		this.props.allMusic()
	}

	render(){
		return(
			<Player />
		)

	}
}

function mapDispatchToProps(dispatch){
	return{
		allMusic: () => (dispatch(actionPromiseGetMusic()))
	}
}

export default connect(null, mapDispatchToProps)(MainPage)

// <div className="music-navigation">
//     <Button className = "previous-next"/>
//     <Button className = "play"/>
//     <Button className = "previous-next"/>
// </div>