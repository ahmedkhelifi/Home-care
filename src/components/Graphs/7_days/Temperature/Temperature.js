import React from 'react';

// import ECharts
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import'echarts/lib/component/grid' 
import 'echarts/lib/component/markLine'

//Aufruf von $ Zeichen 
import $ from  'jquery';
import 'jquery';

export default class Temperature extends React.PureComponent { 

  constructor(props) {
    super(props);
  }

  componentDidMount(){
    this.create_graph()
  }

  componentShouldUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      return true
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.create_graph()
    }
  }

  create_graph = () => {
      //get Jsondata from select Patient with his temperatures in history
      let history = this.props.temperatures.history;
      if(!history) return
      //make the Jsondata in Suitable format
      let jsonData = {temperature: history}
      if(jsonData.temperature.length === 0) return
      //  currentDate
      var currentDate = new Date();
      //  timestample before 7 days
      var days7before = currentDate.setDate( currentDate.getDate() - 7 );  
      // Keep content of jsonData from the last 7 days
      var truejsonData=jsonData.temperature.filter(obj => {return obj.timestamp>days7before});

      //function for change timestamp to yyyy mm dd
      function timeformater(ts){
          let date = new Date(ts);
          let Y = date.getFullYear() + '-';
          let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
          let D = date.getDate() + ' ';
          let result = Y+M+D
          return result; 
      }
      //initialize the value of the x-axis
      var timelist=[null,null,null,null,null,null,null];
      //format 
      timelist.forEach(function(item, index,timelist){
          let currentDate = new Date();
          let data = currentDate.setDate( currentDate.getDate() - index); 
          timelist[index]=timeformater(data)
      })
      //in right order
      timelist=timelist.reverse()
      //initialize the y-axis values
      var templist=[null,null,null,null,null,null,null]
      //let the temperature values find the correct position (identical with the timestamp) depends on their timestamps in Database
      truejsonData.reverse().forEach(function(item,index,arr){
          let i=timelist.indexOf(timeformater(item.timestamp))
          //i>-1 means the data was existed and item.measured!==false means the patient has not forget to give values
          if(i>-1&&item.measured!==false){
              //saved in array
              templist[i]=item.temperature  
          }
      })

      //graph infos
      var option ={
                      color:  'black',
                      title: { 
                          left: 'center',
                          text: 'Temperature last 7 Days in °C' },
                      xAxis: {
                          data: timelist,
                          
                      },
                      yAxis: {
       
                          axisLabel: {show: false},
                          splitLine: {show: false},
                          axisTick: {show: false},
                          type: 'value' ,
                          min: extent => extent.min <=36 ? extent.min-1 : 35,
                          max: extent => extent.max > 37.5  ? extent.max : 37.5
                      },
                      series: [{
                          name: 'temperature',
                          type: 'bar',
                          data: templist,
                          itemStyle:{
                            normal:{
                                color:function(params){
                                    if(params.value <36.5){
                                        return "#FFA500";
                                    }else if(params.value >=36.5 && params.value<=37.5){
                                        return "#32CD32";
                                    }
                                    return "#DC143C";
                                }
                            }
                        },
                          label: {
                              textStyle: {
                                  fonttemperature: "bolder",
                                  fontSize: "8",
                                  color: "#fff"
                              },
                              show: true,
                              position: 'inside',
                              formatter: '{c}'//echarts selbst build in variable fuer value
                              
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
                                              fonttemperature: "bolder",
                                              color:  'black',
                                              fontSize: "8",
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
                                          fonttemperature: "bolder",
                                          color:  'black',
                                          fontSize: "8",
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
        //greate the graph id
        var myChart = echarts.init(document.getElementById('history_graph'));
        //set the graph with defined option
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
                 <div id="history_graph" style={{ width:'100%', minHeight: '400px' }}></div>
              </div>
            </div>
           </div>
    </div>
    );
  }
}