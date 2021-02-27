import React from 'react';
import Confirmation from './Confirmation';
import MissedConfirmation from './MissedConfirmation';

import Tasks_pill from'../../../images/tasks_pill.png';
import Green_checkmark from'../../../images/green_checkmark.png';
import Explamation_mark from'../../../images/explamation_ark.png';

export default class Medication extends React.PureComponent { 

  constructor(props) {
    super(props);
    this.state = {
      pendingMedication:        this.props.pendingMedication,
      confirmPopupPending:      false,
      confirmPopupMissed:      false,
      popupMedication:          '',
      popupMissedTimestamp:     ''
    };
  }


  componentDidMount(){
    window.scrollTo({ top: 0 });
  }


  iTookMedicationPending = () => {

        fetch('/api/patient/medication/pending/'+this.props.username+'/'+this.state.popupMedication, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({})
            })
        .then(blob => blob.json())
        .then(blob => {
          this.props.removeMedFromPending(this.state.popupMedication)
          this.setState({confirmPopupPending:false, popupMedication:''})
          this.props.get_health()
        })
  }

  iTookMedicationMissed = (taken) => {
        fetch('/api/patient/medication/missed/'+this.props.username+'/'+this.state.popupMedication+'/'+this.state.popupMissedTimestamp, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({taken:taken})
            })
        .then(blob => blob.json())
        .then(blob => {
          this.setState({confirmPopupMissed: false, popupMedication: ''})
          this.props.get_health()
        })
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



  render() {

  let pendingMedication = this.props.pendingMedication

  if(this.state.confirmPopupPending){
    return (<Confirmation popupMedication={this.state.popupMedication} iTookMedicationPending={this.iTookMedicationPending} goBack={e => this.setState({confirmPopupPending: false, popupMedication: ''})}/>)
  }

  if(this.state.confirmPopupMissed){
    return (<MissedConfirmation popupMedication={this.state.popupMedication} iTookMedicationMissed={this.iTookMedicationMissed} goBack={e => this.setState({confirmPopupMissed: false, popupMedication: ''})}/>)
  }

    return (
    <div className="container-fluid" style={{backgroundColor: '#f7f7f7', marginTop: '-20px', paddingTop: '30px', minHeight: '100vh'}}>

      <div className="col-12">
            <p className="patient_back" onClick={() => this.props.backToDashboard() }>&#10230;</p>
           <div className="" style={{marginTop: '40px'}}>
             <div className="row">
              <div className="col-12">
                      <h3 className="patient_status">My Medication</h3>
              {this.props.is_there_missed_med().missed ? (<p  className="patient_tasks_subtitle" style={{color: 'red'}}>Missed tasks</p>) : (null)}
              {!this.props.is_there_missed_med().missed &&  this.props.is_there_missed_med().pending ? (<p  className="patient_tasks_subtitle" style={{color: '#f58900'}}>Pending task</p>) : (null)}
              {!this.props.is_there_missed_med().missed &&  !this.props.is_there_missed_med().pending ? (<p className="patient_status_task">You have completed all your tasks for today</p>) : (null)}
                      
              </div>
            </div>
           </div>
      </div>


      {this.props.medication.length === 0 ? (<p className="patient_tasks" style={{marginLeft: '25px'}} >No Medication</p>) : (null)}
      {this.props.medication.map ((med,i) => {return (
        <div key={i} className="row patient_health_status" style={{padding: '0 20px'}}>  
          <div className="col-12" style={{padding: '0'}}>
            <div className="row" style={{borderRadius: '20px', padding: '10px 0'}}>  
              <div className="col-3">  
               <img style={{marginTop: '30px'}}  src={Tasks_pill} alt="medication pill" className="tasks_pill" />
              </div>
              <div className="col-6">  
                <p className="patient_med">{med.title}</p>
                <p className="">{med.ammount} every {med.duration} day, starting from {this.beautify_timestamp(med.assigned_on)} </p>
              </div>
              {med.missed.length === 0 && med.pending.length === 0 ? (
              <div className="col-3">  
                <img style={{marginTop: '30px', float: 'right'}}  src={Green_checkmark} alt="medication pill" className="tasks_pill" />
                <p className=""></p>
              </div>
              ):(null)}
              {med.missed.length === 0 && med.pending.length > 0 ? (
              <div className="col-3">  
                <img style={{marginTop: '30px', float: 'right'}}  src={Explamation_mark} alt="medication pill" className="tasks_pill" />
                <p className=""></p>
              </div>
              ):(null)}
              {med.missed.length > 0 ? (
              <div className="col-3">  
                <img style={{marginTop: '30px', float: 'right'}}  src={Explamation_mark} alt="medication pill" className="tasks_pill" />
                <p className=""></p>
              </div>
              ):(null)}


              {med.pending.length > 0 ? (
                <div className="col-12">
                     <div className="" style={{marginTop: '40px'}}>
                       <div className="row">
                        <div className="col-12">
                              <h3 className="patient_status"> Pending Task</h3>
                        </div>
                        <div className="col-9" style={{marginTop: '40px'}}>
                                <p className="" style={{fontSize: '18px'}}>Medication on {this.beautify_timestamp(med.pending[0].from)} not taken</p>
                        </div>
                        <div className="col-3" onClick={e => this.setState({confirmPopupPending: true, popupMedication: med.title })}> 
                          <span className="go">&#10230;</span>
                        </div>
                      </div>
                     </div>
                </div>
              ) : (null)}

              {med.missed.length > 0 ? (
                <div className="col-12">
                       <div className="row">
                        <div className="col-12">
                                <h3 className="patient_status" style={{marginTop: '30px'}}> Missed Tasks</h3>
                        </div>
                     </div>
                </div>
              ) : (null)}
              {med.missed.map((missed_med,i) => {return (
                <div className="col-12">
                     <div className="patient_health_status" style={{marginTop: '40px', backgroundColor: '#ff00000a'}}>
                       <div className="row">
                        <div className="col-9">
                                <p className="" style={{fontSize: '18px'}}>Medication on {this.beautify_timestamp(missed_med.from)} not taken</p>
                        </div>
                        <div className="col-3" onClick={e => this.setState({confirmPopupMissed: true, popupMedication: med.title, popupMissedTimestamp: ( (Number(missed_med.to)+ Number(missed_med.from) ) / 2 )  })}> 
                          <span className="go">&#10230;</span>
                        </div>
                      </div>
                     </div>
                </div>
              )})}

            </div>
          </div>
        </div>
      )})}

    </div>
    );
  }
}