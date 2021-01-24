import React from 'react';

// import ECharts
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/line';
import 'echarts/lib/component/title';
import'echarts/lib/component/grid' 
import 'echarts/lib/component/legend';
import 'echarts/lib/component/dataZoom';
import 'echarts/lib/component/tooltip';

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
    this.create_graph()
  }

   create_graph = ()  => {
        var currentDate = new Date();
        // old7Datetimestample
        let history = this.props.pulses.history;
        let jsonData = {pulse: history}
        var days7before = currentDate.setDate( currentDate.getDate() - 28 );     //  最终获得的 old7Date 是时间戳 
        //console.log(days7before)    
        var truejsonData=jsonData.pulse.filter(obj => {return obj.timestamp>days7before});
        console.log(truejsonData)
        
        
                        function timeformater(ts){
                            let date = new Date(ts);
                            let Y = date.getFullYear() + '.';
                            let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '.';
                            let D = date.getDate() ;
                            let result = Y+M+D
                            return result; 
                        }
        
        var timelist=new Array(28);
        for(let i=0;i<28;i++){
            let currentDate = new Date();
            let data = currentDate.setDate( currentDate.getDate() - i); 
            timelist[i]=timeformater(data)
        }
        timelist=timelist.reverse()
        
        var templist=new Array(28);
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
                        text: 'pulse last 28 days' },
                    xAxis: {
                        data: timelist,
                        axisTick: {show: false},
                        
                    },
                    yAxis: {
                        axisLine:{show:false},
                        axisLabel: {show: false},
                        splitLine: {show: false},
                        axisTick: {show: false},
                        type: 'value' ,
                        min: extent => extent.min <=30 ? extent.min-5 : 30,
                        // max: extent => extent.max >130 ? extent.max+1 : 130
                    },
                    dataZoom: [{
                        type: 'slider',
                        start: 0,
                        end: 100,
                    }],
                    tooltip: {
                        trigger: 'axis',
                        position: function (pt) {
                            return [pt[0], '10%'];
                        },
                    },
                    series: [{
                        connectNulls: true,
                        name: 'pulse',
                        type: 'line',
                        data: templist,

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
    <div className="container-fluid" style={{backgroundColor: '#f7f7f7', marginTop: '-20px',borderRadius: '7px'}}>
           <div className="patient_health_status_doctor" style={{marginTop: '50px'}}>
             <div className="row">
              <div className= 'col-md-12 col-xs-12 col-sm-12'>
                 <div id="pulse_graph" style={{ width:'100%', minHeight: '400px' }}></div>
              </div>
            </div>
           </div>
    </div>
    );
  }
}