import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ChatInput extends Component {
  static propTypes = {
    onSubmitMessage: PropTypes.func.isRequired,
  }
  state = {
    message: '',
  }

  submit = (e) => {
          e.preventDefault()
          this.props.onSubmitMessage(this.state.message)
          this.setState({ message: '' })
  }

  render() {
    return (
      <div className="row">
        <div className="col-12 chat_send_message_input_coontainer">
          <form action="." onSubmit={e => this.submit(e)}>
            <input
              type="text"
              placeholder={'Enter message...'}
              value={this.state.message}
              onChange={e => this.setState({ message: e.target.value })}
              className="enter_a_message_field"
            />
            <input type="submit" value={'Send'} className="chat_send_button" />
          </form>
        </div>
      </div>
    )
  }
}

export default ChatInput