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
        //format
        let jsonData = {temperature: history}
        if(jsonData.temperature.length === 0) return

        //time intervall
        var firstdate=jsonData.temperature[0].timestamp
        var today=currentDate.getTime()
        var diffday=Math.floor((today-firstdate)/(24*60*60*1000))+1;
        var truejsonData=jsonData.temperature.filter(obj => {return obj.timestamp});
        

        //function for the timestamp formater
        function timeformater(ts){
            let date = new Date(ts);
            let Y = date.getFullYear() + '.';
            let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '.';
            let D = date.getDate() ;
            let result = Y+M+D
            return result; 
        }
        
        //x-axis values
        var timelist=new Array(diffday);
        for(let i=0;i<diffday;i++){
            let currentDate = new Date();
            let data = currentDate.setDate( currentDate.getDate() - i); 
            timelist[i]=timeformater(data)
        }
        timelist=timelist.reverse()
        

        //y-axis values
        var templist=new Array(diffday);
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
                text: 'Temperature' },
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
        //set graph with id
        var myChart = echarts.init(document.getElementById('temperature_graph'));
        //defined with option
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