import React from 'react';

import Temperature from '../../Graphs/all_days/Temperature';
import BloodPressure from '../../Graphs/all_days/BloodPressure';
import Pulse from '../../Graphs/all_days/Pulse';
import Weight from '../../Graphs/all_days/Weight';

import Edit from '../PatientList/Edit';
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




export default class PatientProfile extends React.PureComponent { 

  constructor(props) {
    super(props);
    this.state = {
      error:             false,
      isLoaded:          false,
      edit:              false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    window.scrollTo({ top: 0 });
  }

  beautify_timestamp = (unix_timestamp) => {
    let a = new Date( Number(unix_timestamp));
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let time = date + ' ' + month + ' ' + year ;
    
    return time;
  } 

  getMissed = (med) => {
    let missed_array = []

    med.missed.forEach(miss => { missed_array.push(miss)})
    med.history.forEach(obj => {
      if(!obj.measured) {
        obj.from = obj.timestamp
        obj.to = obj.timestamp + (24 * 60 * 60 * 1000)*med.duration
        missed_array.push(obj)
      }
    })

    return missed_array.sort(function(x, y){ return x.timestamp - y.timestamp; })
  }


  render() {

    document.title = "Profile - " + this.props.selectedPatient.firstname + ' ' + this.props.selectedPatient.lastname

    if(this.state.edit){
      return (<Edit patientClicked={this.props.selectedPatient}  zuruck={e => this.setState({edit: false})}/>)
    }
      return (
      <div className="row">
        <div className="col-12">
          <p className="goback" onClick={() => this.props.goBack() }> &#10230;</p>
          <button className="importbutton_dkg" style={{border: '2px solid', marginRight: '10px', padding: '3px 12px', borderRadius: '15px', marginTop: '5px', cursor: 'pointer', float: 'right'}} onClick={e => this.setState({edit: true})}>Edit</button>
          <p style={{marginTop: '10px', fontSize: '19px', fontWeight: 'bold'}} >{this.props.selectedPatient.firstname + ' ' + this.props.selectedPatient.lastname}</p>

          <p style={{marginTop: '10px', fontSize: '19px'}} >Medication:</p>

          <div className="container-fluid" style={{backgroundColor: '#f7f7f7', borderRadius: '7px'}}>
            
            {Object.values(this.props.selectedPatient.medication.medication).map (med => {return (
              <div className="row" style={{marginTop: '20px'}}>
                <div className="col-12">
                  <p style={{color: 'black'}} > <b>{med.title}</b> - {med.amount} every {med.duration} day.</p>
                </div>
                <div className="col-6">
                   <p style={{color: 'black'}} >History of confirmed intake:</p>
                  <div className="row gray_background_radius_scroll" >
                    {med.history.map(obj => {return (
                      <p> - Taken on {this.beautify_timestamp(obj.timestamp)}.</p>
                    )})}
                  </div>
                </div>
                <div className="col-6">
                  <p style={{color: 'black'}}>Missed dates:</p>
                  <div className="row gray_background_radius_scroll">
                    {this.getMissed(med).map(obj => {return (
                      <p> - Missed on {this.beautify_timestamp(obj.from)}. </p>
                    )})}
                  </div>
                </div>
              </div>
            )})}

          </div>

          <p style={{marginTop: '10px', fontSize: '19px'}} >Physical State:</p>
          <Temperature temperatures={this.props.selectedPatient.health.temperatures}/>
          <BloodPressure blood_pressures={this.props.selectedPatient.health.blood_pressures}/>
          <Pulse pulses={this.props.selectedPatient.health.pulses}/>
          <Weight weights={this.props.selectedPatient.health.weights}/>


        </div>
      </div>

      )
  }
}