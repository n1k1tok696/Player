import React from 'react'
import { connect } from 'react-redux';

import { actionPromiseGetMusic } from '../AllMusic/AllMusic'

class AddMusic extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			track: ''

		}
		this.send = this.send.bind(this)
	}


	send(){
		console.log('send?')
		fetch('/track', {
		            method: "POST",
		            headers: localStorage.authToken ? {Authorization: 'Bearer ' + localStorage.authToken} : {},
		            body: new FormData(this.form)
		        }).then(res => res.json()).then(data => console.log(data)).then(() => this.props.refreshMusic())
	}

	render(){
		return (
				<div>
					<div>Maybe</div>
					<form 
						action="/track"
						method="post"
						encType="multipart/form-data"
						ref={(e) => this.form = e}
						>
							  <input
							  	className="form-control"
							  	type="file"
							  	name="track"
							  	id='track'
							  	
							 />	 
					</form>
					<button onClick={this.send}>Send</button>
				</div>
		)
	}
}


function mapDispatchToProps(dispatch) {
	return {
		refreshMusic: () => dispatch(actionPromiseGetMusic())
	}
}

export default connect(null, mapDispatchToProps)(AddMusic)
