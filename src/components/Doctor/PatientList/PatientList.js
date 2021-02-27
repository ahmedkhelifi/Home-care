import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import Signup from './Signup';
import PatientProfile from '../PatientProfile';

import Pulse from './Graphs/Pulse';
import Temperature from './Graphs/Temperature';
import Weight from './Graphs/Weight';
import BoodPressure from './Graphs/BoodPressure';

class PatientList extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            errorPatientLoad: false,
            isLoaded: false,
            LoadingSection: false,

            view: 'patients',

            patients: [],
            patientsPerPage: 60,
            noPatients: true,

            patientForm: false,
            
            patientClicked: {},
            patientClickedBool: false,

            profile: false,
            edit:    false,


            currentPage: 1,
        };

        this.baseState = this.state // preserve the initial state
        this.closesignup             = this.closesignup.bind(this);
        this.patientClicked          = this.patientClicked.bind(this);
        this.handlePageChange        = this.handlePageChange.bind(this);

    }

  componentDidMount() {
    this.fetch_patient() // fetch patient list
  }

  fetch_patient = () => {
        fetch('/api/doctor/getPatients') // GET request
            .then(blob => blob.json())
            .then(
                (blob) => {
                    this.setState({ patients: blob.sort(function(a, b){ if(a.firstname < b.firstname) { return -1; } if(a.firstname > b.firstname) { return 1; } return 0; }), isLoaded: true });
                    this.baseState.patient = blob.sort(function(a, b){ if(a.firstname < b.firstname) { return -1; } if(a.firstname > b.firstname) { return 1; } return 0; })
                    this.baseState.isLoaded = true
                    if (blob.length > 0){
                        this.setState({ noPatients: false });
                        this.baseState.noPatients = true
                    }
                }
            ).catch(error => this.setState({errorPatientLoad: true}));
  }

  patientClicked(e, patient){ //select different patient
      this.setState({ patientClicked: patient, patientClickedBool: true });
  }

  handlePageChange(e){
    this.setState({
      currentPage: Number(event.target.id)
    });
    window.scrollTo(0, 0);
  }

  closesignup(){
    this.setState({ patientForm: false });
    this.fetch_patient()
    window.scrollTo(0, 0);
  }

  goBack = () => {
    this.setState({patientClickedBool: false, isLoaded: false})
    this.fetch_patient()
  }

  render() {
    document.title = "Homecare - All Patients"

        if(this.state.patientForm){
          document.title = "Homecare - Sign Up"
          return (
            <Signup closesignup={this.closesignup} zuruck={this.closesignup} />
          )
        }

        if(this.state.patientClickedBool){
          return (
              <PatientProfile selectedPatient={this.state.patientClicked} goBack={e => this.goBack()} />
            )
        }


        if(this.state.errorPatientLoad){
            return (
              <p>Error: Patients data cannot be loaded</p>
              )
        }

        const isLoading             = !this.state.isLoaded;
        const noPatients            = this.state.noPatients;
        var   Patients              = this.state.patients;
        const patientForm           = this.state.patientForm;
        const loadMultipleClicked   = this.state.loadMultipleClicked

        // Logic for displaying patients in different pages
        const indexOfLastPatients = this.state.currentPage * this.state.patientsPerPage;
        const indexOfFirstPatient = indexOfLastPatients - this.state.patientsPerPage;
        const currentPatients = Patients.slice(indexOfFirstPatient, indexOfLastPatients);

        const renderPatients = currentPatients.map((patient, index) => {
          return <li key={index}>{patient}</li>;
        });

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(Patients.length / this.state.patientsPerPage); i++) {
          pageNumbers.push(i);
        }

        var renderPageNumbers = ' '
        if(pageNumbers.length > 1){
         renderPageNumbers = pageNumbers.map((number, i) => {
            if(i === this.state.currentPage-1){
              return (
                <li
                  key={number}
                  id={number}
                  style={{display: 'inline', marginRight: '10px',fontSize:'20px', cursor: 'pointer'}}
                  onClick={this.handlePageChange}
                >
                  {number}
                </li>
              )
            }

            return (
              <li
                key={number}
                id={number}
                style={{display: 'inline', marginRight: '10px', cursor: 'pointer'}}
                onClick={this.handlePageChange}
              >
                {number}
              </li>
            )
          })
        }


      if (!this.state.profile && !this.state.edit) {
        return (
            <div className="container-fluid">
             <div className="row"  style={{marginLeft: '0'}}>

              <div className="col-8" style={{marginBottom: '20px', marginLeft: '-10px'}}>
                <h3>Patients</h3>
              </div>

              {isLoading ? (<div  className="col-12"><p>Loading patients...</p></div>)

                : (null)
              }



              {(!isLoading && noPatients) ? (
                <div>
                   <button className="add_new_patient" onClick={(e) => this.setState({ patientForm: true })}>+ add new patient</button>
                   <p style={{marginTop: '20px'}}>No patients found. Start by adding a new patient.</p>
                </div>)
                : (null)
              }

              {
                /*
                *
                * Menu above patient list
                *
                */
              }


              {(!isLoading && !noPatients) ? (
                 <div className="col-12" style={{padding: '10px 0px', }}>

                   <button className="add_new_patient" onClick={(e) => this.setState({ patientForm: true })}>+ add new patient</button>
                                    
                   <div style={{display: 'inline-block', marginLeft: '10px'}}>
                  </div>

                 </div>
                ) :(null)}


              {
                /*
                *
                * Patient List
                *
                */
              }


              {(!isLoading && !noPatients) ? (
                 <div className={"col-12"}>

                 <div className="row" style={{boxShadow: '0 0 28px -16px #888888', marginBottom: '20px', padding : '20px 0', borderRadius: '30px'}}>

                                <div className={"col-2"}>
                                      <p>Name</p>
                                </div>
                                  <div className={"col-2"}>
                                        <p>Temperature</p>
                                  </div>
                                 <div className={"col-2"}>
                                      <p>Pulse</p>
                                </div>
                                <div className={"col-2"}>
                                      <p>Weight</p>
                                </div>
                                <div className={"col-2"}>
                                      <p>Blood Pressure</p>
                                </div>
                                <div className={"col-2"}>
                                      <p>Status</p>
                                </div>

                        {currentPatients.map((patient, i) => (
                                      <div key={i} className="col-12 hover_gray" style={{borderTop: '1px solid #80808038', paddingTop: '10px'}} onClick={e => {this.patientClicked(e, patient)} } >
                                          <div className="row" style={{cursor: 'pointer'}}>
                                              <div className={"col-2"}>
                                                  <p style={{marginTop: '60px'}} >{patient.firstname + ' ' + patient.lastname}</p>
                                              </div>
                                                <div className={"col-2"}>
                                                   <Temperature temperatures={patient.temperature.temperature} id={patient.addressid}/>
                                                </div>
                                              <div className={"col-2"}>
                                               
                                                    <Pulse pulses={patient.pulse.pulse} id={patient.addressid}/>
                                               
                                              </div>
                                              <div className={"col-2"}>
                                                
                                                    <Weight weights={patient.weight.weight} id={patient.addressid}/>
                                                
                                              </div>
                                              <div className={"col-2"}>
                                                    <BoodPressure blood_pressures={patient.blood_pressure.blood_pressure} id={patient.addressid}/>
                                              </div>
                                              <div className={"col-2"}>
                                                  {patient.health.points <= 2 ? (<p style={{color: 'black', fontStyle: 'italic', fontSize: '16px', marginTop:'62px'}} ><span style={{color: 'green'}} >green</span> </p>) : null}
                                                  {patient.health.points === 3 || patient.health.points === 4 || patient.health.points === 5 ? (<p style={{color: 'black', fontStyle: 'italic', fontSize: '16px', marginTop:'62px'}} ><span style={{color: '#ffc459'}} >orange</span> </p>) : null}
                                                  {patient.health.points > 5 ? (<p style={{color: 'black', fontStyle: 'italic', fontSize: '16px', marginTop:'62px'}} ><span style={{color: 'red'}} >red</span> </p>) : null}
                                              </div>
                                          </div>
                                      </div>
                        ))}
                        {currentPatients.length === 0 ? (<p>no user...</p>) : (null)}
                  </div>
                  {renderPageNumbers}
                  </div>
                )
                : (null)
              }


  </div>
  </div>

        );}


    }
}

export default PatientList;