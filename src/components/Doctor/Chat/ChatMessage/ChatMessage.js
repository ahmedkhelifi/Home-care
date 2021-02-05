import React, { Component } from 'react'

class ChatMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    step: 1,
    name: '',
    doctor: {},
    }
  }
 render() { 
     if(this.props.my_type === this.props.fromType) {
      return(
        <p style={{float: 'right', clear: 'both'}}>
          <strong>me:</strong> <em>{this.props.message}</em>
        </p>
      )
    }

    else {
      let partner_name = ''
      if(this.props.patner_type_1 === 'patient') partner_name = this.props.patner_name_1
      else partner_name = this.props.patner_name_2
      return(
        <p>
          <strong>{partner_name}:</strong> <em>{this.props.message}</em>
        </p>
      )
    }
  }
}

export default ChatMessage