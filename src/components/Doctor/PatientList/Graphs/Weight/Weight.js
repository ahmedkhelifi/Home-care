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
        let history = this.props.weights;
        let jsonData = {weight: history}
                //  currentDate
                var currentDate = new Date();
                // old7Datetimestample
                var days7before = currentDate.setDate( currentDate.getDate() - 7 );     //  最终获得的 old7Date 是时间戳 
                var truejsonData=jsonData.weight.filter(obj => {return obj.timestamp>days7before});

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
                var hilfsweight=null
                truejsonData.forEach(function(item,index,arr){//db中近7天的array 可能只有3天
                    let i=timelist.indexOf(timeformater(item.timestamp))//richtige x axis daten value index
                    if(i>-1){//wenn an dem Tag etwas in DB erschienen 
                        if (item.measured!==false){ 
                        templist1[i]=(item.weight*0.1).toFixed(2)   
                        }// wenn measured nicht false dann ersetzt die richtige weight dadrauf
                        if (i===0 && item.measured!==false){
                            hilfsweight=item.weight
                        }//first keine Aenderung erst ab zweite, wenn erste value hat dann hilfswert weist hinzu
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

        var myChart = echarts.init(document.getElementById("weight"+this.props.id));
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
           <div id={"weight"+this.props.id} style={{ width:'100%', minHeight: '200px' }}></div>
        );
    }
}

export default Weight;