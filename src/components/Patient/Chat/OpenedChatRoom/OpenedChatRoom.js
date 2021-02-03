import React, { Component } from 'react'
import ChatInput from '../ChatInput'
import ChatMessage from '../ChatMessage'

class OpenedChatRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
		step: 1,
		name: '',
		doctor: {},
    }
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  componentDidUpdate() {
    if (this.props.active_chatroom !== null) this.scrollToBottom();
  }


  render() {
  	if(this.props.active_chatroom === null) {
	    return (
	    	<div className="col-6">
	            <div className="vertical_center_parent">
	                <div className="vertical_center_child">
	                  <p style={{fontWeight: 'bold'}} >No Chat opened</p>
	                </div>
	            </div>
	         </div>
	    )
  	}

  	else {
	    return (
        <div className="col-6">
          <div className="row">
            <div className="col-12 chat_messages_full">

            



              {this.state.messages.map((message, index) =>
                <ChatMessage
                  key={index}
                  message={message.message}
                  name={message.name}
                />,
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
}

export default OpenedChatRoom