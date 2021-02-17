import React from 'react';
import Cookies from 'js-cookie';

import Chat     from  '../../components/Pharamcy/Chat';

const URL = 'ws://localhost:5000'
var my_type = 'pharmacy'

export default class Pharamcy extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      openedTab: 'Allgemein',

      user: this.props.user,
      authenticated: false,
      chatrooms: [],
      active_chatroom: null,
    };
  }

  ws = new WebSocket(URL)

  componentDidMount() {
    this.ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      // console.log('connected')
      const message = { id: this.state.user.pharmacyid, name: this.state.user.name, idType: my_type, type: 'online'}
      this.ws.send(JSON.stringify(message))
    }

    this.ws.onmessage = evt => {
      // on receiving a message, add it to the list of messages
      const message = JSON.parse(evt.data)
      if(message.type === 'ping' && this.state.ID !== -1){
        const message = { id: this.state.user.pharmacyid, idType: my_type, type: 'pong' }
        this.ws.send(JSON.stringify(message))
      }

      if(message.type === 'set_chatrooms') {
        this.setState({chatrooms : message.chatrooms})
      }

      if(message.type === 'update_chatroom'){
        console.log(message.chatroom)
        let chatrooms = this.state.chatrooms
        let updated_chatroom = chatrooms.filter(chatroom =>  chatroom.chatroom_id === message.chatroom.chatroom_id && chatroom.toType === message.chatroom.toType && chatroom.fromType === message.chatroom.fromType && chatroom.fromID === message.chatroom.fromID && chatroom.toID === message.chatroom.toID)

        if(updated_chatroom.length > 0) {
          //...
          chatrooms.forEach(chatroom => {
            if( chatroom.chatroom_id === message.chatroom.chatroom_id && chatroom.toType === message.chatroom.toType && chatroom.fromType === message.chatroom.fromType && chatroom.fromID === message.chatroom.fromID && chatroom.toID === message.chatroom.toID)
              chatroom.messages =  message.chatroom.messages
          })
          this.setState({chatrooms: chatrooms}, e => this.forceUpdate())
        } else {
          this.setState(state => ({ chatrooms: [...state.chatrooms, message.chatroom] }, e => this.forceUpdate()))          
        }
      }

    }

    this.ws.onclose = () => {
      console.log('disconnected')
      // automatically try to reconnect on connection loss
      this.setState({
        ws: new WebSocket(URL),
      })
    }
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
    let chatroom = {}
    if(patient.hasOwnProperty('id')){
      chatroom = {chatroom_id: new Date().valueOf(), name: name, toID: patient.id, to: patient.name, toType: 'patient', fromID: this.state.user.pharmacyid, from: this.state.user.name, fromType: my_type,  messages:{messages:[{timestamp: new Date().valueOf(), type: 'created', read: true}]}}
    } else {
      chatroom = {chatroom_id: new Date().valueOf(), name: name, toID: doctor.id, to: doctor.name, toType: 'doctor', fromID: this.state.user.pharmacyid, from: this.state.user.name, fromType: my_type,  messages:{messages:[{timestamp: new Date().valueOf(), type: 'created', read: true}]}}
    }
    console.log(chatroom)
    this.setState(state => ({ chatrooms: [...state.chatrooms, chatroom].sort(( a, b ) => this.compare_chatrooms(a,b))}))
  }

  submitMessage = (messageString) => {
    // on submitting the ChatInput form, send the message, add it to the list and reset the input
    let toType = ''
    let active_chatroom = this.state.active_chatroom

    if (my_type !== active_chatroom.toType) toType = active_chatroom.toType
    else toType = active_chatroom.fromType

    let to_id = ''
    if(my_type !== active_chatroom.fromType) to_id = active_chatroom.fromID
    else to_id = active_chatroom.toID

    const message = {message: messageString, fromType: my_type, toType: toType, timestamp: new Date().valueOf(), read: false, type: 'message'}
    
    active_chatroom.messages.messages.push(message)
    this.ws.send(JSON.stringify({type: 'chatroom_update', chatroom: active_chatroom, to_id: to_id, to_type: toType}))
    this.forceUpdate()
  }

  openChatroom = (chatroom) => {
    this.setState(state => ({ active_chatroom: chatroom }))
  }

  mark_chatroom_as_read = (active_chatroom) => {
    let chatrooms = this.state.chatrooms

    chatrooms.forEach(chatroom => {
      if( chatroom.chatroom_id === active_chatroom.chatroom_id && chatroom.toType === active_chatroom.toType) {
        chatroom.messages.messages.forEach(message => {
          if(!message.read &&  message.fromType !== my_type) message.read = true
        })
        let to_id = ''
        if(chatroom.toType !== my_type) to_id = chatroom.toID
        else to_id = chatroom.fromID

        let toType = ''
        if (my_type !== active_chatroom.toType) toType = active_chatroom.toType
        else toType = active_chatroom.fromType
        this.ws.send(JSON.stringify({type: 'chatroom_update', chatroom: chatroom, to_id: to_id, to_type: toType}))
        // console.log(chatroom)
      }
    })

    this.setState({chatrooms: chatrooms}, e => this.forceUpdate())
  }


  render() {
    return ( <Chat  pharmacyid={this.state.user.pharmacyid} name={this.state.user.name} ws={this.ws} chatrooms={this.state.chatrooms} submitMessage={this.submitMessage} mark_chatroom_as_read={this.mark_chatroom_as_read} active_chatroom={this.state.active_chatroom} openChatroom={this.openChatroom} createChatroom={this.createChatroom}  logout={this.props.logout}/> )
  }
}
