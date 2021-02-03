import React, { Component } from 'react'

class ChatRoom extends Component {

  render() {
    return (
    	 <div className="row">
    	 	<div className="col-12">
		        <div className="row chat_list_bubble">
		          <div className="col-3" style={{justifyContent: 'center', alignItems: 'center'}}>
		            <div className="circle" style={{justifyContent: 'center', alignItems: 'center'}}> 
		              <p style={{color: 'white', textAlign: 'center', fontWeight: 'bold', paddingTop: '17px', fontSize: '30px'}}>{this.props.to.split(" ")[1][0]}</p>
		            </div>
		          </div>
		          <div className="col-9" style={{justifyContent: 'center', alignItems: 'center'}}>
		            <p style={{color:'white', fontWeight: 'bold'}} >{this.props.name}</p>
		            <p style={{color:'#ffffffc2', marginTop: '-18px'}} >{this.props.to}</p>
		          </div>
		        </div>
		    </div>
		</div>
    )
  }
}

export default ChatRoom