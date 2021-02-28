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
        //get Jsondata from select Patient with his pulses in history
        let history = this.props.pulses;
        //make the Jsondata in Suitable format
        let jsonData = {pulse: history}
        //  currentDate
        var currentDate = new Date();
        //  timestample before 7 days
        var days7before = currentDate.setDate( currentDate.getDate()-7 );   
        // Keep content of jsonData from the last 7 days 
        var truejsonData=jsonData.pulse.filter(obj => {return obj.timestamp>days7before});

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
        var templist=[null,null,null,null,null,null,null]
        //let the pulse values find the correct position (identical with the timestamp) depends on their timestamps in Database
        truejsonData.reverse().forEach(function(item,index,arr){

            let i=timelist.indexOf(timeformater(item.timestamp))
            //i>-1 means the data was existed and item.measured!==false means the patient has not forget to give values
            if(i>-1&&item.measured!==false){
                //save in the y-axis arrays in the correct position
                templist[i]=item.pulse  
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
        //define the graph with different id(depends on different patients)
        var myChart = echarts.init(document.getElementById('pulse'+this.props.id));
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
           <div id={"pulse"+this.props.id} style={{ width:'100%', minHeight: '200px' }}></div>
        );
    }
}

export default Pulse;