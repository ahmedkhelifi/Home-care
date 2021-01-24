import React from 'react';
import Confirmation from './Confirmation';
import MissedConfirmation from './MissedConfirmation';
import History from './History';

import WeightGraph from '../../Graphs/7_days/Weight';

import Tasks_weight from'../../../images/weight-clipart-black-and-white-3.png';
import My_History from'../../../images/my_history.png';

// import ECharts
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import'echarts/lib/component/grid' ;
import 'echarts/lib/component/markLine';
import 'echarts/lib/component/markLine';
import 'echarts/lib/component/legend';

//Aufruf von $ Zeichen 
import $ from  'jquery';
import 'jquery';


export default class Weight extends React.PureComponent { 

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
      this.create_graph()
    }
  }

  create_graph = () => {
    let history = this.props.weights.history;
    let jsonData = {weight: history}
    //  currentDate
    var currentDate = new Date();
    // old7Datetimestample
    var days7before = currentDate.setDate( currentDate.getDate() - 7 );     //  最终获得的 old7Date 是时间戳 
    //console.log(days7before)    
    
    var truejsonData = jsonData.weight.filter(obj => {return obj.timestamp>days7before});
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


    var templist1=[null,null,null,null,null,null,null]
    var templist2=[null,null,null,null,null,null,null]
    var hilfsweight=null
    truejsonData.forEach(function(item,index,arr){//db中近7天的array 可能只有3天
        let i=timelist.indexOf(timeformater(item.timestamp))//richtige x axis daten value index
        if(i>-1){//wenn an dem Tag etwas in DB erschienen 
            if (item.measured!==false){ 
            templist1[i]=(item.weight*0.1).toFixed(2)   
            }// wenn measured nicht false dann ersetzt die richtige weight dadrauf
            if (i===0 && item.measured!==false){
                    hilfsweight=(item.weight).toFixed(2) 
            }//first keine Aenderung erst ab zweite, wenn erste value hat dann hilfswert weist hinzu
            else if(item.measured!==false){
                if (hilfsweight===null){
                    hilfsweight=(item.weight).toFixed(2) 
                }
                else {
                    templist2[i]=((item.weight-hilfsweight)*10).toFixed(2)
                    hilfsweight=(item.weight).toFixed(2) 
                  }
            }

        }
    })

    var option ={

                    title: { 
                        left: 'center',
                        text: 'Weight last 7 Days'
                    },
                    legend: {
                        top:"6%",
                        left: 'right',
                        data: ['weight', 'change']
                    },
                    xAxis: {

                        type: 'category',

                        axisTick: {show: false},
                        data: timelist
                        
                    },
                    yAxis: {
     
                        axisLabel: {show: false},
                        splitLine: {show: false},
                        axisTick: {show: false},
                        type: 'value' ,
                        
                    },
                    series: [{
                        name: 'weight',
                        type: 'bar',
                        data: templist1,
                        stack:'weightgain',
                    
                        label: {
                            textStyle: {
                                fontWeight: "bolder",
                                fontSize: "8",
                            },
                            show: true,
                            position: 'inside',
                            formatter: function(params){
                                return (params.value*10).toFixed(2) +'kg'
                            }                     
                        },     
                    },
                    {
                        name: 'change',
                        type: 'bar',
                        data: templist2,
                        stack:'weightgain',
                    
                        label: {
                            textStyle: {
                                fontWeight: "bolder",
                                fontSize: "8",
                            },
                            show: true,
                            position: 'inside',
                            formatter: function(params){
                                return (params.value/10).toFixed(2) +'kg'
                            }

                        },     
                    },
                ]
                }

        var myChart = echarts.init(document.getElementById('weight_graph'));
        myChart.setOption(option);
        //fuer bootstrap layout
        $(window).on('resize', function(){
            if(myChart !== null && myChart !== undefined){
                myChart.resize();
            }
            });
  }


  addWeightPending = (weight) => {

        fetch('/api/patient/weight/pending/'+this.props.username+'/', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({weight: weight, measured:true})
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

  addWeightMissed = (weight, measured) => {
        fetch('/api/patient/weight/missed/'+this.props.username+'/'+this.state.popupMissedTimestamp, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({measured: measured, weight: weight})
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
    return (<Confirmation addWeightPending={this.addWeightPending} goBack={e => this.setState({confirmPopupPending: false})}/>)
  }

  if(this.state.confirmPopupMissed){
    return (<MissedConfirmation addWeightMissed={this.addWeightMissed} goBack={e => this.setState({confirmPopupMissed: false,})} popupMissedTimestampFrom={this.state.popupMissedTimestampFrom} popupMissedTimestampTo={this.state.popupMissedTimestampTo}/>)
  }

  if(this.state.history_bool){
    return (<History weight={this.props.weight} goBack={e => this.setState({history_bool: false})}/>)
  }

    return (
    <div className="container-fluid" style={{backgroundColor: '#f7f7f7', marginTop: '-20px', paddingTop: '30px', minHeight: '100vh'}}>

      <div className="col-12">
            <p className="patient_back" onClick={() => this.props.backToDashboard() }>&#10230;</p>
           <div className="patient_health_status" style={{marginTop: '40px'}}>
             <div className="row">
              <div className="col-9">
                      <h3 className="patient_status">My Weight</h3>
                      {this.props.weights.pending.length > 0 || this.props.weights.missed.length > 0 ? (<p className="patient_status_task">You have some opened Tasks..</p>) : (<p className="patient_status_task">You have completed all your tasks for today</p>)}
                      
              </div>
              <div className="col-3">
                      <img style={{marginTop: '30px'}}  src={Tasks_weight} alt="medication pill" className="tasks_pill" />
              </div>
            </div>
           </div>
      </div>


      {this.props.weights.pending.length > 0 ? (<p className="patient_tasks" style={{marginLeft: '25px'}} >Pending Task</p>) : (null)}

      {this.props.weights.pending.length > 0 ? (
        <div className="row" style={{padding: '0 20px'}}>  
          <div className="col-12" style={{padding: '0'}}>
            <div className="row" style={{borderRadius: '20px', padding: '10px 0'}}>  
              <div className="col-3">  
               <img style={{marginTop: '21px'}}  src={Tasks_weight} alt="medication pill" className="tasks_pill" />
              </div>
              <div className="col-5">  
                <p className="add_temprature">Add today's Weight</p>
              </div>
              <div className="col-4" onClick={e => this.setState({confirmPopupPending: true})}> 
                <span className="go">&#10230;</span>
              </div>
            </div>
          </div>
        </div>
      ) : (null)}

      {this.props.weights.missed.map((missed_temp,i) => {return (
                <div className="col-12">
                     <div className="patient_health_status" style={{marginTop: '40px', backgroundColor: '#ff00000a'}}>
                       <div className="row">
                        <div className="col-9">
                                <p className="" style={{fontSize: '18px'}}>Weight from {this.beautify_timestamp(missed_temp.from)} to {this.beautify_timestamp(missed_temp.to)} not taken</p>
                        </div>
                        <div className="col-3" onClick={e => this.setState({confirmPopupMissed: true,popupMissedTimestampFrom: this.beautify_timestamp(missed_temp.from), popupMissedTimestampTo: this.beautify_timestamp(missed_temp.to), popupMissedTimestamp: ( (Number(missed_temp.to)+ Number(missed_temp.from) ) / 2 )  })}> 
                          <span className="go">&#10230;</span>
                        </div>
                      </div>
                     </div>
                </div>
      )})}


      <p className="patient_tasks" style={{marginLeft: '25px'}} >History</p>

        <WeightGraph weights={this.props.weights}  />

          {/*this.props.weights.history.length > 0 ? (<span className="view_history" onClick={e => this.setState({history_bool: true})}> View full history &#10230;</span>) : (null)}
           <div className="patient_health_status" style={{marginTop: '50px', paddingRight: '0', paddingLeft: '0'}}>
             <div className="row">
              <div className= 'col-md-12 col-xs-12 col-sm-12' style={{padding: '0'}}>
                 <div id="weight_graph" style={{ width:'100%', minHeight: '400px' }}></div>
              </div>
            </div>
           </div>
        */}

    </div>
    );
  }
}