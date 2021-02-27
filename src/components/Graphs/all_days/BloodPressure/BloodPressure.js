import React from 'react';

// import ECharts
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/line';
import 'echarts/lib/component/title';
import'echarts/lib/component/grid' 
import 'echarts/lib/component/legend';
import 'echarts/lib/component/dataZoom';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/markLine';

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
                var currentDate = new Date();
                let history = this.props.blood_pressures.history;
                let jsonData = {bloodpres: history}
                
                if(jsonData.bloodpres.length === 0) return

                var firstdate=jsonData.bloodpres[0].timestamp
                var today=currentDate.getTime()
                var diffday=Math.floor((today-firstdate)/(24*60*60*1000))+1;// 天
                var truejsonData=jsonData.bloodpres.filter(obj => {return obj.timestamp});
                

                function timeformater(ts){
                    let date = new Date(ts);
                    let Y = date.getFullYear() + '.';
                    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '.';
                    let D = date.getDate() ;
                    let result = Y+M+D
                    return result; 
                }


                var timelist=new Array(diffday);
                for(let i=0;i<diffday;i++){
                    let currentDate = new Date();
                    let data = currentDate.setDate( currentDate.getDate() - i); 
                    timelist[i]=timeformater(data)
                }
                timelist=timelist.reverse()

                var templist1= Array(diffday);
                var templist2= Array(diffday);

                truejsonData.forEach(function(item,index,arr){//db中近7天的array 可能只有3天
                    let i=timelist.indexOf(timeformater(item.timestamp))//richtige x axis daten value index
                    if(i>-1){//wenn an dem Tag etwas in DB erschienen 
                        if (item.measured!==false){ 
                        templist2[i]=item.bloodpres_dia
                        templist1[i]=item.bloodpres_sys
                        }// wenn measured nicht false dann ersetzt die richtige weight dadrauf
                    }
                })

                var option = {
                    title: [{
                        left: 'center',
                        text: '(sys.) Blood pressure'
                        }, {
                        top: '45%',
                        left: 'center',
                        text: '(dia. ) Blood pressure'
                    }],
                    dataZoom: [
                        {
                            show: true,
                            realtime: true,
                            start: 0,
                            end: 100,
                            xAxisIndex: [0, 1]
                        },
                        {
                            type: 'slider',
                            start: 0,
                            end: 100,
                            xAxisIndex: [0, 1]
                        }
                    ],
                    tooltip: {
                        trigger: 'axis',
                        position: function (pt) {
                            return [pt[0], '10%'];
                        },
                    },
                    xAxis: [{
                        data: timelist,
                        gridIndex: 0,
                        axisTick: {show: false},
                        }, 
                        {
                        data: timelist,
                        gridIndex: 1,
                        axisTick: {show: false},
                    }],
                    yAxis: [{
                        axisLine:{show:false},
                        axisLabel: {show: false},
                        splitLine: {show: false},
                        axisTick: {show: false},
                        type: 'value' ,
                        gridIndex: 0,
                        min: extent => extent.min < 100  ? extent.min : 100,
                        max: extent => extent.max > 140  ? extent.max : 142
                        }, {
                        axisLine:{show:false},
                        axisLabel: {show: false},
                        splitLine: {show: false},
                        axisTick: {show: false},
                        type: 'value',
                        gridIndex: 1,
                        min: extent => extent.min < 70  ? extent.min : 70,
                        max: extent => extent.max > 90  ? extent.max : 92
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
    <div className="container-fluid" style={{backgroundColor: '#f7f7f7', marginTop: '-20px',borderRadius: '7px'}}>

           <div className="patient_health_status_doctor" style={{marginTop: '50px', paddingRight: '0', paddingLeft: '0'}}>
             <div className="row">
              <div className= 'col-md-12 col-xs-12 col-sm-12' style={{padding: '0'}}>
                 <div id="blood_pressure_graph" style={{ width:'100%', minHeight: '400px' }}></div>
              </div>
            </div>
           </div>


    </div>
    );
  }
}