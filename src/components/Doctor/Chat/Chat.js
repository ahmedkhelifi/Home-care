import React from 'react';
import ChatList from './ChatList'
import ChatInput from './ChatInput'
import ChatRoom from './ChatRoom'
import CreateChatRoom from './CreateChatRoom'
import OpenedChatRoom from './OpenedChatRoom'

import Home_botton from'../../../images/Home_botton.png';
import Chat_menu from'../../../images/Chat_menu.png';
import Settings_wheel from'../../../images/settings_wheel.png';

const URL = 'ws://localhost:5000'

export default class Chat extends React.PureComponent { 


  constructor(props) {
    super(props);
    this.state = {
      // name: this.props.name,

      new_convesation: false,
      doctosLoaded: false,
      doctors: [],

      messages: [],
      // chatrooms: this.props.chatrooms,
      // active_chatroom: null,
    }
  }

  ws = this.props.ws//new WebSocket(URL)

  shouldComponentUpdate(nextProps, nextState) {
    return this.props !== nextProps || this.state !== nextState;
  }

  // componentDidMount() {
  //   this.ws.onopen = () => {
  //     // on connecting, do nothing but log it to the console
  //     console.log('connected')
  //     const message = { id: this.props.doctorid, name: this.props.name, idType: 'doctor', type: 'online'}
  //     this.ws.send(JSON.stringify(message))
  //   }

  //   this.ws.onmessage = evt => {
  //     // on receiving a message, add it to the list of messages
  //     const message = JSON.parse(evt.data)
  //     // this.addMessage(message)
  //     if(message.type === 'ping' && this.state.ID !== -1){
  //             // console.log('ping')
  //       const message = { id: this.props.doctorid, idType: 'doctor', type: 'pong' }
  //       this.ws.send(JSON.stringify(message))
  //     }

  //     if(message.type === 'update_chatroom'){
  //       console.log(message.chatroom)
  //       let chatrooms = this.state.chatrooms
  //       let updated_chatroom = chatrooms.filter(chatroom =>  chatroom.chatroom_id === message.chatroom.chatroom_id && chatroom.toType === message.chatroom.toType && chatroom.fromType === message.chatroom.fromType && chatroom.fromID === message.chatroom.fromID && chatroom.toID === message.chatroom.toID)

  //       if(updated_chatroom.length > 0) {
  //         //...
  //         chatrooms.forEach(chatroom => {
  //           if( chatroom.chatroom_id === message.chatroom.chatroom_id && chatroom.toType === message.chatroom.toType && chatroom.fromType === message.chatroom.fromType && chatroom.fromID === message.chatroom.fromID && chatroom.toID === message.chatroom.toID)
  //             chatroom.messages =  message.chatroom.messages
  //         })
  //         this.setState({chatrooms: chatrooms}, e => this.forceUpdate())
  //       } else {
  //         this.setState(state => ({ chatrooms: [...state.chatrooms, message.chatroom] }))          
  //       }
  //     }

  //   }

  //   this.ws.onclose = () => {
  //     console.log('disconnected')
  //     // automatically try to reconnect on connection loss
  //     this.setState({
  //       ws: new WebSocket(URL),
  //     })
  //   }

  //   this.get_messages()
  //   // this.getDoctors()
  //   // this.scrollToBottom();
  // }

  // componentDidUpdate() {
  //   this.scrollToBottom();
  // }

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


  // createChatroom = (doctor, name) => {
  //   let chatroom = {chatroom_id: new Date().valueOf(), name: name, toID: doctor.id, to: doctor.name, toType: 'patient', fromID: this.props.doctorid, from: this.props.name, fromType: 'doctor',  messages:{messages:[{timestamp: new Date().valueOf(), type: 'created', read: true}]}}
  //   // console.log(doctor.name)
  //   this.setState(state => ({ chatrooms: [...state.chatrooms, chatroom].sort(( a, b ) => this.compare_chatrooms(a,b)), new_convesation: false}))
  // }

  // addMessage = message =>
  //   this.setState(state => ({ messages: [...state.messages, message] }))

  submitMessage = messageString => {
    this.props.submitMessage(messageString, this.state.active_chatroom)
  }

  openChatroom = (chatroom) => {
    this.props.openChatroom(chatroom)
    // this.setState(state => ({ active_chatroom: chatroom }))
  }

  // mark_chatroom_as_read = (active_chatroom) => {
  //   let chatrooms = this.state.chatrooms
  //   chatrooms.forEach(chatroom => {
  //     if( chatroom.chatroom_id === active_chatroom.chatroom_id && chatroom.toType === active_chatroom.toType) {
  //       chatroom.messages.messages.forEach(message => {
  //         if(!message.read &&  message.fromType !== 'doctor') message.read = true
  //       })
  //       let to_id = ''
  //       if(chatroom.toType !== 'doctor') to_id = chatroom.toID
  //       else to_id = chatroom.fromID
  //       this.ws.send(JSON.stringify({type: 'chatroom_update', chatroom: chatroom, to_id: to_id, to_type: 'patient'}))
  //       // console.log(chatroom)
  //     }

          
  //   })

  //   this.setState({chatrooms: chatrooms}, e => this.forceUpdate())
  // }

  // scrollToBottom = () => {
  //   // this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  // }

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
                <CreateChatRoom doctors={this.state.doctors} createChatroom={this.props.createChatroom}/>
              )}
              
            </div>
          ) 
      :
          (
            <div className="col-6 chat_sidebar_doc">
              <div className="row">
                <div className="col-12">
                  <p className="new_conversation_client" onClick={e => this.show_doctors_list()}>+ New Chatroom</p>
                </div>
              </div>
              <div className="row"><p style={{fontWeight: 'bold'}} >Please select a chatroom to open it.</p></div>
              
              
                      {chatrooms.map((chatroom, index) =>
                        <ChatRoom
                          key={index}
                          name={chatroom.name}
                          to={chatroom.to}
                          chatroom = {chatroom}
                          openChatroom = {this.props.openChatroom}
                          active_chatroom = {active_chatroom}
                          myType = {'doctor'}
                        />,
                      )}
            </div>
          )
        }

        <OpenedChatRoom active_chatroom={active_chatroom} submitMessage={this.submitMessage} ws={this.ws} my_id={this.props.doctorid} myType={'doctor'} mark_chatroom_as_read={this.props.mark_chatroom_as_read} />

    </div>

    </div>
    );
  }
}