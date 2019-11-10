import React from 'react'

import Playlist from '../Playlist/Playlist'

class PlaylistTable extends React.Component {
	render(){
		let {name, tracks, _id} = this.props.playlists
		return(
			<div key={_id} className="playlist-table" onClick={this.props.func}>
				<p>{name}</p>
				<div>
					<Playlist songs={tracks} />
				</div>
			</div>
		)
	}
}

export default PlaylistTable