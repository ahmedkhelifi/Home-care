import React from 'react';
import Medication from '../../components/Patient/Medication';
import Temperature from '../../components/Patient/Temperature';
import Weight from '../../components/Patient/Weight';
import Pulse from '../../components/Patient/Pulse';
import BloodPressure from '../../components/Patient/BloodPressure';

import Chat from '../../components/Patient/Chat';



import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import Logout from'../../images/logout.png';

import Home_botton from'../../images/Home_botton.png';
import Chat_menu from'../../images/Chat_menu.png';
import Settings_wheel from'../../images/settings_wheel.png';

import User_icon from'../../images/User_icon_BLACK-01.png';
import Tasks_pill from'../../images/tasks_pill.png';
import Tasks_temperature from'../../images/tasks_temperature.png';
import Tasks_blood_pressure from'../../images/blood_pressure.png';
import Tasks_heart_rate from'../../images/heart_rate.png';
import Tasks_weight from'../../images/weight-clipart-black-and-white-3.png';

const URL = 'ws://localhost:5000'
var my_type = 'patient'

export default class Patient extends React.PureComponent { 

  constructor(props) {
    super(props);
    this.state = {
      error:             false,
      isLoaded:          false,
      patientid:         this.props.user.patientid,
      name:              this.props.user.name,

      finishedTasks:     true,

      medication_bool:   false,
      temprature_bool:   false,
      weight_bool:       false,
      blood_pressure_bool:false,
      pulse_bool:        false,


      birthdate:         '',
      status:            '',
      backgroundColor:   '',
      medication:        [],
      missedMedication:  [],
      pendingMedication: [],
      temperature:       [],
      temperatures:      {},
      weights:           {},
      pulses:            {},
      blood_pressures:   {},
      chatWindow:        false,

      chatrooms: [],
      active_chatroom: null,
    };

    this.removeMedFromPending    = this.removeMedFromPending.bind(this)
  }

  ws = new WebSocket(URL)

  componentDidMount() {
    this.get_health()

    this.ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log('connected')
      const message = { id: this.props.user.patientid, name: this.props.user.name, idType: 'patient', type: 'online'}
      this.ws.send(JSON.stringify(message))
    }

