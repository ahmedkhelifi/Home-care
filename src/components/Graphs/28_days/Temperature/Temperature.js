import React from 'react';

// import ECharts
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import'echarts/lib/component/grid' ;
import 'echarts/lib/component/markLine';
import 'echarts/lib/component/dataZoom';

//Aufruf von $ Zeichen 
import $ from  'jquery';
import 'jquery';

export default class Temperature extends React.PureComponent { 

  constructor(props) {
    super(props);
    this.state = {
    };
  }


  componentDidMount(){
    this.create_graph()
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.state.confirmPopupPending && !this.state.confirmPopupMissed) {
      this.create_graph()
    }
  }

    create_graph = ()  => {
        //  currentDate
        var currentDate = new Date();
        //get Jsondata from select Patient with his temperatures in history
        let history = this.props.temperatures.history;
        //make the Jsondata in Suitable format
        let jsonData = {temperature: history}
        // get the timestamp before 28 days
        var days28before = currentDate.setDate( currentDate.getDate() - 28);    
        //filter the content in last 28 days 
        var truejsonData=jsonData.temperature.filter(obj => {return obj.timestamp>days28before});
        
        //function for timestamp-> yyyy-mm-dd
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
        //set x-axis values with date-format
        for(let i=0;i<28;i++){
            let currentDate = new Date();
            let data = currentDate.setDate( currentDate.getDate() - i); 
            timelist[i]=timeformater(data)
        }
        //in correct order
        timelist=timelist.reverse()
        //initialize the y-axis
        var templist=new Array(28);
        //filter and set the values in correct postion
        truejsonData.reverse().forEach(function(item,index,arr){
            let i=timelist.indexOf(timeformater(item.timestamp))
            if(i>-1&&item.measured!==false){
                templist[i]=item.temperature  
            }
        })
                   
        //graph infos
        var option ={
            color:  'black',
            title: { 
                left: 'center',
                text: 'Temperature last 28 days' },
            xAxis: {
                data: timelist,
                axisTick: {show: false}
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
                                    fontSize: "7",
                                },
                               position:'start',
                               formatter:"37.5°C"
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
                                fontSize: "7",
                            },
                               position:'start',
                               formatter:"36.5 °C",
                           },
                           yAxis:36.5
                     
                       }
                       ]
                   }　　
            }]
        }
        //set the id for the graph
        var myChart = echarts.init(document.getElementById('temperature_graph'));
        //set the option in graph
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
                 <div id="temperature_graph" style={{ width:'100%', minHeight: '400px' }}></div>
              </div>
            </div>
           </div>
    </div>
    );
  }
}