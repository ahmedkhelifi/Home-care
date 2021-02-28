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


class Weight extends Component {
    componentDidMount() {
        this.create_graph()
    }

    create_graph = () => {
        //get Jsondata from select Patient with his weights in history
        let history = this.props.weights;
        //make the Jsondata in Suitable format
        let jsonData = {weight: history}
        //  currentDate
        var currentDate = new Date();
        //  timestample before 7 days
        var days7before = currentDate.setDate( currentDate.getDate() - 7 );    
        // Keep content of jsonData from the last 7 days 
        var truejsonData=jsonData.weight.filter(obj => {return obj.timestamp>days7before});
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
        //templist 1 means the weight
        //templist 2 means the weight differ
        var templist1=[null,null,null,null,null,null,null]
        var templist2=[null,null,null,null,null,null,null]
        // Base value for colculate the differ
        var hilfsweight=null
        //let the weight and differs values find the correct position (identical with the timestamp) depends on their timestamps in Database
        truejsonData.forEach(function(item,index,arr){
            let i=timelist.indexOf(timeformater(item.timestamp))
            //i>-1 means the data was existed    
            if(i>-1){
                //and item.measured!==false means the patient has not forget to give values        
                if (item.measured!==false){ 
                    //let users see the difference bigger, and let the values not too big so * 0.1
                    templist1[i]=(item.weight*0.1).toFixed(2)   
                }
                //refresh the Base value of comparison if the first value was existed
                if (i===0 && item.measured!==false){
                    hilfsweight=item.weight
                }
                // for the differ calculation.... saved the difference in the templist2
                else if(item.measured!==false){
                    if (hilfsweight===null){
                        hilfsweight=item.weight
                    }
                    else {
                        templist2[i]=(item.weight-hilfsweight).toFixed(2)
                        hilfsweight=item.weight}
                }

            }
        })
        //graph infos
        var option ={
                        tooltip: {
                            trigger: 'axis',
                            position: function (pt) {
                                return [pt[0], '10%'];
                            },
                        },
                        xAxis: {
                            axisLabel: {show: false},
                            
                            axisTick: {show: false},
                            splitLine: {show: false},
                            data: timelist
                            
                        },
                        yAxis: {
                            axisLine:{show:false},
                            axisLabel: {show: false},
                            splitLine: {show: false},
                            axisTick: {show: false},
                            type: 'value' ,     
                        },
                        series: [
                        {
                            barCategoryGap:"0%",
                            name: 'change',
                            type: 'bar',
                            data: templist2,     
                        },
                    ]
                    }
        //define the graph with different id(depends on different patients)
        var myChart = echarts.init(document.getElementById("weight"+this.props.id));
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
           <div id={"weight"+this.props.id} style={{ width:'100%', minHeight: '200px' }}></div>
        );
    }
}

export default Weight;