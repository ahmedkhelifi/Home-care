import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import SelectedPatient from './SelectedPatient';
import PatientProfile from '../PatientProfile';

import Tasks_blood_pressure from'../../../images/blood_pressure.png';
import Tasks_temperature from'../../../images/tasks_temperature.png';
import Tasks_heart_rate from'../../../images/heart_rate.png';

class Allgemein extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoaded       :     false,
      rist_patients    :     [],
      patientSelectedBool:   false,
      selectedPatient:       {},
      patient_profile_bool:  false,                
    }
  }

  selectPatient = (patient) => {
    this.setState({selectedPatient: patient, patientSelectedBool: true})
  }

  checkIfSelectedCss = (patient) => {
    if(this.state.selectedPatient === patient)
      return {backgroundColor: 'rgb(172 195 227 / 35%)', marginTop: '20px', borderRadius: '5px'}
    else 
      return {backgroundColor: 'white', marginTop: '20px', borderRadius: '5px'}
  }

  componentDidMount(){
        fetch('/api/doctor/getPatients/health/risk')  //Loads patients health data, only for patients at risk
            .then(blob => blob.json())
            .then(
                (blob) => {
                    this.setState({dataLoaded: true, rist_patients: blob.sort((a,b) => (a.health.points > b.health.points) ? 1 : ((b.health.points > a.health.points) ? -1 : 0)).reverse() })
                }
            ).catch(error => this.setState({errorPatientLoad: true}));
  }

  render() {
    document.title = "Homecare - Dashboard"
    if(!this.state.dataLoaded){
    return (
              <div className="container-fluid">
                <div className="row">

                    <div className="myBox height75" style={{marginLeft: '30px'}}>
                        <div className="loading">
                          <div>
                            <div className="c1"></div>
                            <div className="c2"></div>
                            <div className="c3"></div>
                            <div className="c4"></div>
                          </div>
                          <span>Loading patient's data..</span>
                        </div>
                    </div>



                  </div> 
              </div>
    ); } else if(!this.state.patient_profile_bool) {
      return (
              <div className="container-fluid">
                <div className="row">
                  <div className="col-6">

                    <h3 style={{marginLeft: '15px'}} >Patients at risk</h3>
                    <div className="row" >
                      <div className="col-6 ">
                        <div className="row patient_at_risk_red">
                          <div className="col-6 ">
                            <p className="vertical_center" style={{color: 'white'}}> High Risk: </p>
                          </div>
                         <div className="col-6 ">
                            <p className="vertical_horizontnal_center" style={{fontSize: '50px', color: 'white', textAlign: 'center'}}> {this.state.rist_patients.filter( patient => {return patient.health.points > 5}).length} </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="row patient_at_risk_orange">
                          <div className="col-6 ">
                            <p className="vertical_center" style={{color: 'white'}}> Average Risk: </p>
                          </div>
                         <div className="col-6 ">
                            <p className="vertical_horizontnal_center" style={{fontSize: '50px', color: 'white', textAlign: 'center'}}> {this.state.rist_patients.filter( patient => {return patient.health.points <= 5}).length} </p>
                          </div>
                        </div>
                      </div>

                      <div className="col-12 full_height_patient_health">

                        {this.state.rist_patients.map((patient,i) => {
                          return (
                            <div key={i*100} className="row">
                              <div  className="col-12 hover_hightlight_patient_dashboard" style={this.checkIfSelectedCss(patient)} onClick={e => this.selectPatient(patient)}>
                                <p style={{marginTop: '10px', fontSize: '17px', fontWeight: 'bold'}} > {patient.firstname + ' ' + patient.lastname}</p>
                                 <p style={{marginTop: '-17px'}} > Points: {patient.health.points}</p>

                                <p > Patient status: {patient.health.points > 5 ? (<span style={{color: 'red'}}>red</span>) : (<span style={{color: '#ffc459'}}>orange</span>)}</p>

                                <p style={{marginTop: '10px', fontSize: '14px', fontWeight: 'bold'}} > Patient's last entry overview: </p>
                                <div className="row">
                                    <div className="col-4">
                                      <div className="patient_task_buble_container_doctor">
                                        <div className=" patient_task_buble_doctor">
                                          <img  src={Tasks_temperature} alt="logout" className="tasks_pill_doctor" />
                                          <p className="patient_tasks_title_doctor"> Temperature</p>
                                           {patient.health.temperatures.history.length > 0 && patient.health.temperatures.history[patient.health.temperatures.history.length - 1].temperature !== ""
                      												? (<p style={{textAlign: 'center', fontSize: '14px'}} > {patient.health.temperatures.history[patient.health.temperatures.history.length - 1].temperature} </p>) 
                      												: (<p style={{textAlign: 'center', fontSize: '14px'}}>No Entry</p>) }
                                        </div>
                                      </div>
                                     </div>

                                    <div className="col-4">
                                      <div className="patient_task_buble_container_doctor">
                                        <div className=" patient_task_buble_doctor">
                                          <img  src={Tasks_blood_pressure} alt="logout" className="tasks_pill_doctor" />
                                          <p className="patient_tasks_title_doctor" style={{marginTop: '-12px'}} > Blood Pressure</p>
                                           { patient.health.blood_pressures.history.length > 0 &&  patient.health.blood_pressures.history[patient.health.blood_pressures.history.length -1].bloodpres_dia !== ""? (<p style={{textAlign: 'center', fontSize: '14px'}} > {patient.health.blood_pressures.history[patient.health.blood_pressures.history.length -1].bloodpres_dia}/{patient.health.blood_pressures.history[0].bloodpres_sys} </p>) : (<p style={{textAlign: 'center', fontSize: '14px'}}>No Entry</p>) }
                                        </div>
                                      </div>
                                     </div>

                                    <div className="col-4">
                                      <div className="patient_task_buble_container_doctor">
                                        <div className=" patient_task_buble_doctor">
                                          <img  src={Tasks_heart_rate} alt="logout" className="tasks_pill_doctor" />
                                          <p className="patient_tasks_title_doctor"> Pulse</p>
                                           { patient.health.pulses.history.length > 0 &&  patient.health.pulses.history[patient.health.pulses.history.length - 1].pulse !== ""? (<p style={{textAlign: 'center', fontSize: '14px'}} > {patient.health.pulses.history[patient.health.pulses.history.length - 1].pulse} </p>) : (<p style={{textAlign: 'center', fontSize: '14px'}}>No Entry</p>) }
                                        </div>
                                      </div>
                                     </div>
                                </div>


                              </div>
                            </div>
                          )
                        })}

                      </div>


                    </div>

                  </div>


                  <div className="col-6">

                    <h3>Patient's health data</h3>

                    <SelectedPatient patientSelectedBool={this.state.patientSelectedBool} selectedPatient={this.state.selectedPatient} openProfile={e => this.setState({patient_profile_bool: true}) } />

                  </div>





                  </div> 
              </div>
      )
    } else if(this.state.patient_profile_bool) {
      return (
        <PatientProfile patientSelectedBool={this.state.patientSelectedBool} selectedPatient={this.state.selectedPatient} goBack={e =>this.setState({patient_profile_bool: false})}  />
      )
    }
  }
}

export default Allgemein;