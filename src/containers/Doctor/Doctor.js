import React from 'react';
import Cookies from 'js-cookie';

import Patient         from  '../Patient';


import Login         from  '../../components/Login';
import Allgemein     from  '../../components/Doctor/Allgemein';
import PatientList     from  '../../components/Doctor/PatientList';
import AdminSidebar     from  '../../components/Doctor/AdminSidebar';
import Chat     from  '../../components/Doctor/Chat';

import './style.css';
const URL = 'ws://localhost:5000'

export default class Doctor extends React.PureComponent {

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
    this.logout            = this.logout.bind(this)
    this.tabOpened         = <Allgemein refresh={false} />
  }

  ws = new WebSocket(URL)

  componentDidMount() {
    this.ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log('connected')
      const message = { id: this.state.user.doctorid, name: this.state.user.name, idType: 'doctor', type: 'online'}
      this.ws.send(JSON.stringify(message))
    }

    this.ws.onmessage = evt => {
      // on receiving a message, add it to the list of messages
      const message = JSON.parse(evt.data)
      // this.addMessage(message)
      if(message.type === 'ping' && this.state.ID !== -1){
              console.log('ping')
        const message = { id: this.state.user.doctorid, idType: 'doctor', type: 'pong' }
        this.ws.send(JSON.stringify(message))
      }

      if(message.type === 'set_chatrooms') {
              // console.log('ping')
        // const message = { id: this.props.user.patientid, idType: 'patient', type: 'pong' }
        // this.ws.send(JSON.stringify(message))
        // console.log(message.chatrooms)
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
          this.setState(state => ({ chatrooms: [...state.chatrooms, message.chatroom] }))          
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

    // this.get_messages()
    // this.getDoctors()
    // this.scrollToBottom();
  }

  // componentDidMount(){
  //   var cookies = Cookies.get()
  //   if(cookies.hasOwnProperty('authenticated') && cookies.hasOwnProperty('user')) {
  //     if(cookies.authenticated) this.setState({authenticated: true, user: JSON.parse(Cookies.get('user'))})
  //   }
  // }

  /*
  *     Call right component when Admin Dashboard sidebar tabs are clicked
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

  logout(){
    this.setState({authenticated: false, user: {}})
    Cookies.remove('authenticated')
    Cookies.remove('user')
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

  createChatroom = (doctor, name) => {
    let chatroom = {chatroom_id: new Date().valueOf(), name: name, toID: doctor.id, to: doctor.name, toType: 'patient', fromID: this.state.user.doctorid, from: this.state.user.name, fromType: 'doctor',  messages:{messages:[{timestamp: new Date().valueOf(), type: 'created', read: true}]}}
    // console.log(doctor.name)
    this.setState(state => ({ chatrooms: [...state.chatrooms, chatroom].sort(( a, b ) => this.compare_chatrooms(a,b))}))
  }

  submitMessage = (messageString) => {
    // on submitting the ChatInput form, send the message, add it to the list and reset the input
    const message = {message: messageString, fromType: 'doctor', toType: 'patient', timestamp: new Date().valueOf(), read: false, type: 'message'}
    let active_chatroom = this.state.active_chatroom
    active_chatroom.messages.messages.push(message)
    let to_id = ''
    if('doctor' !== active_chatroom.fromType) to_id = active_chatroom.fromID
    else to_id = active_chatroom.toID
    console.log('toID : ' + to_id)
    let to_type = 'patient'
    this.ws.send(JSON.stringify({type: 'chatroom_update', chatroom: active_chatroom, to_id: to_id, to_type: to_type}))
    // this.addMessage(message)
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
          if(!message.read &&  message.fromType !== 'doctor') message.read = true
        })
        let to_id = ''
        if(chatroom.toType !== 'doctor') to_id = chatroom.toID
        else to_id = chatroom.fromID
        this.ws.send(JSON.stringify({type: 'chatroom_update', chatroom: chatroom, to_id: to_id, to_type: 'patient'}))
        // console.log(chatroom)
      }

          
    })

    this.setState({chatrooms: chatrooms}, e => this.forceUpdate())
  }


  render() {
          return (
            <section>

              <div className="wrapper">

                  <AdminSidebar firstname={this.props.firstname} tabClicked={this.tabClicked} openedTab={this.state.openedTab} chatrooms={this.state.chatrooms} logout={this.logout}/>

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
