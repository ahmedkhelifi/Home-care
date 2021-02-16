import React from 'react';
import ChatInput from './ChatInput'
import ChatRoom from './ChatRoom'
import CreateChatRoom from './CreateChatRoom'
import OpenedChatRoom from './OpenedChatRoom'

import Home_botton from'../../../images/Home_botton.png';
import Chat_menu from'../../../images/Chat_menu.png';
import Settings_wheel from'../../../images/settings_wheel.png';

const URL = 'ws://localhost:5000'

export default class Chat extends React.Component { 


  constructor(props) {
    super(props);
    this.state = {
      new_convesation: false,

      doctosLoaded: false,
      doctors: [],

      patientsLoaded: false,
      patients: [],
    }
  }

  ws = this.props.ws//new WebSocket(URL)

  shouldComponentUpdate(nextProps, nextState) {
    return this.props !== nextProps || this.state !== nextState;
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
    fetch('/api/chat/getPatients/')
      .then(blob => blob.json())
      .then(blob => {
        this.setState({patientsLoaded: true, patients: blob})
      })
      .catch(error => this.setState({error: true}));

    fetch('/api/chat/getDoctors/')
      .then(blob => blob.json())
      .then(blob => {
        this.setState({doctosLoaded: true, doctors: blob})
      })
      .catch(error => this.setState({error: true}));
  }

  compare_chatrooms = ( a, b ) => {
    if ( a.messages.messages[a.messages.messages.length-1].timestamp > b.messages.messages[b.messages.messages.length-1].timestamp ){
      return -1;
    }
    if ( a.messages.messages[a.messages.messages.length-1].timestamp < b.messages.messages[b.messages.messages.length-1].timestamp ){
      return 1;
    }
    return 0;
  }


  createChatroom = (patient, doctor, name) => {
    this.props.createChatroom(patient, doctor, name)
    this.setState({new_convesation: false})
  }

  submitMessage = messageString => {
    this.props.submitMessage(messageString, this.state.active_chatroom)
  }

  openChatroom = (chatroom) => {
    this.props.openChatroom(chatroom)
  }

  render() {

    let chatrooms = this.props.chatrooms.sort(( a, b ) => this.compare_chatrooms(a,b))
    let active_chatroom = this.props.active_chatroom
    return (
    <div className="container-fluid" style={{backgroundColor: '#f7f7f7', padding: '0'}}>

    <div className="row">

      {this.state.new_convesation ?
          (
            <div className="col-6 chat_sidebar_doc">
              <p className="new_conversation_client" onClick={e => this.close_doctors_list()}>Back to chatrooms</p>
              {!this.state.doctosLoaded ? (null) : (
                <CreateChatRoom doctors={this.state.doctors} patients={this.state.patients} createChatroom={this.createChatroom}/>
              )}
              
            </div>
          ) 
      :
          (
            <div className="col-6 chat_sidebar_doc">
              <div className="row">
                <div className="col-12">
                  <p className="new_conversation_client" style={{float: 'left'}} onClick={e => this.props.logout()}>Logout</p>
                  <p className="new_conversation_client" onClick={e => this.show_doctors_list()}>+ New Chatroom</p>
                </div>
              </div>
              {chatrooms.length > 0 ? (<div className="row"><p style={{fontWeight: 'bold'}} >Please select a chatroom to open it.</p></div>) : (<div className="row"><p style={{fontWeight: 'bold'}} >You have no chatrooms. Create one to start a conversation.</p></div>)}
              
              
                      {chatrooms.map((chatroom, index) =>
                        <ChatRoom
                          key={index}
                          name={chatroom.name}
                          to={chatroom.to}
                          chatroom = {chatroom}
                          openChatroom = {this.props.openChatroom}
                          active_chatroom = {active_chatroom}
                          myType = {'pharmacy'}
                        />,
                      )}
            </div>
          )
        }

        <OpenedChatRoom active_chatroom={active_chatroom} submitMessage={this.submitMessage} ws={this.ws} my_id={this.props.pharmacyid} myType={'pharmacy'} mark_chatroom_as_read={this.props.mark_chatroom_as_read} />

    </div>

    </div>
    );
  }
}