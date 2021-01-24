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


class Pulse extends Component {
    componentDidMount() {
        this.create_graph()
    }

    create_graph = () => {
        let history = this.props.pulses;
        let jsonData = {pulse: history}
    //  currentDate
    var currentDate = new Date();
    // old7Datetimestample
    var days7before = currentDate.setDate( currentDate.getDate()-7 );     //  最终获得的 old7Date 是时间戳 
    console.log(days7before)    
    var truejsonData=jsonData.pulse.filter(obj => {return obj.timestamp>days7before});
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
                    color:  '#800000',
                    tooltip: {
                        trigger: 'axis',
                        position: function (pt) {
                            return [pt[0], '10%'];
                        },
                    },
                    xAxis: {
                        data: timelist,
                        axisTick:{show:false},
                        axisLabel:{show:false}
                    },
                    yAxis: {
                        axisLine:{show:false},
                        axisLabel: {show: false},
                        splitLine: {show: false},
                        axisTick: {show: false},
                        type: 'value' ,
                        min: extent => extent.min <=60 ? extent.min-5 : 50,
                        max: extent => extent.max >90 ? extent.max+1 : 92
                    },
                    series: [{
                        connectNulls: true,
                        name: 'pulse',
                        type: 'line',
                        data: templist,
                        markLine : {
                            symbol:"none",
                            data : [{
                                 
        
                                lineStyle:{               //警戒线的样式  ，虚实  颜色
                                    type:"solid",
                                    color:"#FA3934",
                                },
                                    label:{
                                     textStyle: {
                                         fonttemperature: "bolder",
                                         color:  'black',
                                         fontSize: "4",
                                     },
                                    position:'start',
                                    formatter:"90"
                                },
                                yAxis:90  
                               
                            },
                            {
 
                                lineStyle:{               //警戒线的样式  ，虚实  颜色
                                    type:"solid",
                                    color:"green",
                                },
                                label:{
                                 textStyle: {
                                     fonttemperature: "bolder",
                                     color:  'black',
                                     fontSize: "4",
                                 },
                                    position:'start',
                                    formatter:"60 ",
                                },
                                yAxis:60   
                          
                            }
                            ]
                        }　　
                    }]
                }

        var myChart = echarts.init(document.getElementById('pulse'+this.props.id));
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
           <div id={"pulse"+this.props.id} style={{ width:'100%', minHeight: '200px' }}></div>
        );
    }
}

export default Pulse;