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

export default class Pulse extends React.PureComponent { 

  constructor(props) {
    super(props);
  }


  componentDidMount(){
    window.scrollTo({ top: 0 });
    this.create_graph()
  }
  componentDidUpdate(prevProps, prevState) {
      this.create_graph()
  }


   create_graph = ()  => {
       //currentdate
        var currentDate = new Date();
        //get Jsondata from select Patient with his pulses in history 
        let history = this.props.pulses.history;
        //passed format
        let jsonData = {pulse: history}
        //  timestample before 28 days
        var days28before = currentDate.setDate( currentDate.getDate() - 28 );
        // Keep content of jsonData from the last 28 days                  
        var truejsonData=jsonData.pulse.filter(obj => {return obj.timestamp>days28before});

        
        //function for timestamp -> yyyy.mm.dd
        function timeformater(ts){
            let date = new Date(ts);
            let Y = date.getFullYear() + '.';
            let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '.';
            let D = date.getDate() ;
            let result = Y+M+D
            return result; 
        }
        //initialize array for the x-axis values 
        var timelist=new Array(28);
        //in correct display format
        for(let i=0;i<28;i++){
            let currentDate = new Date();
            let data = currentDate.setDate( currentDate.getDate() - i); 
            timelist[i]=timeformater(data)
        }
        //in correct order
        timelist=timelist.reverse()
        //initialize the y-axis values
        var templist=new Array(28);
        //locate the y-values
        truejsonData.reverse().forEach(function(item,index,arr){
            let i=timelist.indexOf(timeformater(item.timestamp))
            if(i>-1&&item.measured!==false){
                templist[i]=item.pulse  
            }
        })
        


    //graph infos
    var option ={
                    color: '#800000',
                    title: { 
                        left: 'center',
                        text: 'pulse last 28 days' },
                    xAxis: {
                        data: timelist,
                        axisTick: {show: false},
                        
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
                    dataZoom: [{
                        type: 'slider',
                        start: 0,
                        end: 100,
                    }],
                    tooltip: {
                        trigger: 'axis',
                        position: function (pt) {
                            return [pt[0], '10%'];
                        },
                    },
                    series: [{
                        connectNulls: true,
                        name: 'pulse',
                        type: 'line',
                        data: templist,
                        markLine : {
                            symbol:"none",
                            data : [{
                                 
        
                                lineStyle:{               
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
 
                                lineStyle:{               
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
        //set the graph with the id
        var myChart = echarts.init(document.getElementById('pulse_graph'));
        //defined the graph with option
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
           <div className="patient_health_status_doctor" style={{marginTop: '50px'}}>
             <div className="row">
              <div className= 'col-md-12 col-xs-12 col-sm-12'>
                 <div id="pulse_graph" style={{ width:'100%', minHeight: '400px' }}></div>
              </div>
            </div>
           </div>
    </div>
    );
  }
}