import React from 'react';
// import { store } from '../SignUp/LoginForm'
// import { connect } from 'react-redux';

export default function SongTable (props) {
	return(
		<div className="song" onClick={props.onClick}>
			<div className="nameSong-song">{props.songName.originalFileName}</div>
			<div className="duration-song">{props.duration}</div>
		</div>
	)
}

{/*<div className="song" onClick = {() => console.log(props.songName.url)}>*/}
// function mapStateToProps(store) {
// 	return {
// 		allMusic: store.music.allMusic
// 	}
// }

// export default connect(mapStateToProps)(SongTable)

// {name: `/${query.trime().split('/\s+/).join('|')}/`}