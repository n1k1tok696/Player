import React from 'react';

export default function SongTable (props) {
	return(
		<div key={props._id} className="song" onClick={props.onClick} style={props.style}>
			<div className="nameSong-song">{props.songName.originalFileName}</div>
			<div className="duration-song">{props.duration}</div>
		</div>
	)
}
