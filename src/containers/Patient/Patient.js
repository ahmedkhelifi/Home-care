import React from 'react';
import Medication from '../../components/Patient/Medication';
import Temperature from '../../components/Patient/Temperature';
import Weight from '../../components/Patient/Weight';
import Pulse from '../../components/Patient/Pulse';
import BloodPressure from '../../components/Patient/BloodPressure';



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


export default class Patient extends React.PureComponent { 

  constructor(props) {
    super(props);
    this.state = {
      error:             false,
      isLoaded:          false,

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
    };

    this.removeMedFromPending    = this.removeMedFromPending.bind(this)
  }


  componentDidMount() {
    this.get_health()
  }

  get_health = () => {
    fetch('/api/patient/health/'+this.props.user.username)
      .then(blob => blob.json())
      .then(blob => {
        
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

    console.log(blob)

    if(blob.temperatures.pending.length > 0) finishedTasks.pending = true
    if(blob.temperatures.missed.length > 0) finishedTasks.missed = true

      console.log(blob)

    if(blob.blood_pressures.pending.length > 0) finishedTasks.pending = true
    if(blob.blood_pressures.missed.length > 0) finishedTasks.missed = true

    if(blob.weights.pending.length > 0) finishedTasks.pending = true
    if(blob.weights.missed.length > 0) finishedTasks.missed = true

    if(blob.pulses.pending.length > 0) finishedTasks.pending = true
    if(blob.pulses.missed.length > 0) finishedTasks.missed = true
   

    return finishedTasks
  }

  removeMedFromPending(med_title){
    let pendingMedication = this.state.pendingMedication
    const index = pendingMedication.findIndex(x => x.title === med_title);
    if (index !== -1 && index !== undefined) 
      pendingMedication.splice(index, 1);
      this.setState({ pendingMedication: pendingMedication })
  }

  render() {

    document.title = "Homecare App"

    if(!this.state.isLoaded){
      return(<p></p>)
    }

    if(this.state.medication_bool) {
      return(<Medication  medication={this.state.medication}  missedMedication={this.state.missedMedication} username={this.props.user.username} removeMedFromPending={this.removeMedFromPending} backToDashboard={e => this.setState({medication_bool: false}) } get_health={this.get_health}/>)
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

        
            {!this.state.finishedTasks.missed && !this.state.finishedTasks.pending ? (
            <div className="patient_health_status">
              <h3 className="patient_status">your  health status is <span style={{color: this.state.backgroundColor}}>stable</span>.</h3>
              <p className="patient_status_task">You have completed all your tasks for today</p>
            </div>
            ) : (null)}

            {this.state.finishedTasks.missed > 0 ? (
            <div className="patient_health_status" style={{backgroundColor: '#ff918ba6'}}>
              <h3 className="patient_status">You have missed to add some data.</h3>
              <p className="patient_status_task">Make sure you add  your data at the right time!</p>
            </div>
            ) : (null)}

            {this.state.finishedTasks.pending > 0 && !this.state.finishedTasks.missed ? (
            <div className="patient_health_status">
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
              <p  className="patient_tasks_subtitle" style={{color: 'red'}}> pending not correct :D</p>
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
    <a href="#home">Home</a>
  </div>
  <div className=" col-4">
    <img  src={Chat_menu} alt="History" className="menu_logo"/>
    <a href="#History">Chat</a>
  </div>
  <div className=" col-4">
    <img  src={Settings_wheel} alt="Settings" className="menu_logo"/>
    <a href="#Settings" style={{textAlign: 'center'}}>Settings</a>
  </div>
</div>

    </div>
    );
  }
}