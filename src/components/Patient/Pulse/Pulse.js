import React from 'react';
import Confirmation from './Confirmation';
import MissedConfirmation from './MissedConfirmation';
import History from './History';

import PulseGraph from '../../Graphs/7_days/Pulse';

import Tasks_pulse from'../../../images/heart_rate.png';
import My_History from'../../../images/my_history.png';

//Aufruf von $ Zeichen 
import $ from  'jquery';
import 'jquery';

// import ECharts
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/line';
import 'echarts/lib/component/title';
import'echarts/lib/component/grid' 
import 'echarts/lib/component/legend';
import'echarts/lib/component/markLine' 




export default class Pulse extends React.PureComponent { 

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


  addPulsePending = (pulse) => {

        fetch('/api/patient/pulse/pending/'+this.props.username+'/', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({pulse: Number(pulse), measured:true})
            })
        .then(blob => blob.json())
        .then(blob => {
          this.setState({confirmPopupPending:false, popupMedication:''}, e => this.forceUpdate())
          this.props.get_health()
        })
  }

  addPulseMissed = (pulse, measured) => {
        fetch('/api/patient/pulse/missed/'+this.props.username+'/'+this.state.popupMissedTimestamp, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({measured: measured, pulse: Number(pulse)})
            })
        .then(blob => blob.json())
        .then(blob => {
          this.setState({confirmPopupMissed: false}, e => this.forceUpdate())
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
    return (<Confirmation addPulsePending={this.addPulsePending} goBack={e => this.setState({confirmPopupPending: false})}/>)
  }

  if(this.state.confirmPopupMissed){
    return (<MissedConfirmation addPulseMissed={this.addPulseMissed} goBack={e => this.setState({confirmPopupMissed: false,})} popupMissedTimestampFrom={this.state.popupMissedTimestampFrom} popupMissedTimestampTo={this.state.popupMissedTimestampTo}/>)
  }

  if(this.state.history_bool){
    return (<History pulse={this.props.pulse} goBack={e => this.setState({history_bool: false})}/>)
  }

    return (
    <div className="container-fluid" style={{backgroundColor: '#f7f7f7', marginTop: '-20px', paddingTop: '30px', minHeight: '100vh'}}>

      <div className="col-12">
            <p className="patient_back" onClick={() => this.props.backToDashboard() }>&#10230;</p>
           <div className="patient_health_status" style={{marginTop: '40px'}}>
             <div className="row">
              <div className="col-9">
                      <h3 className="patient_status">My Pulse</h3>
                      {this.props.pulses.pending.length > 0 || this.props.pulses.missed.length > 0 ? (<p className="patient_status_task">You have some opened Tasks..</p>) : (<p className="patient_status_task">You have completed all your tasks for today</p>)}
                      
              </div>
              <div className="col-3">
                      <img style={{marginTop: '30px'}}  src={Tasks_pulse} alt="medication pill" className="tasks_pill" />
              </div>
            </div>
           </div>
      </div>


      {this.props.pulses.pending.length > 0 ? (<p className="patient_tasks" style={{marginLeft: '25px'}} >Pending Task</p>) : (null)}

      {this.props.pulses.pending.length > 0 ? (
        <div className="row" style={{padding: '0 20px'}}>  
          <div className="col-12" style={{padding: '0'}}>
            <div className="row" style={{borderRadius: '20px', padding: '10px 0'}}>  
              <div className="col-3">  
               <img style={{marginTop: '21px'}}  src={Tasks_pulse} alt="medication pill" className="tasks_pill" />
              </div>
              <div className="col-5">  
                <p className="add_temprature">Add today's Pulse</p>
              </div>
              <div className="col-4" onClick={e => this.setState({confirmPopupPending: true})}> 
                <span className="go">&#10230;</span>
              </div>
            </div>
          </div>
        </div>
      ) : (null)}

      {this.props.pulses.missed.map((missed_temp,i) => {return (
                <div className="col-12">
                     <div className="patient_health_status" style={{marginTop: '40px', backgroundColor: '#ff00000a'}}>
                       <div className="row">
                        <div className="col-9">
                                <p className="" style={{fontSize: '18px'}}>Pulse on {this.beautify_timestamp(missed_temp.from)} not measured</p>
                        </div>
                        <div className="col-3" onClick={e => this.setState({confirmPopupMissed: true,popupMissedTimestampFrom: this.beautify_timestamp(missed_temp.from), popupMissedTimestampTo: this.beautify_timestamp(missed_temp.to), popupMissedTimestamp: Number(missed_temp.from+1)  })}> 
                          <span className="go">&#10230;</span>
                        </div>
                      </div>
                     </div>
                </div>
      )})}

      <p className="patient_tasks" style={{marginLeft: '25px'}} >History</p>
      <PulseGraph pulses={this.props.pulses.history}  />

    </div>
    );
  }
}