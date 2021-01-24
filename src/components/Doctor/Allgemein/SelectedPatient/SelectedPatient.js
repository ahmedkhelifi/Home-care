import React from 'react';

import Temperature from '../../../Graphs/28_days/Temperature';
import BloodPressure from '../../../Graphs/28_days/BloodPressure';
import Weight from '../../../Graphs/90_days/Weight';
import Pulse from '../../../Graphs/28_days/Pulse';
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

  has_missed_medication = (medication) => {
    let bool = false
    Object.values(medication).forEach( med => {
      if (med.missed.length.length > 0) bool =  true
    })

    Object.values(medication).forEach( med => {
      if (med.history.filter( entry => {return !entry.measured}).length > 0 ) bool = true
    })

    return bool
  }

  was_this_med_missed = (med) => {
    if (med.missed.length.length > 0) return true
    if (med.history.filter( entry => {return !entry.measured}).length > 0 ) return true

    return false
  }

  render() {

    document.title = "Homecare App"

    if(!this.props.patientSelectedBool) {
      return (
        <div className="col-12 full_height_patient_health_show">
          <p className="vertical_horizontnal_center" style={{fontSize: '20px', textAlign: 'center', color: 'gray'}}> Select patient to see Data </p> 
        </div>

      )
    }
    else {
      return (
        <div className="col-12 full_height_patient_health_show">
          <p style={{marginTop: '4px', fontSize: '15px', marginBottom: '-13px', color: '#5b7da1'}} >Report</p>
          <p style={{marginTop: '10px', fontSize: '19px', fontWeight: 'bold'}} >{this.props.selectedPatient.firstname + ' ' + this.props.selectedPatient.lastname} <span style={{cursor: 'pointer', color: 'gray', fontSize: '14px', fontWeight: '100'}} onClick={() => this.props.openProfile() }>(view all data &#10230;)</span></p>

          <p style={{marginTop: '30px', fontSize: '20px', textAlign: 'center'}} > Health Data </p>

          { this.has_missed_medication(this.props.selectedPatient.health.medication) ? (<p style={{marginTop: '10px', fontSize: '15px', fontWeight: 'bold'}} >Missed medication:</p>) : (null)}

          { this.has_missed_medication(this.props.selectedPatient.health.medication) ? (
            <div className="container" style={{backgroundColor: '#f7f7f7', paddingTop: '10px', borderRadius: '7px'}}>
            {Object.values(this.props.selectedPatient.health.medication).map (med => { if (this.was_this_med_missed(med)) return (
              <div className="row">
                <div className="col-12">
                  <p style={{color: 'black'}} >{med.title}</p>
                  
                  <p style={{fontSize: '15px', fontStyle: 'italic', marginTop: '-15px', paddingLeft: '20px'}} > - Confirmed Missed Doses: on {med.history.filter( entry => {return !entry.measured}).length} days 

                      {med.history.filter( entry => {return !entry.measured}).length > 0 && this.props.selectedPatient.health.first_step_points > 5 ? (<span style={{color: 'red', fontSize: '12px'}} > ({3* med.history.filter( entry => {return !entry.measured}).length} points)</span>) : (null)} 

                      {med.history.filter( entry => {return !entry.measured}).length > 0 && this.props.selectedPatient.health.first_step_points >= 2 && this.props.selectedPatient.health.first_step_points <= 5 ? (<span style={{color: '#ffc459', fontSize: '12px'}} > ({2* med.history.filter( entry => {return !entry.measured}).length} points)</span>) : (null)} 

                      {med.history.filter( entry => {return !entry.measured}).length > 0 && this.props.selectedPatient.health.first_step_points < 2 ? (<span style={{color: 'green', fontSize: '12px'}} > ({med.history.filter( entry => {return !entry.measured}).length} points)</span>) : (null)} 
                  </p>
                  
                  <p style={{fontSize: '15px', fontStyle: 'italic', marginTop: '-10px', paddingLeft: '20px'}} > - Non Confirmed Missed Doses: on {med.missed.length} days

                      {med.missed.length > 0 && this.props.selectedPatient.health.first_step_points > 5 ? (<span style={{color: 'red', fontSize: '12px'}} > ({3* med.history.missed.length} points)</span>) : (null)} 

                      {med.missed.length > 0 && this.props.selectedPatient.health.first_step_points >= 2 && this.props.selectedPatient.health.first_step_points <= 5 ? (<span style={{color: '#ffc459', fontSize: '12px'}} > ({2* med.missed.length} points)</span>) : (null)} 

                      {med.missed.length > 0 && this.props.selectedPatient.health.first_step_points < 2 ? (<span style={{color: 'green', fontSize: '12px'}} > ({med.missed.length} points)</span>) : (null)} 

                  </p>
                </div>
              </div>
            )})}
            </div>
            ) : (null)}
         

          <p style={{marginTop: '10px', fontSize: '15px', fontWeight: 'bold'}} >Physical State:</p>

          <Temperature temperatures={this.props.selectedPatient.health.temperatures}/>
          <BloodPressure blood_pressures={this.props.selectedPatient.health.blood_pressures}/>
		      <Pulse pulses={this.props.selectedPatient.health.pulses}/>
          <Weight weights={this.props.selectedPatient.health.weights}/>

        </div>

      )
    }
  }
}