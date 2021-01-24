import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import Signup from './Signup';
import Pulse from './Graphs/Pulse';
import Temperature from './Graphs/Temperature';
import Weight from './Graphs/Weight';
import BoodPressure from './Graphs/BoodPressure';

// import seachIcon from './images/search.png';
// import emptyStar from './images/emptystar.png';
// import yellowStar from './images/yellowstar.png';
// import expandArrow from './images/expandArrow.png';

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
            firstName: '',
            lastName: '',
            email: '',

            admin_display: false,
            sort_new: true,
            sort_old: false,
            sort_alphabetically: false,


            simpleMode: true,
            
            patientClicked: {},
            patientClickedExpand: false,

            patientsClicked: [],

            active: null,
            actives: [],

            import: false,

            expandSize: '20px',
            profile: false,
            edit:    false,


            currentPage: 1,
            sort: "alphabetisch",

            sync:  false,
            sync_loaded: false,
            sync_log:   false,
            showLog: false,
            sync_response: {},

            showSearch: false,
            search: '', 


            refresh: this.props.refresh
        };

        this.baseState = this.state // preserve the initial state
        this.addPatientForm          = this.addPatientForm.bind(this);
        this.closesignup             = this.closesignup.bind(this);
        this.patientClicked          = this.patientClicked.bind(this);
        this.timeSince               = this.timeSince.bind(this);
        this.toggle                  = this.toggle.bind(this);
        this.myColor                 = this.myColor.bind(this);
        this.handlePageChange        = this.handlePageChange.bind(this);
        this.sort                    = this.sort.bind(this);
        this.sync                    = this.sync.bind(this);
        this.admin_display           = this.admin_display.bind(this);
        this.handleSearchChange      = this.handleSearchChange.bind(this);
        this.clearSearch             = this.clearSearch.bind(this);
        this.timeConverter           = this.timeConverter.bind(this)
        this.handlePatientClickedExpand = this.handlePatientClickedExpand.bind(this);

    }

  componentDidMount() {
        // fetch patient list
        fetch('/api/doctor/getPatients')
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

  componentDidUpdate(prevProps) {
    if (this.props.refresh && (this.state.edit || this.state.patientForm)) {
    }
  }
    
  handleSearchChange(e) {
    this.setState({ search: e.target.value })
  }

  clearSearch(){
    this.setState({ search: '' })
  }


  patientClicked(e, patient){
      //select different patient
      this.setState({ patientClicked: patient, patientsClicked: [], loadMultipleClicked: false, actives: [] });
  }

  timeSince(UNIX_timestamp) {
    var date = new Date(Number(UNIX_timestamp));
    return ( date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()  ).toString();
  }

  toggle (position){
    if(!this.state.loadMultipleClicked){
        if (this.state.active === position) {
          this.setState({active : null, actives: []})
        } else {
          this.setState({active : position, actives: []})
        }
    } else {

      var temp = [...this.state.actives]
      for(var i = 0; i < temp.length; i++) {
            if(temp[i] === position) {
              temp.splice(i, 1);
              this.setState({actives: temp, active: null})
              return;
            }
      }
      
      this.state.actives.push(position)
        // this.setState({active : null})
    }
  }

  myColor(position) {
    if(this.state.loadMultipleClicked){
        if (this.state.actives.includes(position))
          return "#efdecb59";
    }
    if (this.state.active === position) {
      return "#efdecb59";
    }
    return "";
  }

  handlePageChange(e){
    this.setState({
      currentPage: Number(event.target.id)
    });
    window.scrollTo(0, 0);
  }

  sort() {
      var patients = this.state.patients

      if(event.target.value === "recent") {
        patients.sort(function (a, b) {
          return parseInt(b.created_on) - parseInt(a.created_on);
        });
        this.setState({sort: event.target.value, patients: patients});
        return
      }

      if(event.target.value === "lastActive") {
        patients.sort(function (a, b) {
          return parseInt(b.last_login) - parseInt(a.last_login);
        });
        this.setState({sort: event.target.value, patients: patients});
        return
      }

      if(event.target.value === "alphabetisch") {
        patients.sort(function(a, b){ if(a.firstname < b.firstname) { return -1; } if(a.firstname > b.firstname) { return 1; } return 0; });
        this.setState({sort: event.target.value, patients: patients});
        return
      }
      
      if(event.target.value === "nichtAlphabetisch") {
        patients.sort(function(a, b){ if(a.firstname > b.firstname) { return -1; } else { return 1; } return 0; });
        this.setState({sort: event.target.value, patients: patients});
        return
      }
  }

  sync(e){
    this.setState({sync : true})

        fetch('/api/sync')
            .then(blob => blob.json())
            .then(
                (blob) => {
                    this.setState({sync_response: blob, sync_loaded: true, sync: false}, () => {
                        fetch('/api/patient/')
                        .then(blob => blob.json())
                        .then(
                            (blob) => {
                                this.setState({ patients: blob.sort(function(a, b){ if(a.firstname < b.firstname) { return -1; } if(a.firstname > b.firstname) { return 1; } return 0; }), isLoaded: true, currentPage: 1 });
                                if (blob.length > 0)
                                    this.setState({ noPatients: false });
                            },
                            // Note: it's important to handle errors here
                            // instead of a catch() block so that we don't swallow
                            // exceptions from actual bugs in components.
                            (error) => {
                                this.setState({
                                    isLoaded: true,
                                    error
                                });
                            }
                        )
                    })
                    console.log(blob)
                    if(blob.new_sync > 0 || blob.modified > 0){
                      this.setState({sync_log: true})
                    }
                }
            )
  }

  admin_display(){
    if(!this.state.admin_display)
      return "col-4 half_transparent"
    else 
      return "col-4"
  }

  timeConverter(UNIX_timestamp){
    var a = new Date(Number(UNIX_timestamp));
    var months = ['Januar','Februar','März','April','May','Juni','Juli','August','September','Oktober','November','Dezember'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }

  handlePatientClickedExpand(){
    this.setState({patientClickedExpand: !this.state.patientClickedExpand})
  }

  addPatientForm(){
    this.setState({ patientForm: true, patients: [] });
  }

  closesignup(){
    this.setState({ patientForm: false });
  }

  render() {

        if(this.state.patientForm){
          return (
              <div className="container-fluid">
                <Signup handleConsultationStart={this.handleConsultationStart} closesignup={this.closesignup} />
              </div>
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
        const simpleMode            = this.state.simpleMode
        const loadMultipleClicked   = this.state.loadMultipleClicked

        if(this.state.admin_display){
          Patients = Patients.filter(patient => patient.role !== 'patient')
        }

        if(this.state.search !== ''){
          Patients = Patients.filter(patient => patient.firstname.toLowerCase().includes(this.state.search.toLowerCase()) || patient.lastname.toLowerCase().includes(this.state.search.toLowerCase()))
        }

        // Logic for displaying patients
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
        document.title = "Patient List"
        return (
            <div className="container-fluid">
             <div className="row"  style={{marginLeft: '0'}}>

              <div className="col-8" style={{marginBottom: '20px', marginLeft: '-10px'}}>
                {!this.state.patientClickedExpand ? (<h3>Patients</h3>) : (null)}
              </div>

              {isLoading ? (<div><p>Loading user...</p></div>)

                : (null)
              }



              {(!isLoading && noPatients && !patientForm) ? (
                <div>
                   <button className="button_dkg" onClick={(e) => this.addPatientForm(e)}>Add Patient</button>
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


              {(!isLoading && !noPatients && !patientForm && simpleMode && !this.state.patientClickedExpand) ? (
                 <div className="col-12" style={{padding: '10px 0px', }}>

                   <button className="add_new_patient" onClick={(e) => this.addPatientForm(e)}>+ add new patient</button>
                    <input id='search-btn' type='checkbox'/>
                    <label htmlFor='search-btn' onClick={e => this.clearSearch(e)}>
                    </label>
                    <input id='search-bar' type='text' placeholder='...' value={this.state.search} onChange={this.handleSearchChange}/>
                                    
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
                                <div className={"col-1"}>
                                      <p>Status</p>
                                </div>

                        {currentPatients.map((patient, i) => (
                                      <div className="col-12 hover_gray" style={{borderTop: '1px solid #80808038', paddingTop: '10px', background: this.myColor(i)}} onClick={e => {this.patientClicked(e, patient); this.toggle(i)} } >
                                          <div className="row" style={{cursor: 'pointer'}}>
                                              <div className={"col-2"}>
                                                  <p>{patient.firstname + ' ' + patient.lastname}</p>
                                              </div>
                                                <div className={"col-2"}>
                                                   <Temperature temperatures={patient.temperature.temperature} id={patient.addressid}/>
                                                </div>
                                              <div className={"col-2"}>
                                                <div className={"col-2"}>
                                                    <Pulse pulses={patient.pulse.pulse} id={patient.addressid}/>
                                                </div>
                                              </div>
                                              <div className={"col-2"}>
                                                <div className={"col-2"}>
                                                    <Weight weights={patient.weight.weight} id={patient.addressid}/>
                                                </div>
                                              </div>
                                              <div className={"col-2"}>
                                                    <BoodPressure blood_pressures={patient.blood_pressure.blood_pressure} id={patient.addressid}/>
                                              </div>
                                              <div className={"col-1"}>
                                                    <p>Status</p>
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