    this.ws.onmessage = evt => {
      // on receiving a message, add it to the list of messages
      const message = JSON.parse(evt.data)
      // this.addMessage(message)
      if(message.type === 'ping') {
              // console.log('ping')
        const message = { id: this.props.user.patientid, idType: 'patient', type: 'pong' }
        this.ws.send(JSON.stringify(message))
      }

      if(message.type === 'set_chatrooms') {
              // console.log('ping')
        // const message = { id: this.props.user.patientid, idType: 'patient', type: 'pong' }
        // this.ws.send(JSON.stringify(message))
        console.log(message.chatrooms)
        this.setState({chatrooms : message.chatrooms})
      }

      if(message.type === 'update_chatroom'){
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
  }

  get_health = () => {
    fetch('/api/patient/health/'+this.props.user.username)
      .then(blob => blob.json())
      .then(blob => {
        console.log(blob)
        let missed = false
        
        blob.medication.forEach( med  => {
          if(med.missed.length !== 0 )
            missed = true
        })

        let finishedTasks = this.checkFinishedTasksStatus(blob)

        console.log(finishedTasks)


        this.setState({isLoaded: true, birthdate: blob.birthdate, status: blob.status, backgroundColor: blob.backgroundColor, medication: blob.medication, temperature: blob.temperature, temperatures: blob.temperatures, weights: blob.weights, pulses: blob.pulses, blood_pressures: blob.blood_pressures, finishedTasks: finishedTasks }, () => this.forceUpdate())

      })
      .catch(error => this.setState({error: true}));
  }

  checkFinishedTasksStatus = (blob) => {
    let finishedTasks =  {missed: false, pending : false}
    blob.medication.forEach(med => {
      if(med.missed.length > 0) finishedTasks.missed = true
      if(med.pending.length > 0) finishedTasks.pending =  true
    })

    if(blob.temperatures.pending.length > 0) finishedTasks.pending = true
    if(blob.temperatures.missed.length > 0) finishedTasks.missed = true

    if(blob.blood_pressures.pending.length > 0) finishedTasks.pending = true
    if(blob.blood_pressures.missed.length > 0) finishedTasks.missed = true

    if(blob.weights.pending.length > 0) finishedTasks.pending = true
    if(blob.weights.missed.length > 0) finishedTasks.missed = true

    if(blob.pulses.pending.length > 0) finishedTasks.pending = true
    if(blob.pulses.missed.length > 0) finishedTasks.missed = true

    blob.medication.forEach( med => {
      if(med.pending.length > 0) finishedTasks.pending = true
      if(med.missed.length > 0) finishedTasks.missed = true
    })

    return finishedTasks
  }

  removeMedFromPending(med_title){
    let pendingMedication = this.state.pendingMedication
    const index = pendingMedication.findIndex(x => x.title === med_title);
    if (index !== -1 && index !== undefined) 
      pendingMedication.splice(index, 1);
      this.setState({ pendingMedication: pendingMedication })
  }

  is_there_missed_med = () => {
    let bool_missed = false
    let bool_pending = false

    this.state.medication.forEach( med => {
      if(med.pending.length > 0) bool_pending = true
      if(med.missed.length > 0) bool_missed = true
    })

    return {missed: bool_missed, pending: bool_pending}
  }


  /*CHAT PART*/

  compare_chatrooms = ( a, b ) => {
    if ( a.messages.messages[a.messages.messages.length-1].timestamp > b.messages.messages[b.messages.messages.length-1].timestamp ){
      return -1;
    }
    if ( a.messages.messages[a.messages.messages.length-1].timestamp < b.messages.messages[b.messages.messages.length-1].timestamp ){
      return 1;
    }
    return 0;
  }


  createChatroom = (doctor, pharmacy, name) => {
    let chatroom = {}
    if(doctor.hasOwnProperty('id')){
      chatroom = {chatroom_id: new Date().valueOf(), name: name, toID: doctor.id, to: doctor.name, toType: 'doctor', fromID: this.state.user.doctorid, from: this.state.user.name, fromType: my_type,  messages:{messages:[{timestamp: new Date().valueOf(), type: 'created', read: true}]}}
    } else {
      chatroom = {chatroom_id: new Date().valueOf(), name: name, toID: pharmacy.id, to: pharmacy.name, toType: 'pharmacy', fromID: this.state.user.doctorid, from: this.state.user.name, fromType: my_type,  messages:{messages:[{timestamp: new Date().valueOf(), type: 'created', read: true}]}}
    }
    // console.log(chatroom)
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
    console.log('mark_chatroom_as_read')
    let chatrooms = this.state.chatrooms
    chatrooms.forEach(chatroom => {
      if( chatroom.chatroom_id === active_chatroom.chatroom_id) {
        chatroom.messages.messages.forEach(message => {
          if(!message.read &&  message.fromType !== my_type) message.read = true
        })
        let to_id = ''
        if(chatroom.toType !== my_type) to_id = chatroom.toID
        else to_id = chatroom.fromID

        let toType = ''
        if (my_type !== active_chatroom.toType) toType = active_chatroom.toType
        else toType = active_chatroom.fromType

        console.log({type: 'chatroom_update', chatroom: chatroom, to_id: to_id, to_type: toType})

        this.ws.send(JSON.stringify({type: 'chatroom_update', chatroom: chatroom, to_id: to_id, to_type: toType}))
        // console.log(chatroom)
      }

          
    })

    this.setState({chatrooms: chatrooms}, e => this.forceUpdate())
  }

  get_unread_messages_number = () => {
    let number =  0
    this.state.chatrooms.forEach(chatroom =>  {
      if (chatroom.messages.messages[chatroom.messages.messages.length-1].fromType !== 'patient' && !chatroom.messages.messages[chatroom.messages.messages.length-1].read){
        number += 1
      }
    })

    return number
  }

  render() {

    document.title = "Homecare App"

    if(!this.state.isLoaded){
      return(<p></p>)
    }

    if(this.state.chatWindow){
      return( <Chat patientid={this.props.user.patientid} name={this.state.name} goBack={e => this.setState({chatWindow: false})} chatrooms={this.state.chatrooms} submitMessage={this.submitMessage} mark_chatroom_as_read={this.mark_chatroom_as_read} active_chatroom={this.state.active_chatroom} openChatroom={this.openChatroom} createChatroom={this.createChatroom} get_unread_messages_number={this.get_unread_messages_number} goBack={() => this.setState({active_chatroom: null})}/> )
    }

    if(this.state.medication_bool) {
      return(<Medication  medication={this.state.medication}  missedMedication={this.state.missedMedication} username={this.props.user.username} removeMedFromPending={this.removeMedFromPending} backToDashboard={e => this.setState({medication_bool: false}) } get_health={this.get_health} is_there_missed_med={this.is_there_missed_med}/>)
    }

    if(this.state.temprature_bool) {
      return(<Temperature temperature={this.state.temperature} temperatures={this.state.temperatures} pendingMedication={this.state.pendingMedication} username={this.props.user.username} removeMedFromPending={this.removeMedFromPending} backToDashboard={e => this.setState({temprature_bool: false}) } get_health={this.get_health}/>)
    }

    if(this.state.weight_bool) {
      return(<Weight weights={this.state.weights} username={this.props.user.username} backToDashboard={e => this.setState({weight_bool: false}) } get_health={this.get_health}/>)
    }

    if(this.state.blood_pressure_bool) {
      return(<BloodPressure blood_pressures={this.state.blood_pressures} username={this.props.user.username} backToDashboard={e => this.setState({blood_pressure_bool: false}) } get_health={this.get_health}/>)
    }

    if(this.state.pulse_bool) {
      return(<Pulse pulses={this.state.pulses} username={this.props.user.username} backToDashboard={e => this.setState({pulse_bool: false}) } get_health={this.get_health}/>)
    }

    return (
    <div className="container-fluid" style={{backgroundColor: '#f7f7f7', marginTop: '-20px', paddingTop: '30px'}}>
      <img  src={Logout} alt="logout" className="patient_logout" onClick={(e) => this.props.logout(e)}/>
      <div>
         <img  src={User_icon} alt="logout" className="user_icon" />
        <p className="patient_hello">{this.props.user.name}</p>
        <p className="patient_birthday">{ ("0" +(new Date(this.state.birthdate).getMonth() + 1 )).slice(-2) } - {new Date(this.state.birthdate).getFullYear()}</p>
      </div>

        
            {/*!this.state.finishedTasks.missed && !this.state.finishedTasks.pending ? (
            <div className="patient_health_status">
              <h3 className="patient_status">your  health status is <span style={{color: this.state.backgroundColor}}>stable</span>.</h3>
              <p className="patient_status_task">You have completed all your tasks for today</p>
            </div>
            ) : (null)*/}

            {this.state.finishedTasks.missed > 0 ? (
            <div className="patient_health_status" style={{backgroundColor: '#ff918ba6'}}>
              <h3 className="patient_status">You have missed to add some data.</h3>
              <p className="patient_status_task">Make sure you add  your data at the right time!</p>
            </div>
            ) : (null)}

            {this.state.finishedTasks.pending > 0 && !this.state.finishedTasks.missed ? (
            <div className="patient_health_status" style={{backgroundColor: '#ffc459a1'}}>
              <h3 className="patient_status">You have some pending tasks for today.</h3>
              <p className="patient_status_task">Make sure you add  your data at the right time!</p>
            </div>
            ) : (null)}


       

      <p className="patient_tasks">Tasks</p>

      <div className="row">
        <div className="col-6">
          <div className="patient_task_buble_container">
            <div className=" patient_task_buble" onClick={e => this.setState({medication_bool: true})}>
              <img  src={Tasks_pill} alt="logout" className="tasks_pill" />
              <p className="patient_tasks_title"> Medication</p>
              {this.is_there_missed_med().missed ? (<p  className="patient_tasks_subtitle" style={{color: 'red'}}>Missed tasks</p>) : (null)}
              {!this.is_there_missed_med().missed &&  this.is_there_missed_med().pending ? (<p  className="patient_tasks_subtitle" style={{color: '#f58900'}}>Pending task</p>) : (null)}
              {!this.is_there_missed_med().missed &&  !this.is_there_missed_med().pending ? ( <p  className="patient_tasks_subtitle"> Task completed</p>) : (null)}
            </div>
          </div>
        </div>

        <div className="col-6">
          <div className="patient_task_buble_container">
            <div className=" patient_task_buble" onClick={e => this.setState({temprature_bool: true})}>
              <img  src={Tasks_temperature} alt="logout" className="tasks_pill" />
              <p className="patient_tasks_title">Temperature</p>
              {this.state.temperatures.missed.length > 0 ? (<p  className="patient_tasks_subtitle" style={{color: 'red'}}>Missed tasks</p>) : (null)}
              {this.state.temperatures.missed.length === 0 &&  this.state.temperatures.pending.length > 0 ? (<p  className="patient_tasks_subtitle" style={{color: '#f58900'}}>Pending task</p>) : (null)}
              {this.state.temperatures.missed.length === 0 &&  this.state.temperatures.pending.length === 0 ? ( <p  className="patient_tasks_subtitle"> Task completed</p>) : (null)}
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-6">
          <div className="patient_task_buble_container">
            <div className=" patient_task_buble" onClick={e => this.setState({blood_pressure_bool: true})}>
              <img  src={Tasks_blood_pressure} alt="logout" className="tasks_pill" />
              <p className="patient_tasks_title"> Blood Pressure</p>
              {this.state.blood_pressures.missed.length > 0 ? (<p  className="patient_tasks_subtitle" style={{color: 'red'}}>Missed tasks</p>) : (null)}
              {this.state.blood_pressures.missed.length === 0 &&  this.state.blood_pressures.pending.length > 0 ? (<p  className="patient_tasks_subtitle" style={{color: '#f58900'}}>Pending task</p>) : (null)}
              {this.state.blood_pressures.missed.length === 0 &&  this.state.blood_pressures.pending.length === 0 ? ( <p  className="patient_tasks_subtitle"> Task completed</p>) : (null)}
            </div>
          </div>
        </div>

        <div className="col-6">
          <div className="patient_task_buble_container">
            <div className=" patient_task_buble" onClick={e => this.setState({pulse_bool: true})}>
              <img  src={Tasks_heart_rate} alt="logout" className="tasks_pill" />
              <p className="patient_tasks_title">Pulse</p>
              {this.state.pulses.missed.length > 0 ? (<p  className="patient_tasks_subtitle" style={{color: 'red'}}>Missed tasks</p>) : (null)}
              {this.state.pulses.missed.length === 0 &&  this.state.pulses.pending.length > 0 ? (<p  className="patient_tasks_subtitle" style={{color: '#f58900'}}>Pending task</p>) : (null)}
              {this.state.pulses.missed.length === 0 &&  this.state.pulses.pending.length === 0 ? ( <p  className="patient_tasks_subtitle"> Task completed</p>) : (null)}
            </div>
          </div>
        </div>
      </div>

      <div className="row" style={{marginBottom: '20px'}}>
        <div className="col-6">
          <div className="patient_task_buble_container">
            <div className=" patient_task_buble" onClick={e => this.setState({weight_bool: true})}>
              <img  src={Tasks_weight} alt="logout" className="tasks_pill" />
              <p className="patient_tasks_title"> Weight</p>
              {this.state.weights.missed.length > 0 ? (<p  className="patient_tasks_subtitle" style={{color: 'red'}}>Missed tasks</p>) : (null)}
              {this.state.weights.missed.length === 0 &&  this.state.weights.pending.length > 0 ? (<p  className="patient_tasks_subtitle" style={{color: '#f58900'}}>Pending task</p>) : (null)}
              {this.state.weights.missed.length === 0 &&  this.state.weights.pending.length === 0 ? ( <p  className="patient_tasks_subtitle"> Task completed</p>) : (null)}
            </div>
          </div>
        </div>
      </div>

      <div className="row" style={{height: '90px'}}>
        <div className="col-6">
          </div>
        </div>

<div className="navbar row">
  <div className=" col-4">
    <img  src={Home_botton} alt="home" className="menu_logo"/>
    <a style={{fontWeight: 'bold'}}>Home</a>
  </div>
  <div className=" col-4" onClick={e => this.setState({chatWindow: true})}>
    <img  src={Chat_menu} alt="History" className="menu_logo"/>
    <a>Chat {this.get_unread_messages_number() > 0 ? (<span>({this.get_unread_messages_number()})</span>) : (null) }</a>
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