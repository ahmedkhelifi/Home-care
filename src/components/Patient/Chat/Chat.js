import React from 'react';
import ChatList from './ChatList'
import ChatInput from './ChatInput'
import ChatMessage from './ChatMessage'

import Home_botton from'../../../images/Home_botton.png';
import Chat_menu from'../../../images/Chat_menu.png';
import Settings_wheel from'../../../images/settings_wheel.png';

const URL = 'ws://localhost:5000'

export default class Chat extends React.PureComponent { 


  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      to: this.props.to,
      from: this.props.from,

      new_convesation: false,
      doctosLoaded: false,
      doctors: [],

      messages: [],
    }
  }

  ws = new WebSocket(URL)

  componentDidMount() {
    this.ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log('connected')
    }

    this.ws.onmessage = evt => {
      // on receiving a message, add it to the list of messages
      const message = JSON.parse(evt.data)
      this.addMessage(message)
    }

    this.ws.onclose = () => {
      console.log('disconnected')
      // automatically try to reconnect on connection loss
      this.setState({
        ws: new WebSocket(URL),
      })
    }

    this.get_messages()
    // this.getDoctors()
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  get_messages = () => {

  }

  show_doctors_list = () => {
    this.setState({new_convesation: true})
    this.getDoctors()
  }

  close_doctors_list = () => {
    this.setState({new_convesation: false, doctosLoaded: false})
  }

  getDoctors = () => {
    fetch('/api/chat/getDoctors/')
      .then(blob => blob.json())
      .then(blob => {
        this.setState({doctosLoaded: true, doctors: blob})
      })
      .catch(error => this.setState({error: true}));
  }

  addMessage = message =>
    this.setState(state => ({ messages: [...state.messages, message] }))

  submitMessage = messageString => {
    // on submitting the ChatInput form, send the message, add it to the list and reset the input
    const message = { name: this.state.name, message: messageString, from: this.state.from, name: this.state.name}
    this.ws.send(JSON.stringify(message))
    this.addMessage(message)
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  render() {


    return (
    <div className="container-fluid" style={{backgroundColor: '#f7f7f7', padding: '0'}}>

    <div className="row">

      {this.state.new_convesation ?
          (
            <div className="col-6 chat_sidebar">
              <p className="new_conversation_client" onClick={e => this.close_doctors_list()}>Back to messages</p>
              {!this.state.doctosLoaded ? (<p>Loading</p>) : (null)}
              
            </div>
          ) 
      :
          (
            <div className="col-6 chat_sidebar">
              <p className="new_conversation_client" onClick={e => this.show_doctors_list()}>+ New Conversation</p>
              <ChatList  />
            </div>
          )
        }



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
            ws={this.ws}
            onSubmitMessage={messageString => this.submitMessage(messageString)}
          />
          

        </div>

    </div>




<div className="navbar row" style={{marginLeft: '0'}}>
  <div className=" col-4"  onClick={e => this.props.goBack()}>
    <img  src={Home_botton} alt="home" className="menu_logo"/>
    <a>Home</a>
  </div>
  <div className=" col-4">
    <img  src={Chat_menu} alt="History" className="menu_logo"/>
    <a style={{fontWeight: 'bold'}} >Chat</a>
  </div>
  <div className=" col-4">
    <img  src={Settings_wheel} alt="Settings" className="menu_logo"/>
    <a style={{textAlign: 'center'}}>Settings</a>
  </div>
</div>
    </div>
    );
  }
}