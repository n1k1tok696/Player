import React from 'react';
import SongTable from '../SongTable/SongTable';


class Playlist extends React.Component {
	render(){
		return(
			<div>
				{this.props.songs && this.props.songs.map(item => <SongTable key = {item._id} style={this.props.currentSong && this.props.currentSong === item._id ? {background: "red"} : null} songName = {item} duration = "0.00" onClick ={this.props.func && this.props.func.bind(this, item)}/>)}
			</div>
		)
	}	
}

export default Playlist

// {this.props.songs && this.props.songs.map(item => <SongTable key = {item._id} songName = {item} duration = "0.00" onClick ={this.props.func)}/>)}
// currentSong={this.state.currentSong._id} 
//this.props.match.params.id