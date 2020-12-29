import React from 'react';
import Confirmation from './Confirmation';

import Tasks_pill from'../../../images/tasks_pill.png';

export default class Medication extends React.PureComponent { 

  constructor(props) {
    super(props);
    this.state = {
      pendingMedication:        this.props.pendingMedication,
      confirmPopup:             false,
      popupMedication:          ''
    };

    this.iTookMedication        = this.iTookMedication.bind(this)
  }


  componentDidMount(){
    window.scrollTo({ top: 0 });
  }


  iTookMedication() {
    fetch('/api/patient/medication/'+this.props.username+'/'+this.state.popupMedication)
      .then(blob => blob.json())
      .then(blob => {
        console.log(blob)
      })
      .catch(error => this.setState({error: true}));

        fetch('/api/patient/medication/'+this.props.username+'/'+this.state.popupMedication, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({})
            })
        .then(blob => blob.json())
        .then(blob => {
          console.log(blob)
          this.props.removeMedFromPending(this.state.popupMedication)
          this.setState({confirmPopup: false, popupMedication: ''})
        })
        // .then(res => this.props.closesignup())
  }



  render() {

  let pendingMedication = this.props.pendingMedication

  if(this.state.confirmPopup){
    return (<Confirmation popupMedication={this.state.popupMedication} iTookMedication={this.iTookMedication} goBack={e => this.setState({confirmPopup: false, popupMedication: ''})}/>)
  }

    return (
    <div className="container-fluid" style={{backgroundColor: '#f7f7f7', marginTop: '-20px', paddingTop: '30px', minHeight: '100vh'}}>
      {this.state.confirmPopup ? (
          <div id="myModal" class="modal">
            <div className="modal-content">
              <span className="close" onClick={e => this.setState({confirmPopup: false, popupMedication: ''})}>&times;</span>
              <p>Are  you sure you took the appropriate dose of {this.state.popupMedication}</p>
              <button className="took_med_ja" onClick={e => this.iTookMedication()}>Ja</button>
            </div>
          </div>
      ) : (null)}
      <div className="col-12">
            <p className="patient_back" onClick={() => this.props.backToDashboard() }>&#10230;</p>
           <div className="patient_health_status" style={{marginTop: '40px'}}>
             <div className="row">
              <div className="col-9">
                      <h3 className="patient_status">My Medication</h3>
                      {pendingMedication.length > 0 ? (<p className="patient_status_task">You have some opened Tasks..</p>) : (<p className="patient_status_task">You have completed all your tasks for today</p>)}
                      
              </div>
              <div className="col-3">
                      <img style={{marginTop: '30px'}}  src={Tasks_pill} alt="medication pill" className="tasks_pill" />
              </div>
            </div>
           </div>
      </div>


      {pendingMedication.length > 0 ? (<p className="patient_tasks" style={{marginLeft: '25px'}} >Pending Task</p>) : (null)}
      {pendingMedication.map ((med,i) => {return (
        <div key={i} className="row" style={{padding: '0 20px'}}>  
          <div className="col-12" style={{padding: '0'}}>
            <div className="row" style={{borderRadius: '20px', padding: '10px 0'}}>  
              <div className="col-3">  
               <img style={{marginTop: '30px'}}  src={Tasks_pill} alt="medication pill" className="tasks_pill" />
              </div>
              <div className="col-5">  
                <p className="patient_med">{med.title}</p>
                <p className="">{med.ammount}x day</p>
              </div>
              <div className="col-4" onClick={e => this.setState({confirmPopup: true, popupMedication: med.title})}> 
                <span className="go">&#10230;</span>
              </div>
            </div>
          </div>
        </div>
      )})}

      <p className="patient_tasks" style={{marginLeft: '25px'}} >My prescribed Medication</p>

    </div>
    );
  }
}