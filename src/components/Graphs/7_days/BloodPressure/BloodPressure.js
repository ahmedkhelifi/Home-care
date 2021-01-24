import React from 'react';

// import ECharts
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import'echarts/lib/component/grid' 
import 'echarts/lib/component/markLine'

//Aufruf von $ Zeichen 
import $ from  'jquery';

import 'jquery';


export default class BloodPressure extends React.PureComponent { 

  constructor(props) {
    super(props);
  }


  componentDidMount(){
    this.create_graph()
  }

  componentDidUpdate(prevProps, prevState) {
      this.create_graph()
  }
    create_graph = ()  => {
                //  currentDate
                var currentDate = new Date();
                // old7Datetimestample
                var days7before = currentDate.setDate( currentDate.getDate() - 7 );     //  最终获得的 old7Date 是时间戳 
                let history = this.props.blood_pressures.history;
                let jsonData = {bloodpres: history}

                // console.log(jsonData)
                  
                var truejsonData=jsonData.bloodpres.filter(obj => {return obj.timestamp>days7before});

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

                truejsonData.forEach(function(item,index,arr){//db中近7天的array 可能只有3天
                    let i=timelist.indexOf(timeformater(item.timestamp))//richtige x axis daten value index
                    if(i>-1){//wenn an dem Tag etwas in DB erschienen 
                        if (item.measured!==false){ 
                        templist1[i]=item.bloodpres_dia
                        templist2[i]=item.bloodpres_sys
                        }// wenn measured nicht false dann ersetzt die richtige weight dadrauf
                    }
                })

                var option = {
                    title: [{
                        left: 'center',
                        text: '(sys.) blood pressure'
                        }, {
                        top: '55%',
                        left: 'center',
                        text: '(dia. ) blood pressure'
                    }],
                    xAxis: [{
                        axisTick:{show:false},
                        data: timelist,
                        gridIndex: 0
                        }, 
                        {
                        axisTick:{show:false},
                        data: timelist,
                        gridIndex: 1
                    }],
                    yAxis: [{
                        axisLine:{show:false},
                        axisLabel: {show: false},
                        splitLine: {show: false},
                        axisTick: {show: false},
                        type: 'value' ,
                        gridIndex: 0,
                        min: extent => extent.min < 100  ? extent.min : 100
                        }, {
                        axisLine:{show:false},
                        axisLabel: {show: false},
                        splitLine: {show: false},
                        axisTick: {show: false},
                        type: 'value',
                        gridIndex: 1,
                        min: extent => extent.min < 70  ? extent.min : 70
                    }],
                    grid: [{
                        bottom: '60%'
                        }, {
                        top: '60%'
                    }],
                    series: [{
                        type: 'line',
						connectNulls: true,
                        data: templist1,
                        xAxisIndex: 0,
                        yAxisIndex: 0,
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        }, {
                        type: 'line',
						connectNulls: true,
                        data: templist2,
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                    }]
                };

        var myChart = echarts.init(document.getElementById('blood_pressure_graph'));
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
           <div className="patient_health_status" style={{marginTop: '50px', paddingRight: '0', paddingLeft: '0'}}>
             <div className="row">
              <div className= 'col-md-12 col-xs-12 col-sm-12' style={{padding: '0'}}>
                 <div id="blood_pressure_graph" style={{ width:'100%', minHeight: '400px' }}></div>
              </div>
            </div>
           </div>
    );
  }
}