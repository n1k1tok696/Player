import React from 'react'
import { connect } from 'react-redux';

import SongTable from '../SongTable/SongTable'
import Playlist from '../Playlist/Playlist'

class Player extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			vol: "50",
			// songUrl: 'http://player.asmer.fs.a-level.com.ua/track/ad9948d04c94bdc61df16197e52953ca',
			isPlaying: false,
			currentSong: {},
			progress: 0
		}

	this.rewind = false //перемотка
	this.syncProgress = false //синхронизация прогресса песни с линией загрузки

	this.onChange = this.onChange.bind(this)
	this.playSong = this.playSong.bind(this)
	this.btnPlaySong = this.btnPlaySong.bind(this)
	this.chooseSong = this.chooseSong.bind(this)
	this.changeBar = this.changeBar.bind(this)
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

	getDuration(dur){
		// this.refs.player.addEventListener('loadedmetadata', (e) => {
		//   return dur = e.target.duration
		// });
		// console.log(dur)
		let smth = dur.duration
		return smth
	}

	chooseSong(song) {
		// this.setState({currentSong: song})
		console.log(this.state.currentSong)
		async function awaitSong() {
			await this.setState({currentSong: song})
			return this.playSong()
		}
		awaitSong.call(this)
	}

	changeBar(e){
		// console.log(this.refs.progressBar)
		let progress = (e.clientX - offsetLeft(this.refs.progressBar)) / this.refs.progressBar.clientWidth
		// console.log(offsetLeft(this.refs.progressBar), this.refs.progressBar.clientWidth, e.clientX)
		// console.log(progress)
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

	render(){
		// let url = `http://player.asmer.fs.a-level.com.ua/${this.props.songs === undefined ? null : this.props.songs[3].url}`
		if (this.refs.player) {
			let player = this.refs.player
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

		return(
			<div className="wrapper">
				<div className="player">
					<div className="nameSong">{this.state.currentSong.originalFileName}</div>
					<div className="controll">
							<div className="controll-btn arrowLeft">
								<div>
									<i className="fas fa-angle-double-left"></i>
								</div>
							</div>
							<div className="controll-btn playPause" onClick={this.btnPlaySong}>
								<div>
									<i className={this.state.isPlaying ? "fas fa-pause" : "fas fa-play"}></i>
								</div>
							</div>
							<div className="controll-btn arrowRight">
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
					<div className="time">{this.refs.player === undefined ? null : (this.getDuration(this.refs.player) / 60).toFixed(2)}</div>
					<audio ref="player" src={this.state.currentSong.url} ></audio>
				</div>
				<div>
					<Playlist songs={this.props.songs} func={this.chooseSong}/>
				</div>
			</div>
		)
	}
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
		songs: store.music.allMusic
	}
}

export default connect(mapStateToProps)(Player)

// this.refs.player === undefined ? <p>0.00</p> : this.refs.player.duration

// {this.props.songs === undefined ? <div></div> : this.props.songs.map((item) => <SongTable key = {item._id} songName = {item} duration='0.00' onClick={this.chooseSong.bind(this, item)}/>)}