import React from 'react'
import { connect } from 'react-redux';

import Playlist from '../Playlist/Playlist'

const actionChoosePlaylist = (payload) => ({type: 'CHOOSEN_PLAYLIST', payload})

class Player extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			vol: "50",
			// songUrl: 'http://player.asmer.fs.a-level.com.ua/track/ad9948d04c94bdc61df16197e52953ca',
			isPlaying: false,
			currentSong: {},
			progress: 0,
			// duration: 0
		}

	this.rewind = false //перемотка
	this.syncProgress = false //синхронизация прогресса песни с линией загрузки

	this.onChange = this.onChange.bind(this)
	this.playSong = this.playSong.bind(this)
	this.btnPlaySong = this.btnPlaySong.bind(this)
	this.chooseSong = this.chooseSong.bind(this)
	this.changeBar = this.changeBar.bind(this)
	this.next = this.next.bind(this)
	this.prev = this.prev.bind(this)
	// this.checkDuration = this.checkDuration.bind(this)
	}

	onChange(e) {
		console.log(e.target.value)
		this.setState({[e.target.name]: e.target.value})
	}
	playSong() {
		// this.refs.player.play()
		// this.setState({isPlaying: !this.state.isPlaying})
		this.setState({isPlaying: true})

	}

	btnPlaySong() {
		this.setState({isPlaying: !this.state.isPlaying})
	}


	chooseSong(song) {
		// this.setState({currentSong: song})
		async function awaitSong() {
			await this.setState({currentSong: song})
			console.log(this.state.currentSong)
			return this.playSong()
		}
		awaitSong.call(this)
	}

	changeBar(e){
		let progress = (e.clientX - offsetLeft(this.refs.progressBar)) / this.refs.progressBar.clientWidth
		this.setState({
			progress
		})
		this.rewind = true
	}


	componentDidMount(){
		if (this.refs.player) {
			if (!this.syncProgress) {
				this.syncProgress = true
					if (!this.rewind) {
						this.intervalID = setInterval(() => {this.setState({
							progress: this.refs.player.currentTime / this.refs.player.duration
						})},100)

					}
			}
		}
	}

	componentWillUnmount(){
		clearInterval(this.intervalID)
	}

	next(){
		if (isEmpty(this.props.isPlaylistChoosen)) {
			let s = this.props.songs.findIndex((item, index, arr) => {
						return item._id === this.state.currentSong._id
				})
			this.setState({currentSong: this.props.songs[s+1]})

		}
		else {
			let s = this.props.isPlaylistChoosen.tracks.findIndex((item, index, arr) => {
						return item._id === this.state.currentSong._id
				})
			this.setState({currentSong: this.props.isPlaylistChoosen.tracks[s+1]})
		}
	}

	prev(){
		if (isEmpty(this.props.isPlaylistChoosen)) {
			let s = this.props.songs.findIndex((item, index, arr) => {
						return item._id === this.state.currentSong._id
				})
			this.setState({currentSong: this.props.songs[s-1]})

		}
		else {
			let s = this.props.isPlaylistChoosen.tracks.findIndex((item, index, arr) => {
						return item._id === this.state.currentSong._id
				})
			this.setState({currentSong: this.props.isPlaylistChoosen.tracks[s-1]})
		}
	}

	render(){
		if (this.refs.player) {
			let player = this.refs.player

			player.volume = this.state.vol / 100
			if (player.paused){
				if (this.state.isPlaying) {
					player.play()
				}
			}
			else if (!this.state.isPlaying) {
				player.pause()
			}

			if (this.rewind) {
				this.rewind = false

				player.currentTime = player.duration * this.state.progress
			}
		}

		let duration = this.refs.player === undefined ? null : this.refs.player.duration




		return(
			<div className="wrapper">
				<div className="player">
					<div className="nameSong">{this.state.currentSong && this.state.currentSong.originalFileName}</div>
					<div className="controll">
							<div className="controll-btn arrowLeft">
								<div>
									<i className="fas fa-angle-double-left" onClick={this.prev}></i>
								</div>
							</div>
							<div className="controll-btn playPause" onClick={this.btnPlaySong}>
								<div>
									<i className={this.state.isPlaying ? "fas fa-pause" : "fas fa-play"}></i>
								</div>
							</div>
							<div className="controll-btn arrowRight" onClick={this.next}>
								<div>
									<i className="fas fa-angle-double-right"></i>
								</div>
							</div>
					</div>
					<div className="bar">
						<div onClick={this.changeBar} className="range">
							<div ref="progressBar" className="progress-bar">
								<div className="progress" style = {{width: (this.state.progress * 100)  + '%'}}></div>
								<div className="load"></div>
							</div>
						</div>
						<div className="volume-bar">
							<div className="mute">{this.state.vol === "0" ? <i className="fas fa-volume-mute"></i>: <i className="fas fa-volume-off"></i>}</div>
							<input  className="volume" 
									type="range" 
									name="vol"
									min="0" 
									max="100" 
									value={this.state.vol}
									onChange = {this.onChange}
							/>
						</div>
					</div>
					<div className="time">{this.state.currentSong.url ? `${Math.floor(duration / 60)}.${(duration % 60) < 10 ? `0${Math.round(duration % 60)}` : Math.round(duration % 60)}` : "0.00" }</div>
					<audio ref="player" src={this.state.currentSong.url} ></audio>
				</div>
				<div>
					<Playlist currentSong={this.state.currentSong._id} songs={isEmpty(this.props.isPlaylistChoosen) ? this.props.songs : this.props.isPlaylistChoosen.tracks} func={this.chooseSong}/>
				</div>
			</div>
		)
	}
}

function isEmpty(obj) {
	for(let key in obj) {
		return false
	}
	return true
}

function offsetLeft(el) {
	let left = 0;
	while (el && el !== document) {
		left += el.offsetLeft
		el = el.offsetParent
		console.log(left)
	}
	return left
}

function mapStateToProps(store) {
	return {
		songs: store.music.allMusic,
		isPlaylistChoosen: store.playlists.choosenPlaylist
	}
}

function mapDispatchToProps (dispatch){
	return{
		allMusic: (songs) => dispatch(actionChoosePlaylist(songs))
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Player)

// <Playlist currentSong={this.state.currentSong && this.state.currentSong._id} songs={isEmpty(this.props.isPlaylistChoosen) ? this.props.songs : this.props.isPlaylistChoosen.tracks} func={this.chooseSong}/>
