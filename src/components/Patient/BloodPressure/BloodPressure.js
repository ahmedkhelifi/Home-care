import React from 'react';
import Confirmation from './Confirmation';
import MissedConfirmation from './MissedConfirmation';
import History from './History';

import BloodPressureGraph from '../../Graphs/7_days/BloodPressure';

import Tasks_blood_pressure from'../../../images/blood_pressure.png';
import My_History from'../../../images/my_history.png';

// import ECharts
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/line';
import 'echarts/lib/component/title';
import'echarts/lib/component/grid' ;
import 'echarts/lib/component/legend';

//Aufruf von $ Zeichen 
import $ from  'jquery';

import 'jquery';


export default class BloodPressure extends React.PureComponent { 

  constructor(props) {
    super(props);
    this.state = {
      pendingMedication:        this.props.pendingMedication,
      confirmPopupPending:      false,
      confirmPopupMissed:       false,
      popupMissedTimestampFrom: '',
      popupMissedTimestampTo:   '',
      history_bool:             false,
    };
  }


  componentDidMount(){
    window.scrollTo({ top: 0 });
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.state.confirmPopupPending && !this.state.confirmPopupMissed) {
    }
  }


  addBloodPressurePending = (sys, dia) => {

        fetch('/api/patient/blood_pressure/pending/'+this.props.username+'/', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({bloodpres_dia: dia, bloodpres_sys: sys, measured:true})
            })
        .then(blob => blob.json())
        .then(blob => {
          console.log(blob)
          // this.props.removeMedFromPending(this.state.popupMedication)
          this.setState({confirmPopupPending:false, popupMedication:''})
          this.props.get_health()
        })
        // .then(res => this.props.closesignup())
  }

  addBloodPressureMissed = (blood_pressure, measured) => {
        fetch('/api/patient/blood_pressure/missed/'+this.props.username+'/'+this.state.popupMissedTimestamp, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({measured: measured, bloodpres_dia: blood_pressure, bloodpres_sys: blood_pressure,})
            })
        .then(blob => blob.json())
        .then(blob => {
          console.log(blob)
          // this.props.removeMedFromPending(this.state.popupMedication)
          this.setState({confirmPopupMissed: false})
          this.props.get_health()
        })
        // .then(res => this.props.closesignup())
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
    return (<Confirmation addBloodPressurePending={this.addBloodPressurePending} goBack={e => this.setState({confirmPopupPending: false})}/>)
  }

  if(this.state.confirmPopupMissed){
    return (<MissedConfirmation addBloodPressureMissed={this.addBloodPressureMissed} goBack={e => this.setState({confirmPopupMissed: false,})} popupMissedTimestampFrom={this.state.popupMissedTimestampFrom} popupMissedTimestampTo={this.state.popupMissedTimestampTo}/>)
  }

  if(this.state.history_bool){
    return (<History blood_pressure={this.props.blood_pressure} goBack={e => this.setState({history_bool: false})}/>)
  }

    return (
    <div className="container-fluid" style={{backgroundColor: '#f7f7f7', marginTop: '-20px', paddingTop: '30px', minHeight: '100vh'}}>

      <div className="col-12">
            <p className="patient_back" onClick={() => this.props.backToDashboard() }>&#10230;</p>
           <div className="patient_health_status" style={{marginTop: '40px'}}>
             <div className="row">
              <div className="col-9">
                      <h3 className="patient_status">My BloodPressure</h3>
                      {this.props.blood_pressures.pending.length > 0 || this.props.blood_pressures.missed.length > 0 ? (<p className="patient_status_task" style={{color:"red"}}>You have some opened Tasks..</p>) : (<p className="patient_status_task">You have completed all your tasks for today</p>)}
                      
              </div>
              <div className="col-3">
                      <img style={{marginTop: '30px'}}  src={Tasks_blood_pressure} alt="medication pill" className="tasks_pill" />
              </div>
            </div>
           </div>
      </div>


      {this.props.blood_pressures.pending.length > 0 ? (<p className="patient_tasks" style={{marginLeft: '25px'}} >Pending Task</p>) : (null)}

      {this.props.blood_pressures.pending.length > 0 ? (
        <div className="row" style={{padding: '0 20px'}}>  
          <div className="col-12" style={{padding: '0'}}>
            <div className="row" style={{borderRadius: '20px', padding: '10px 0'}}>  
              <div className="col-3">  
               <img style={{marginTop: '21px'}}  src={Tasks_blood_pressure} alt="medication pill" className="tasks_pill" />
              </div>
              <div className="col-5">  
                <p className="add_temprature">Add today's Blood Pressure</p>
              </div>
              <div className="col-4" onClick={e => this.setState({confirmPopupPending: true})}> 
                <span className="go">&#10230;</span>
              </div>
            </div>
          </div>
        </div>
      ) : (null)}

      {this.props.blood_pressures.missed.map((missed_temp,i) => {return (
                <div className="col-12">
                     <div className="patient_health_status" style={{marginTop: '40px', backgroundColor: '#ff00000a'}}>
                       <div className="row">
                        <div className="col-9">
                                <p className="" style={{fontSize: '18px'}}>Blood Pressure from {this.beautify_timestamp(missed_temp.from)} to {this.beautify_timestamp(missed_temp.to)} not taken</p>
                        </div>
                        <div className="col-3" onClick={e => this.setState({confirmPopupMissed: true,popupMissedTimestampFrom: this.beautify_timestamp(missed_temp.from), popupMissedTimestampTo: this.beautify_timestamp(missed_temp.to), popupMissedTimestamp: ( (Number(missed_temp.to)+ Number(missed_temp.from) ) / 2 )  })}> 
                          <span className="go">&#10230;</span>
                        </div>
                      </div>
                     </div>
                </div>
      )})}


      <p className="patient_tasks" style={{marginLeft: '25px'}} >History</p>

        <BloodPressureGraph blood_pressures={this.props.blood_pressures}  />

          {/*this.props.blood_pressures.history.length > 0 ? (<span className="view_history" onClick={e => this.setState({history_bool: true})}> View full history &#10230;</span>) : (null)}
           <div className="patient_health_status" style={{marginTop: '50px', paddingRight: '0', paddingLeft: '0'}}>
             <div className="row">
              <div className= 'col-md-12 col-xs-12 col-sm-12' style={{padding: '0'}}>
                 <div id="main" style={{ width:'100%', minHeight: '400px' }}></div>
              </div>
            </div>
           </div>

          */}
    </div>
    );
  }
}