import React from 'react';
import Playlist from '../Playlist/Playlist'

class ShowPlaylist extends React.Component {
	render(){
		return(
			<div>
				<p>{this.props.name}</p>
				<div>
					<Playlist songs={} func={}/>
				</div>
			</div>
		)
	}
}

export default ShowPlaylist