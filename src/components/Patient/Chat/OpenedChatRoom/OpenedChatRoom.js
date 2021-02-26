import React, { Component } from 'react'
import ChatInput from '../ChatInput'
import ChatMessage from '../ChatMessage'

class OpenedChatRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
		step: 1,
    }
  }

  componentDidMount() {
  	this.props.mark_chatroom_as_read(this.props.active_chatroom)
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  componentDidUpdate() {
    if (this.props.active_chatroom !== null) {
    	this.scrollToBottom();
		if(this.props.active_chatroom !== null && this.props.active_chatroom.messages.messages[this.props.active_chatroom.messages.messages.length-1].read === false &&  this.props.active_chatroom.messages.messages[this.props.active_chatroom.messages.messages.length-1].fromType !== this.props.myType){
			this.props.mark_chatroom_as_read(this.props.active_chatroom)
		}
    }
  }

  beautify_timestamp = (unix_timestamp) => {
    let a = new Date( Number(unix_timestamp));
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let time = date + ' ' + month + ' ' + year ;
    
    return time;
  } 


  render() {
      let partner_name = ''
      if(this.props.myType !== this.props.active_chatroom.toType) partner_name = this.props.active_chatroom.to
      else partner_name = this.props.active_chatroom.from

      let partner_type = ''
      if(this.props.myType !== this.props.active_chatroom.toType) partner_type = this.props.active_chatroom.toType
      else partner_type = this.props.active_chatroom.fromType

	return (
        <div className="col-12" style={{paddingRight: '0', paddingLeft: '0'}}>
          <div className="row">
          	<div className="col-12 top_banner_chat vertical_center_parent">
          		<p className="patient_back" style={{marginTop: '21px'}} onClick={() => this.props.goBack() }>&#10230;</p>
	                <div className="vertical_center_child">
	                  <p style={{fontWeight: 'bold', textTransform: 'capitalize'}} >{partner_type}: {partner_name}</p>
	                  <p style={{marginTop: '-16px'}} >{this.props.active_chatroom.name}</p>
	                </div>
          	</div>

            <div className="col-12 chat_messages_full">

            



              {this.props.active_chatroom.messages.messages.map((message, index) => {
              	if(message.type === 'message') {
              		return(<ChatMessage key={index} message={message.message} name={message.name} my_id={this.props.my_id} my_type={'patient'} patner_name_1={this.props.active_chatroom.from} patner_type_1={this.props.active_chatroom.fromType} patner_name_2={this.props.active_chatroom.to}  fromType={message.fromType} read={message.read}  />)
              	} else {
              		return (<p style={{marginTop: '10px', color: '#8ea9ca', textAlign: 'center'}}>Chatroom created on {this.beautify_timestamp(message.timestamp)}</p>)
              	}
              }
              )}
              <div style={{ float:"left", clear: "both" }}
                   ref={(el) => { this.messagesEnd = el; }}>
              </div>
            </div>
          </div>


          <ChatInput
            ws={this.props.ws}
            onSubmitMessage={messageString => this.props.submitMessage(messageString)}
          />
          

        </div>
	    )
  }
}

export default OpenedChatRoom