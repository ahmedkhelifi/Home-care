import React from 'react';

import PointsOverview from './PointsOverview';

import Temperature from '../../../Graphs/28_days/Temperature';
import BloodPressure from '../../../Graphs/28_days/BloodPressure';
import Weight from '../../../Graphs/90_days/Weight';
import Pulse from '../../../Graphs/28_days/Pulse';

import User_Icon from'../../../../images/User_icon_BLACK-01.png';


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
          <img  src={User_Icon} alt="logout" className="user_cion_next_to_name" />
          <p style={{paddingTop: '10px', fontSize: '19px', fontWeight: 'bold', display: 'inline-block', marginTop: '5px'}} >{this.props.selectedPatient.firstname + ' ' + this.props.selectedPatient.lastname} <span style={{cursor: 'pointer', color: 'gray', fontSize: '14px', fontWeight: '100'}} onClick={() => this.props.openProfile() }>(view all data &#10230;)</span></p>

          <p style={{marginTop: '50px', fontSize: '20px', textAlign: 'center', color: 'rgb(74 122 173)', fontWeight: 'bold'}}> Points overview </p>

          <PointsOverview health={this.props.selectedPatient.health} />

          <p style={{marginTop: '30px', fontSize: '20px', textAlign: 'center', color: 'rgb(74 122 173)', fontWeight: 'bold'}} > Health Data overview </p>

          <Temperature temperatures={this.props.selectedPatient.health.temperatures}/>
          <BloodPressure blood_pressures={this.props.selectedPatient.health.blood_pressures}/>
		      <Pulse pulses={this.props.selectedPatient.health.pulses}/>
          <Weight weights={this.props.selectedPatient.health.weights}/>

        </div>

      )
    }
  }
}