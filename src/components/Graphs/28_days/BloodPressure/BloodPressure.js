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
                //  currentDate
                var currentDate = new Date();
                // timestamp before 28 days
                var days28before = currentDate.setDate( currentDate.getDate() - 28 );     //  最终获得的 old7Date 是时间戳 
                //get Jsondata from select Patient with his blood_pressures in history 
                let history = this.props.blood_pressures.history;
                //passed format
                let jsonData = {bloodpres: history}
                //filter the content in 28 days  
                var truejsonData=jsonData.bloodpres.filter(obj => {return obj.timestamp>days28before});
                //function for timestamp->yyyy.mm.dd
                function timeformater(ts){
                    let date = new Date(ts);
                    let Y = date.getFullYear() + '.';
                    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '.';
                    let D = date.getDate() ;
                    let result = Y+M+D
                    return result; 
                }
                //initialize the x-axis values
                var timelist=new Array(28);
                //in correct format
                for(let i=0;i<28;i++){
                    let currentDate = new Date();
                    let data = currentDate.setDate( currentDate.getDate() - i); 
                    timelist[i]=timeformater(data)
                }
                //in correct order
                timelist=timelist.reverse()

                //initialize the y values 
                //templist1 is sys
                //templist2 is dia
                var templist1= Array(28);
                var templist2= Array(28);
                //locate the y values in correct position
                truejsonData.forEach(function(item,index,arr){
                    let i=timelist.indexOf(timeformater(item.timestamp))
                    if(i>-1){
                        if (item.measured!==false){ 
                        templist2[i]=item.bloodpres_dia
                        templist1[i]=item.bloodpres_sys
                        }
                    }
                })
                //graph infos
                var option = {
                    title: [{
                        left: 'center',
                        text: '(sys.) blood pressure last 28 days'
                        }, {
                        top: '45%',
                        left: 'center',
                        text: '(dia. ) blood pressure last 28 days'
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
                                lineStyle:{               
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
                                lineStyle:{               
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

        //set the graph id
        var myChart = echarts.init(document.getElementById('blood_pressure_graph'));
        //deifine the graph with option
        myChart.setOption(option);
        //for flexible layout
        $(window).on('resize', function(){
            if(myChart !== null && myChart !== undefined){
                myChart.resize();
            }
        });
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