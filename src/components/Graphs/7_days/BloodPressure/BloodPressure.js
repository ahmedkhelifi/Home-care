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
                //  timestample before 7 days
                var days7before = currentDate.setDate( currentDate.getDate() - 7 );   
                //get Jsondata from select Patient with his blood_pressures in history
                let history = this.props.blood_pressures.history;
                if(!history) return
                let jsonData = {bloodpres: history}
                if(jsonData.bloodpres.length === 0) return

                // Keep content of jsonData from the last 7 days  
                var truejsonData=jsonData.bloodpres.filter(obj => {return obj.timestamp>days7before});
                //function for change format of timestamp: timestamp->YYYY-MM-DD 
                function timeformater(ts){
                    let date = new Date(ts);
                    let Y = date.getFullYear() + '-';
                    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                    let D = date.getDate() + ' ';
                    let result = Y+M+D
                    return result; 
                }
                //Initialize the value of x-axis for the graph (7days)
                var timelist=[null,null,null,null,null,null,null];
                //make the x-axis with last 7 days datas with YYYY-MM-DD format
                timelist.forEach(function(item, index,timelist){
                    let currentDate = new Date();
                    let data = currentDate.setDate( currentDate.getDate() - index); 
                    timelist[index]=timeformater(data)
                })
                //correct order
                timelist=timelist.reverse()
                
                //Initialize the value of y-axis for the graph (7days)  
                //  templist1 bloodpres_sys
                //  templist2 bloodpres_dia
                var templist1=[null,null,null,null,null,null,null]
                var templist2=[null,null,null,null,null,null,null]
                //let the values find the correct position (identical with the timestamp) depends on their timestamps in Database
                truejsonData.forEach(function(item,index,arr){
                    let i=timelist.indexOf(timeformater(item.timestamp))
                    //i>-1 means the data was existed and item.measured!==false means the patient has not forget to give values
                    if(i>-1){
                        if (item.measured!==false){ 
                        //save in the y-axis arrays in the correct position
                        templist2[i]=item.bloodpres_dia
                        templist1[i]=item.bloodpres_sys
                        }
                    }
                })
                // graphs infos
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
                          formatter: '{c}'
                          
                        },　　
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
                        label: {
                          show: true,
                          position: 'top',
                          formatter: '{c}'
                          
                        },　　
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
        //define the id of the graph
        var myChart = echarts.init(document.getElementById('blood_pressure_graph'));
        //set the graph with infos in option
        myChart.setOption(option);
        //for fleible layout
        $(window).on('resize', function(){
            if(myChart !== null && myChart !== undefined){
                myChart.resize();
            }
        });
    }
  render() {
    // location for the graph on the html page
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