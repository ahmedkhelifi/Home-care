import ReactDOM from 'react-dom';
import React, { Component } from 'react';

// import ECharts
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title';
import'echarts/lib/component/grid' 
import 'echarts/lib/component/legend';
//Aufruf von $ Zeichen 
import $ from  'jquery'
import 'jquery';


class BoodPressure extends Component {
    componentDidMount() {
        this.create_graph()
    }

    create_graph = () => {
                //get Jsondata from select Patient with his blood_pressures in history
                let history = this.props.blood_pressures;
                //make the Jsondata in Suitable format
                let jsonData = {blood_pressure: history}
                //  currentDate
                var currentDate = new Date();
                //  timestample before 7 days
                var days7before = currentDate.setDate( currentDate.getDate() - 7 );   
                // Keep content of jsonData from the last 7 days
                var truejsonData=jsonData.blood_pressure.filter(obj => {return obj.timestamp>days7before});
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
                //graph infos
                var option = {
                    tooltip: {
                        trigger: 'axis',
                    },
                    xAxis: [{
                        data: timelist,
                        gridIndex: 0,
                        axisTick: {show: false},
                        axisLabel: {show: false},
                        splitLine: {show: false},
                        }, 
                        {
                        data: timelist,
                        gridIndex: 1,

                        axisLabel: {show: false},
                        splitLine: {show: false},
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
                        }, 
                        {
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
                        connectNulls: true,
                        type: 'line',
                        name:"sys",
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
                                         fontSize: "4",
                                     },
                                    position:'start',
                                    formatter:"140"
                                },
                                yAxis:140  
                            }
                            ]
                        }
                        }, {
                        connectNulls: true,
                        type: 'line',
                        name:"dia",
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
                                         fontSize: "4",
                                     },
                                    position:'start',
                                    formatter:"90"
                                },
                                yAxis:90   
                               
                            }]
                        }　　
                        }
                        ]
                };
        //define the graph with different id(depends on different patients)
        var myChart = echarts.init(document.getElementById("blood_pressure"+this.props.id));
        // set the graph with in option saved features
        myChart.setOption(option);
        // this function is for flexibel layout  
        $(window).on('resize', function(){
            if(myChart !== null && myChart !== undefined){
                myChart.resize();
            }
        });
    }

    render() {
        return (
            //create postion in HIML page for the graph with different ids
           <div id={"blood_pressure"+this.props.id} style={{ width:'100%', minHeight: '200px' }}></div>
        );
    }
}

export default BoodPressure;