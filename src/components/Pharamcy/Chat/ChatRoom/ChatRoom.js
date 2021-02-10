import React, { Component } from 'react'
import Doctor_logo from'../../../../images/doctor.png';
import Patient_logo from'../../../../images/User_icon_BLACK-01.png';

class ChatRoom extends Component {

  render() {
     	let partner_name = ''
     	if(this.props.myType !== this.props.chatroom.toType) partner_name = this.props.chatroom.to
     	else partner_name = this.props.chatroom.from

     	let partner_type = ''
     	if(this.props.myType !== this.props.chatroom.toType) partner_type = this.props.chatroom.toType
     	else partner_type = this.props.chatroom.fromType

     	if(this.props.active_chatroom !== null && this.props.chatroom.chatroom_id === this.props.active_chatroom.chatroom_id && this.props.chatroom.from === this.props.active_chatroom.from) {
		    return (
		    	 <div className="row">
		    	 	<div className="col-12">
				        <div className="row chat_list_bubble" style={{backgroundColor: '#5b7da1'}} onClick={e => this.props.openChatroom(this.props.chatroom)}>
				          <div className="col-3" style={{justifyContent: 'center', alignItems: 'center'}}>
				            <div className="circle" style={{justifyContent: 'center', alignItems: 'center', background:'white', opacity: '1'}}> 
				            { partner_type === 'doctor' ? (
				              	<img src={Doctor_logo} className="apotheke_logo_chat" />
				              ) : (
				              	<img src={Patient_logo} className="apotheke_logo_chat" />
				              )
				            }
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
				            { partner_type === 'doctor' ? (
				              	<img src={Doctor_logo} className="apotheke_logo_chat" />
				              ) : (
				              	<img src={Patient_logo} className="apotheke_logo_chat" />
				              )
				            }
				            </div>
				          </div>
				          <div className="col-7" style={{justifyContent: 'center', alignItems: 'center'}}>
				            <p style={{}} ><span style={{fontWeight: 'bold'}}>Topic:</span> {this.props.name}</p>
				            <p style={{marginTop: '-15px'}} >{partner_name}</p>
				          </div>
				          <div className="col-2" style={{justifyContent: 'center', alignItems: 'center'}}>
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