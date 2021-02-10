import React, { Component } from 'react'
import Eye from'../../../../images/eye.png';

class ChatMessage extends Component {
  constructor(props) {
    super(props);
  }
 render() { 
     if(this.props.my_type === this.props.fromType) {
      return(
        <span style={{width: '100%'}}>
          {this.props.read ? (<img  src={Eye} alt="read" className="messages_read_eye"/>) : (null)}
          <p className="chat_bubble_me" style={!this.props.read ? ({clear: 'both'}) : ({}) }>
            <strong>me:</strong> <em>{this.props.message}</em>
          </p>
        </span>
      )
    }

    else {
      let partner_name = ''
      if(this.props.patner_type_1 !== this.props.my_type) partner_name = this.props.patner_name_1
      else partner_name = this.props.patner_name_2
      return(
        <span style={{width: '100%'}}>
          <p className="chat_bubble_other">
            <strong>{partner_name}:</strong> <em>{this.props.message}</em>
          </p>
        </span>
      )
    }
  }
}

export default ChatMessage