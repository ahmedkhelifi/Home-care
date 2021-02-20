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
    this.state = {
    };
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
    let history = this.props.temperatures.history;
    let jsonData = {temperature: history}
      //  currentDate
      var currentDate = new Date();
      // old7Datetimestample
      var days7before = currentDate.setDate( currentDate.getDate() - 7 );     //  最终获得的 old7Date 是时间戳  
      var truejsonData=jsonData.temperature.filter(obj => {return obj.timestamp>days7before});


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
              templist[i]=item.temperature  
              // wenn measured nicht false dann ersetzt die richtige weight dadrauf
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
                              formatter: '{c}'//echarts selbst build in variable fuer valu
                              
                          },
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
                                              fontSize: "8",
                                          },
                                         position:'start',
                                         formatter:"37.5°C"
                                     },
                                     yAxis:37.5    
                                    
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
        var myChart = echarts.init(document.getElementById('history_graph'));
        myChart.setOption(option);
        //fuer bootstrap layout
        $(window).on('resize', function(){
            if(myChart !== null && myChart !== undefined){
                myChart.resize();
				}
            });
		}

  beautify_timestamp = (unix_timestamp) => {
    let a = new Date( Number(unix_timestamp));
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let time = date + ' ' + month + ' ' + year ;
    
    return time;
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