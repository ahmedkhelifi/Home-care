import React from 'react';
import Confirmation from './Confirmation';
import MissedConfirmation from './MissedConfirmation';
import History from './History';


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
    this.create_graph()
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.state.confirmPopupPending && !this.state.confirmPopupMissed) {
      // this.create_graph()
    }
  }

  create_graph = ()  => {
    //  currentDate

    var currentDate = new Date();
    // old7Datetimestample
    var days7before = currentDate.setDate( currentDate.getDate() - 7 );     //  最终获得的 old7Date 是时间戳 
    //console.log(days7before)    
    let history = this.props.pulses.history;
    let jsonData = {pulse: history}
      
    var truejsonData=jsonData.pulse.filter(obj => {return obj.timestamp>days7before});
    console.log(truejsonData)

    function timeformater(ts){
        let date = new Date(ts);
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        let D = date.getDate() + ' ';
        let result = Y+M+D
        return result; 
    }


    var timelist=[null,null,null,null,null,null,null];
    timelist.forEach(function(item, index,timelist){
        let currentDate = new Date();
        let data = currentDate.setDate( currentDate.getDate() - index); 
        timelist[index]=timeformater(data)
    })
    timelist=timelist.reverse()
    
    var templist=[null,null,null,null,null,null,null]
    truejsonData.reverse().forEach(function(item,index,arr){//db中近7天的array 可能只有3天
        let i=timelist.indexOf(timeformater(item.timestamp))//richtige x axis daten value index
        if(i>-1){//wenn an dem Tag etwas in DB erschienen 
            templist[i]=item.pulse  
            // wenn measured nicht false dann ersetzt die richtige weight dadrauf
        }
    })
//graph infos
var option ={
  color: '#800000',
  title: { 
      left: 'center',
      text: 'pulse last 7 days in per minute' },
  xAxis: {
      data: timelist,
      
  },
  yAxis: {
      axisLabel: {show: false},
      splitLine: {show: false},
      axisTick: {show: false},
      type: 'value' ,
      min: extent => extent.min <=30 ? extent.min-2 : 28,
      // max: extent => extent.max >130 ? extent.max+1 : 130
  },
  series: [{
      connectNulls: true,//laesst sich null wert nicht leer sein 
      name: 'pulse',
      type: 'line',
      data: templist,
      label: {
          show: true,
          position: 'top',
          // formatter: '{c}/min'//echarts selbst build in variable fuer valu
          
      },　　
  }]
}

var myChart = echarts.init(document.getElementById('pulse_graph'));
myChart.setOption(option);
//fuer bootstrap layout
$(window).on('resize', function(){
if(myChart !== null && myChart !== undefined){
    myChart.resize();
}
});
}


  addPulsePending = (pulse) => {

        fetch('/api/patient/pulse/pending/'+this.props.username+'/', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({pulse: pulse, measured:true})
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

  addPulseMissed = (pulse, measured) => {
        fetch('/api/patient/pulse/missed/'+this.props.username+'/'+this.state.popupMissedTimestamp, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({measured: measured, pulse: pulse})
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
                                <p className="" style={{fontSize: '18px'}}>Pulse from {this.beautify_timestamp(missed_temp.from)} to {this.beautify_timestamp(missed_temp.to)} not taken</p>
                        </div>
                        <div className="col-3" onClick={e => this.setState({confirmPopupMissed: true,popupMissedTimestampFrom: this.beautify_timestamp(missed_temp.from), popupMissedTimestampTo: this.beautify_timestamp(missed_temp.to), popupMissedTimestamp: ( (Number(missed_temp.to)+ Number(missed_temp.from) ) / 2 )  })}> 
                          <span className="go">&#10230;</span>
                        </div>
                      </div>
                     </div>
                </div>
      )})}


      <p className="patient_tasks" style={{marginLeft: '25px'}} >History</p>

          {this.props.pulses.history.length > 0 ? (<span className="view_history" onClick={e => this.setState({history_bool: true})}> View full history &#10230;</span>) : (null)}
           <div className="patient_health_status" style={{marginTop: '50px', paddingRight: '0', paddingLeft: '0'}}>
             <div className="row">
              <div className= 'col-md-12 col-xs-12 col-sm-12' style={{padding: '0'}}>
                 <div id="pulse_graph" style={{ width:'100%', minHeight: '400px' }}></div>
              </div>
            </div>
           </div>


    </div>
    );
  }
}