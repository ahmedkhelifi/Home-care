import React from 'react';
import Temperature from '../../../Graphs/Temperature';
import BloodPressure from '../../../Graphs/BloodPressure';
import Weight from '../../../Graphs/Weight';
// import Medication from '../../components/Patient/Medication';
// import Temperature from '../../components/Patient/Temperature';
// import Weight from '../../components/Patient/Weight';
// import Pulse from '../../components/Patient/Pulse';
// import BloodPressure from '../../components/Patient/BloodPressure';



// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

// import Logout from'../../images/logout.png';

// import Home_botton from'../../images/Home_botton.png';
// import Chat_menu from'../../images/Chat_menu.png';
// import Settings_wheel from'../../images/settings_wheel.png';

// import User_icon from'../../images/User_icon_BLACK-01.png';
// import Tasks_pill from'../../images/tasks_pill.png';
// import Tasks_temperature from'../../images/tasks_temperature.png';
// import Tasks_blood_pressure from'../../images/blood_pressure.png';
// import Tasks_heart_rate from'../../images/heart_rate.png';
// import Tasks_weight from'../../images/weight-clipart-black-and-white-3.png';


export default class SelectedPatient extends React.PureComponent { 

  constructor(props) {
    super(props);
    this.state = {
      error:             false,
      isLoaded:          false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    window.scrollTo({ top: 0 });
  }
  render() {

    document.title = "Homecare App"

    if(!this.props.patientSelectedBool) {
      return (
        <div className="col-12 full_height_patient_health_show">
          <p className="vertical_horizontnal_center" style={{fontSize: '23px', textAlign: 'center'}}> Select Patient to see Data </p> 
        </div>

      )
    }
    else {
      return (
        <div className="col-12 full_height_patient_health_show">
          <p style={{marginTop: '10px', fontSize: '19px', fontWeight: 'bold'}} >{this.props.selectedPatient.firstname + ' ' + this.props.selectedPatient.lastname}</p>

          <p style={{marginTop: '30px', fontSize: '20px', textAlign: 'center'}} > Health Data </p>

          <p style={{marginTop: '10px', fontSize: '15px', fontWeight: 'bold'}} >Medication:</p>

          <div className="container" style={{backgroundColor: '#f7f7f7', paddingTop: '10px', borderRadius: '7px'}}>
            {Object.values(this.props.selectedPatient.health.medication).map (med => {return (
              <div className="row">
                <div className="col-12">
                  <p style={{color: 'black'}} >{med.title}</p>
                  <p style={{fontSize: '15px', fontStyle: 'italic', marginTop: '-15px', paddingLeft: '20px'}} > - Confirmed Missed Doses: on {med.history.filter( entry => {return !entry.measured}).length} days</p>
                  <p style={{fontSize: '15px', fontStyle: 'italic', marginTop: '-10px', paddingLeft: '20px'}} > - Non Confirmed Missed Doses: on {med.missed.length} days</p>
                </div>
              </div>
            )})}
          </div>

          <p style={{marginTop: '10px', fontSize: '15px', fontWeight: 'bold'}} >Physical State:</p>

          <div style={{position: 'absolute', top:'14px', right: '10px'}}> <p style={{fontSize: '13px'}}>Time: <span className="_days_7_left"> 7 days</span> <span className="_days_7_right"> 30 days</span> </p> </div>

          <Temperature temperatures={this.props.selectedPatient.health.temperatures}/>

          <BloodPressure blood_pressures={this.props.selectedPatient.health.blood_pressures}/>
          <Weight weights={this.props.selectedPatient.health.weights}/>

        </div>

      )
    }
  }
}