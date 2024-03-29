import React from 'react';
import Cookies from 'js-cookie';
import Patient from  '../Patient';
import Login from  '../../components/Login';
import Allgemein from  '../../components/Doctor/Allgemein';
import PatientList from  '../../components/Doctor/PatientList';
import Sidebar from  '../../components/Doctor/Sidebar';
import Chat from  '../../components/Doctor/Chat';


const URL = 'ws://localhost:5000'
var my_type = 'doctor'

export default class Doctor extends React.Component {

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

    this.tabClicked        = this.tabClicked.bind(this)
    this.tabOpened         = <Allgemein refresh={false} />
  }

  ws = new WebSocket(URL)

  componentDidMount() {
    this.ws.onopen = () => {
      const message = { id: this.state.user.doctorid, name: this.state.user.name, idType: my_type, type: 'online'}
      this.ws.send(JSON.stringify(message))
    }

    this.ws.onmessage = evt => {
      const message = JSON.parse(evt.data)
      if(message.type === 'ping' && this.state.ID !== -1){  //send ping to confirm being online
        const message = { id: this.state.user.doctorid, idType: my_type, type: 'pong' }
        this.ws.send(JSON.stringify(message)) // and send pong message
      }

      if(message.type === 'set_chatrooms') { //used to load chatrooms when user connects
        this.setState({chatrooms : message.chatrooms})
      }

      if(message.type === 'update_chatroom'){ //called when user receives a new message to update chatroom
        let chatrooms = this.state.chatrooms
        let updated_chatroom = chatrooms.filter(chatroom =>  chatroom.chatroom_id === message.chatroom.chatroom_id && chatroom.toType === message.chatroom.toType && chatroom.fromType === message.chatroom.fromType && chatroom.fromID === message.chatroom.fromID && chatroom.toID === message.chatroom.toID)

        if(updated_chatroom.length > 0) {
          chatrooms.forEach(chatroom => {
            if( chatroom.chatroom_id === message.chatroom.chatroom_id && chatroom.toType === message.chatroom.toType && chatroom.fromType === message.chatroom.fromType && chatroom.fromID === message.chatroom.fromID && chatroom.toID === message.chatroom.toID)
              chatroom.messages =  message.chatroom.messages
          })
          this.setState({chatrooms: chatrooms}, e => this.forceUpdate())
        } else {
          this.setState(state => ({ chatrooms: [...state.chatrooms, message.chatroom] }), e => this.forceUpdate())          
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

  /*
  *     Call right component when sidebar tabs are clicked
  */

  tabClicked(e, id){
    var target = e.target.id
    this.setState({refresh: this.state.openedTab === target})

    switch (target) {
           case "Allgemein":
               this.setState({ openedTab: 'Allgemein',active_chatroom: null});
               break;

            case "PatientList": 
               this.setState({ openedTab: 'PatientList',active_chatroom: null});
               break;
            case "Chat": 
               this.setState({ openedTab: 'Chat'});
               break;

            default:
               this.setState({ openedTab: 'Allgemein',active_chatroom: null});
               break;
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

  createChatroom = (patient, pharmacy, name) => {
    let chatroom = {}
    if(patient.hasOwnProperty('id')){
      chatroom = {chatroom_id: new Date().valueOf(), name: name, toID: patient.id, to: patient.name, toType: 'patient', fromID: this.state.user.doctorid, from: this.state.user.name, fromType: my_type,  messages:{messages:[{timestamp: new Date().valueOf(), type: 'created', read: true}]}}
    } else {
      chatroom = {chatroom_id: new Date().valueOf(), name: name, toID: pharmacy.id, to: pharmacy.name, toType: 'pharmacy', fromID: this.state.user.doctorid, from: this.state.user.name, fromType: my_type,  messages:{messages:[{timestamp: new Date().valueOf(), type: 'created', read: true}]}}
    }
    this.setState(state => ({ chatrooms: [...state.chatrooms, chatroom].sort(( a, b ) => this.compare_chatrooms(a,b))}))
  }

  submitMessage = (messageString) => {
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
      }
          
    })

    this.setState({chatrooms: chatrooms}, e => this.forceUpdate())
  }


  render() {
          return (
            <section>
              <div className="wrapper">
                  <Sidebar firstname={this.props.firstname} tabClicked={this.tabClicked} openedTab={this.state.openedTab} chatrooms={this.state.chatrooms} logout={this.props.logout}/>
                  <div className="main-panel" style={{backgroundColor: '#f5f6f8', minHeight: '100vh'}}>
                          {this.state.openedTab === 'Allgemein'        ? (<div className="content"><Allgemein  /> </div>) : (null)}
                          {this.state.openedTab === 'PatientList'      ? (<div className="content"><PatientList  /> </div>) : (null)}
                          {this.state.openedTab === 'Chat'             ? (<Chat  doctorid={this.state.user.doctorid} name={this.state.user.name} ws={this.ws} chatrooms={this.state.chatrooms} submitMessage={this.submitMessage} mark_chatroom_as_read={this.mark_chatroom_as_read} active_chatroom={this.state.active_chatroom} openChatroom={this.openChatroom} createChatroom={this.createChatroom}/>) : (null)}
                  </div>
              </div>
            </section>
          )
  }
}
