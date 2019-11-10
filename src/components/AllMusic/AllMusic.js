// import React from 'react';
// import { connect } from 'react-redux';

// // import { createGql } from '../helpers';
// import Playlist from '../Playlist/Playlist'







// // store.dispatch(actionPromiseGetMusic())


// class AllMusic extends React.Component {
// 	constructor(props){
// 		super(props)

// 		this.choose = this.choose.bind(this)
// 	}

// 	choose(e){
// 		console.log(e._id)
// 	}

// 	componentDidMount(){
// 		this.props.allMusic()
// 	}

// 	render(){
// 		return(
// 			<div>
// 				<Playlist songs = {this.props.allMusic} func={this.choose}/>			
// 			</div>
// 		)
// 	}
// }

// function mapStateToProps (store) {
// 	return {
// 		allMusic: store.music.allMusic
// 	}
// }

// // function mapDispatchToProps(dispatch){
// // 	return{
// // 		allMusic: () => (dispatch(actionPromiseGetMusic()))
// // 	}
// // }

// // class AllMusicPage extends React.Component{
// // 	componentDidMount(){
// // 		this.props.getAllMusicList()
// // 	}
// // 	render(){
// // 		return (
// // 			<PlayList allMusic ={this.props.list} />
// // 		)
// // 	}
// // }

// // AllMusicPage = connect(s => ({list: s.list}), {getAllMusicList})


// export default connect(mapStateToProps, mapDispatchToProps)(AllMusic)