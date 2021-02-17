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
        let history = this.props.blood_pressures;
        let jsonData = {blood_pressure: history}
                //  currentDate
                var currentDate = new Date();
                // old7Datetimestample
                var days7before = currentDate.setDate( currentDate.getDate() - 7 );     //  最终获得的 old7Date 是时间戳 
                  
                var truejsonData=jsonData.blood_pressure.filter(obj => {return obj.timestamp>days7before});

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
                    tooltip: {
                        trigger: 'axis',
                        // position: function (pt) {
                        //     return [pt[0], '10%'];
                        // },
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
                                lineStyle:{               //警戒线的样式  ，虚实  颜色
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
                                lineStyle:{               //警戒线的样式  ，虚实  颜色
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

        var myChart = echarts.init(document.getElementById("blood_pressure"+this.props.id));
        myChart.setOption(option);
        //fuer bootstrap layout
        $(window).on('resize', function(){
            if(myChart !== null && myChart !== undefined){
                myChart.resize();
            }
            });
    }

    render() {
        return (
           <div id={"blood_pressure"+this.props.id} style={{ width:'100%', minHeight: '200px' }}></div>
        );
    }
}

export default BoodPressure;