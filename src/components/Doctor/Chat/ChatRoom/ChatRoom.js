import React, { Component } from 'react'

class ChatRoom extends Component {

  render() {
     	let partner_name = ''
     	if(this.props.myType !== this.props.chatroom.toType) partner_name = this.props.chatroom.to
     	else partner_name = this.props.chatroom.from


     	if(this.props.active_chatroom !== null && this.props.chatroom.chatroom_id === this.props.active_chatroom.chatroom_id && this.props.chatroom.from === this.props.active_chatroom.from) {
		    return (
		    	 <div className="row">
		    	 	<div className="col-12">
				        <div className="row chat_list_bubble" style={{backgroundColor: '#5b7da1'}} onClick={e => this.props.openChatroom(this.props.chatroom)}>
				          <div className="col-3" style={{justifyContent: 'center', alignItems: 'center'}}>
				            <div className="circle" style={{justifyContent: 'center', alignItems: 'center', background:'white'}}> 
				              <p style={{color: 'black', textAlign: 'center', fontWeight: 'bold', paddingTop: '17px', fontSize: '30px'}}>{this.props.to.split(" ")[1][0]}</p>
				            </div>
				          </div>
				          <div className="col-9" style={{justifyContent: 'center', alignItems: 'center'}}>
				            <p style={{color:'white'}} ><span style={{fontWeight: 'bold'}}>Topic:</span> {this.props.name}</p>
				            <p style={{marginTop: '-15px',color:'white'}} >{partner_name}</p>
				          </div>
				        </div>
				    </div>
				</div>
		    )
		} else {
		    return (
		    	 <div className="row">
		    	 	<div className="col-12">
				        <div className="row chat_list_bubble" onClick={e => this.props.openChatroom(this.props.chatroom)}>
				          <div className="col-3" style={{justifyContent: 'center', alignItems: 'center'}}>
				            <div className="circle" style={{justifyContent: 'center', alignItems: 'center'}}> 
				              <p style={{color: 'white', textAlign: 'center', fontWeight: 'bold', paddingTop: '17px', fontSize: '30px'}}>{this.props.to.split(" ")[1][0]}</p>
				            </div>
				          </div>
				          <div className="col-6" style={{justifyContent: 'center', alignItems: 'center'}}>
				            <p style={{}} ><span style={{fontWeight: 'bold'}}>Topic:</span> {this.props.name}</p>
				            <p style={{marginTop: '-15px'}} >{partner_name}</p>
				          </div>
				          <div className="col-3" style={{justifyContent: 'center', alignItems: 'center'}}>
				          	{this.props.chatroom.messages.messages[this.props.chatroom.messages.messages.length-1].read === false &&  this.props.chatroom.messages.messages[this.props.chatroom.messages.messages.length-1].fromType !== this.props.myType ? (<p style={{color:'red'}} >unread</p>) : (null)}
				          </div>
				        </div>
				    </div>
				</div>
		    )
		}
  }
}

export default ChatRoom