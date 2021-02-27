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


export default class BloodPressure extends React.Component {

  constructor(props) {
    super(props);
  }


  componentDidMount(){
    this.create_graph()
  }

  componentShouldUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      return true
    }
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
                let history = this.props.blood_pressures.history;
                if(!history) return
                let jsonData = {bloodpres: history}
                if(jsonData.bloodpres.length === 0) return

                  
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
                            if(typeof(item.bloodpres_dia)=='string'  ){
                                item.bloodpres_dia=parseFloat(item.bloodpres_dia)
                              }
                            if(typeof(item.bloodpres_sys)=='string'  ){
                            item.bloodpres_sys=parseFloat(item.bloodpres_sys)
                            }
                        templist2[i]=item.bloodpres_dia
                        templist1[i]=item.bloodpres_sys
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
                        min: extent => extent.min < 100  ? extent.min-2 : 98,
                        max: extent => extent.max > 140  ? extent.max+2 : 142
                        }, {
                        axisLine:{show:false},
                        axisLabel: {show: false},
                        splitLine: {show: false},
                        axisTick: {show: false},
                        type: 'value',
                        gridIndex: 1,
                        min: extent => extent.min < 70  ? extent.min-2 : 68,
                        max: extent => extent.max > 90  ? extent.max+2 : 92
                    }],
                    grid: [{
                        bottom: '60%'
                        }, {
                        top: '60%'
                    }],
                    series: [       
                        {
                        name:"sys",
                        connectNulls: true,
                        type: 'line',
                        data: templist1,
                        xAxisIndex: 0,
                        yAxisIndex: 0,
                        label: {
                          show: true,
                          position: 'top',
                          formatter: '{c}'//echarts selbst build in variable fuer valu
                          
                        },　　
                        markLine : {
                            symbol:"none",
                            data : [{
                                lineStyle:{               //警戒线的样式  ，虚实  颜色
                                    type:"solid",
                                    color:"#FA3934",
                                },
                                    label:{
                                     textStyle: {
                                         fontWeight: "bolder",
                                         color:  'black',
                                         fontSize: "7",
                                     },
                                    position:'start',
                                    formatter:"140"
                                },
                                yAxis:140  
                            }
                            ]
                        }　　

                    }, {
                        name:"dia",
                        connectNulls: true,
                        type: 'line',
                        data: templist2,
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        label: {
                          show: true,
                          position: 'top',
                          formatter: '{c}'//echarts selbst build in variable fuer valu
                          
                        },　　
                        markLine : {
                            symbol:"none",
                            data : [{
                                lineStyle:{               //警戒线的样式  ，虚实  颜色
                                    type:"solid",
                                    color:"#FA3934",
                                },
                                    label:{
                                     textStyle: {
                                         fontWeight: "bolder",
                                         color:  'black',
                                         fontSize: "7",
                                     },
                                    position:'start',
                                    formatter:"90"
                                },
                                yAxis:90   
                               
                            }]
                        }　　
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