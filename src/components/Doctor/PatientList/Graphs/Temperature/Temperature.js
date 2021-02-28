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


class Temperature extends Component {
    componentDidMount() {
        this.create_graph()
    }

    create_graph = () => {
        //get Jsondata from select Patient with his temperatures in history
        let history = this.props.temperatures;
        //make the Jsondata in Suitable format
        let jsonData = {temperature: history}
        //  currentDate
        var currentDate = new Date();
        //  timestample before 7 days
        var days7before = currentDate.setDate( currentDate.getDate() - 7 );   
        // Keep content of jsonData from the last 7 days
        var truejsonData=jsonData.temperature.filter(obj => {return obj.timestamp>days7before}); 

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
        //let the temperature values find the correct position (identical with the timestamp) depends on their timestamps in Database
        truejsonData.reverse().forEach(function(item,index,arr){
        let i=timelist.indexOf(timeformater(item.timestamp))
        //i>-1 means the data was existed and item.measured!==false means the patient has not forget to give values
        if(i>-1&&item.measured!==false){
            //save in the y-axis array in the correct position
            templist[i]=item.temperature  

        }
        })


        //graph infos
        var option ={
                        color:  'black',
                        xAxis: {
                            data: timelist,
                            axisTick: {show: false},
                            axisLabel: {show: false},
                        },
                        yAxis: {
                            axisLine:{show:false},
                            axisLabel: {show: false},
                            splitLine: {show: false},
                            axisTick: {show: false},
                            type: 'value' ,
                            min: extent => extent.min <=34 ? extent.min-1 : 33,
                            max: extent => extent.max > 37.5  ? extent.max : 37.5
                        },
                        tooltip: {
                            trigger: 'axis',
                            position: function (pt) {
                                return [pt[0], '10%'];
                            },
                        },
                        series: [{

                            barCategoryGap:"2%",
                            name: 'temperature',
                            type: 'bar',
                            data: templist,
                            itemStyle:{
                                normal:{
                                    color:function(params){
                                        if(params.value >37.5){
                                            return "#DC143C";
                                        }
                                        else if(params.value >=36.5 && params.value<=37.5){
                                            return "#32CD32";
                                        }
                                        else if(params.value<36.5) {return "#FFA500";
                                        }
                                        else return 'black';
                                    }
                                }
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
                                                fontSize: "4",
                                            },
                                        position:'start',
                                        formatter:"37.5"
                                    },
                                    yAxis:37.5     
                                    
                                },
                                {
                                    lineStyle:{               
                                        type:"solid",
                                        color:"green",
                                    },
                                    label:{
                                        textStyle: {
                                            fontWeight: "bolder",
                                            color:  'black',
                                            fontSize: "4",
                                        },
                                        position:'start',
                                        formatter:"36.5 ",
                                    },
                                    yAxis:36.5    
                                
                                }
                                ]
                            }　　
                        }]
                    }
        //define the graph with different id(depends on different patients)
        var myChart = echarts.init(document.getElementById("temperature"+this.props.id));
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
           <div id={"temperature"+this.props.id} style={{ width:'100%', minHeight: '200px' }}></div>
        );
    }
}

export default Temperature;