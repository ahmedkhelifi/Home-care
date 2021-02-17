import React from 'react';

// import ECharts
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import'echarts/lib/component/grid' 

//Aufruf von $ Zeichen 
import $ from  'jquery';
import 'jquery';

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
    if (this.props.pulses !== undefined ) this.create_graph()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.create_graph()
    }
  }

  create_graph = ()  => {
    //  currentDate

    var currentDate = new Date();
    // old7Datetimestample
    var days7before = currentDate.setDate( currentDate.getDate() - 7 );     //  最终获得的 old7Date 是时间戳  
    let history = this.props.pulses;

    console.log('aaaa')

    let jsonData = {pulse: history}

    if(jsonData.pulse.length === 0) return
      
    var truejsonData=jsonData.pulse.filter(obj => {return obj.timestamp>days7before});

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
      text: 'pulse last 7 Days per minute' },
  xAxis: {
      data: timelist,
      axisTick:{show:false}
      
  },
  yAxis: {
      axisLabel: {show: false},
      splitLine: {show: false},
      axisTick: {show: false},
      type: 'value' ,
      // min: extent => extent.min <=70 ? extent.min-5 : 70,
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
          formatter: '{c}'//echarts selbst build in variable fuer valu
          
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

    return (

    <div className="patient_health_status" style={{marginTop: '50px'}}>
             <div className="row">
              <div className= 'col-md-12 col-xs-12 col-sm-12'>
                 <div id="pulse_graph" style={{ width:'100%', minHeight: '400px' }}></div>
              </div>
            </div>
           </div>
    );
  }
}