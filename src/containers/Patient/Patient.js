import React from 'react';
import AddHealthData from './AddHealthData';
import Medication from './Medication';
import Temperature from './Temperature';



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

      medication_bool:   false,
      temprature_bool:   false,


      birthdate:         '',
      status:            '',
      backgroundColor:   '',
      medication:        [],
      missedMedication:  [],
      pendingMedication: [],
      temperature:       []
    };

    this.removeMedFromPending    = this.removeMedFromPending.bind(this)
  }


  componentDidMount() {
    fetch('/api/patient/health/'+this.props.user.username)
      .then(blob => blob.json())
      .then(blob => {
        console.log(blob)
        this.setState({isLoaded: true, birthdate: blob.birthdate, status: blob.status, backgroundColor: blob.backgroundColor, medication: blob.medication, missedMedication: blob.missedMedication, pendingMedication: blob.pendingMedication, temperature: blob.temperature})
      })
      .catch(error => this.setState({error: true}));
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
      return(<Medication pendingMedication={this.state.pendingMedication} username={this.props.user.username} removeMedFromPending={this.removeMedFromPending} backToDashboard={e => this.setState({medication_bool: false}) }/>)
    }

    if(this.state.temprature_bool) {
      return(<Temperature temperature={this.state.temperature} pendingMedication={this.state.pendingMedication} username={this.props.user.username} removeMedFromPending={this.removeMedFromPending} backToDashboard={e => this.setState({temprature_bool: false}) }/>)
    }

    return (
    <div className="container-fluid" style={{backgroundColor: '#f7f7f7', marginTop: '-20px', paddingTop: '30px'}}>
      <img  src={Logout} alt="logout" className="patient_logout" onClick={(e) => this.props.logout(e)}/>
      <div>
         <img  src={User_icon} alt="logout" className="user_icon" />
        <p className="patient_hello">{this.props.user.name}</p>
        <p className="patient_birthday">{ ("0" +(new Date(this.state.birthdate).getMonth() + 1 )).slice(-2) } - {new Date(this.state.birthdate).getFullYear()}</p>
      </div>

        <div className="patient_health_status">
            <h3 className="patient_status">your  health status is <span style={{color: this.state.backgroundColor}}>stable</span>.</h3>
            <p className="patient_status_task">You have completed all your tasks for today</p>
              {/*this.state.pendingMedication.length > 0 ? (
                <button className="new_entry" onClick={e => this.setState({addHealthData: true})}>New Entry</button>
              ) : (<p style={{fontSize: '18px'}}>All medication taken. Good Job!</p>)*/}

        </div>

      <p className="patient_tasks">Tasks</p>

      <div className="row">
        <div className="col-6">
          <div className="patient_task_buble_container">
            <div className=" patient_task_buble" onClick={e => this.setState({medication_bool: true})}>
              <img  src={Tasks_pill} alt="logout" className="tasks_pill" />
              <p className="patient_tasks_title"> Medication</p>
              <p  className="patient_tasks_subtitle"> Task completed</p>
            </div>
          </div>
        </div>

        <div className="col-6">
          <div className="patient_task_buble_container">
            <div className=" patient_task_buble" onClick={e => this.setState({temprature_bool: true})}>
              <img  src={Tasks_temperature} alt="logout" className="tasks_pill" />
              <p className="patient_tasks_title">Temperature</p>
              <p  className="patient_tasks_subtitle"> Task completed</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-6">
          <div className="patient_task_buble_container">
            <div className=" patient_task_buble">
              <img  src={Tasks_blood_pressure} alt="logout" className="tasks_pill" />
              <p className="patient_tasks_title"> Blood Pressure</p>
              <p  className="patient_tasks_subtitle"> Task completed</p>
            </div>
          </div>
        </div>

        <div className="col-6">
          <div className="patient_task_buble_container">
            <div className=" patient_task_buble">
              <img  src={Tasks_heart_rate} alt="logout" className="tasks_pill" />
              <p className="patient_tasks_title"> Heart Rate</p>
              <p  className="patient_tasks_subtitle"> Task completed</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row" style={{marginBottom: '20px'}}>
        <div className="col-6">
          <div className="patient_task_buble_container">
            <div className=" patient_task_buble">
              <img  src={Tasks_weight} alt="logout" className="tasks_pill" />
              <p className="patient_tasks_title"> Weight</p>
              <p  className="patient_tasks_subtitle"> Task completed</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row" style={{height: '60px'}}>
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