import React from 'react';

// import ECharts
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import'echarts/lib/component/grid' 
import'echarts/lib/component/markLine' 
//Aufruf von $ Zeichen 
import $ from  'jquery';
import 'jquery';

export default class Pulse extends React.PureComponent { 
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
  create_graph = ()  => {
    //  currentDate
    var currentDate = new Date();
    //  timestample before 7 days
    var days7before = currentDate.setDate( currentDate.getDate() - 7 );   
    //get Jsondata from select Patient with his blood_pressures in history 
    let history = this.props.pulses;
    if(!history) return
    let jsonData = {pulse: history}
    if(jsonData.pulse.length === 0) return
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
    
    //initialize the y-axis values
    var templist=[null,null,null,null,null,null,null]
    //let the values find the correct position (identical with the timestamp) depends on their timestamps in Database
    truejsonData.reverse().forEach(function(item,index,arr){
      //i>-1 means the data was existed and item.measured!==false means the patient has not forget to give values
        let i=timelist.indexOf(timeformater(item.timestamp))
        if(i>-1&&item.measured!==false){
            //save in the y-axis arrays in the correct position
            templist[i]=item.pulse  
        }
    })
//graph infos
var option ={
  color: '#800000',
  title: { 
      left: 'center',
      text: 'pulse last 7 Days per minute' },
  xAxis: {
      data: timelist,
      axisTick:{show:false}
      
  },
  yAxis: {
      axisLabel: {show: false},
      splitLine: {show: false},
      axisTick: {show: false},
      type: 'value' ,
      min: extent => extent.min <=60 ? extent.min-5 : 55,
      max: extent => extent.max >130 ? extent.max+1 : 135
  },
  series: [{
      connectNulls: true,//laesst sich null wert nicht leer sein 
      name: 'pulse',
      type: 'line',
      data: templist,
      label: {
          show: true,
          position: 'top',
          formatter: '{c}'
          
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
        },
  }]
}
//define the id of the graph
var myChart = echarts.init(document.getElementById('pulse_graph'));
//set the graph with infos in option
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
      //passed to the HTML
    <div className="patient_health_status" style={{marginTop: '50px'}}>
             <div className="row">
              <div className= 'col-md-12 col-xs-12 col-sm-12'>
                 <div id="pulse_graph" style={{ width:'100%', minHeight: '400px' }}></div>
              </div>
            </div>
           </div>
    );
  }
}