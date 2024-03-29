import React from 'react';

// import ECharts
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import'echarts/lib/component/grid' ;
import 'echarts/lib/component/markLine';
import 'echarts/lib/component/legend';

//Aufruf von $ Zeichen 
import $ from  'jquery';
import 'jquery';


export default class Weight extends React.PureComponent { 

  constructor(props) {
    super(props);
  }
  componentDidMount(){
    this.create_graph()
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.create_graph()
    }
  }

  create_graph = () => {
    //get Jsondata from select Patient with his weights in history
    let history = this.props.weights.history;
    if(!history) return
    //in passed format
    let jsonData = {weight: history}
    if(jsonData.weight.length === 0) return
        
    //  currentDate
    var currentDate = new Date();
    // timestamp before last 7 days
    var days7before = currentDate.setDate( currentDate.getDate() - 7 );    
    //filter content of jsonData from the last 7 days 
    var truejsonData = jsonData.weight.filter(obj => {return obj.timestamp>days7before});


        //function for change format of timestamp: timestamp->YYYY-MM-DD 
    function timeformater(ts){
        let date = new Date(ts);
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        let D = date.getDate() + ' ';
        let result = Y+M+D
        return result; 
    }


    // initialize the x-axis values
    var timelist=[null,null,null,null,null,null,null];
    //format
    timelist.forEach(function(item, index,timelist){
        let currentDate = new Date();
        let data = currentDate.setDate( currentDate.getDate() - index); 
        timelist[index]=timeformater(data)
    })
    // in correct order
    timelist=timelist.reverse()

    //templist 1 = weight values 
    //templist 2 = weight differ
    //initialize the arrays for y-axis
    var templist1=[null,null,null,null,null,null,null]
    var templist2=[null,null,null,null,null,null,null]
    //Base value for differ
    var hilfsweight=null
    
    //let the weight and differs values find the correct position (identical with the timestamp) depends on their timestamps in Database
    truejsonData.forEach(function(item,index,arr){
        let i=timelist.indexOf(timeformater(item.timestamp))
        if(i>-1){
            if (item.measured!==false){ 
            templist1[i]=(item.weight*0.1).toFixed(2)   
            }
            if (i===0 && item.measured!==false){
                    hilfsweight=(item.weight).toFixed(2) 
            }
            else if(item.measured!==false){
                if (hilfsweight===null){
                    hilfsweight=Number(item.weight).toFixed(2) 
                }
                else {
                    templist2[i]=((item.weight-hilfsweight)*10).toFixed(2)
                    hilfsweight=item.weight
                  }
            }
        }
    })
    //graphs infos 
    var option ={

                    title: { 
                        left: 'center',
                        text: 'Weight last 7 Days in Kg'
                    },
                    legend: {
                        top:"6%",
                        left: 'right',
                        data: ['weight', 'change']
                    },
                    xAxis: {

                        type: 'category',

                        axisTick: {show: false},
                        data: timelist
                        
                    },
                    yAxis: {
     
                        axisLabel: {show: false},
                        splitLine: {show: false},
                        axisTick: {show: false},
                        type: 'value' ,
                        
                    },
                    series: [{
                        name: 'weight',
                        type: 'bar',
                        data: templist1,
                        stack:'weightgain',
                    
                        label: {
                            textStyle: {
                                fontWeight: "bolder",
                                fontSize: "8",
                            },
                            show: true,
                            position: 'inside',
                            formatter: function(params){
                                return (params.value *10).toFixed(2)
                            }                     
                        },     
                    },
                    {
                        name: 'change',
                        type: 'bar',
                        data: templist2,
                        stack:'weightgain',
                    
                        label: {
                            textStyle: {
                                fontWeight: "bolder",
                                fontSize: "8",
                            },
                            show: true,
                            position: 'inside',
                            formatter: function(params){
                                return (params.value/10).toFixed(2)
                            }

                        },     
                    },
                ]
            }
        //graphs id
        var myChart = echarts.init(document.getElementById('weight_graph'));
        //set the option for the graph
        myChart.setOption(option);
        //for the flexible layout
        $(window).on('resize', function(){
            if(myChart !== null && myChart !== undefined){
                myChart.resize();
            }
        });
  }
  render() {

    return (
           <div className="patient_health_status" style={{marginTop: '50px', paddingRight: '0', paddingLeft: '0'}}>
             <div className="row">
              <div className= 'col-md-12 col-xs-12 col-sm-12' style={{padding: '0'}}>
                 <div id="weight_graph" style={{ width:'100%', minHeight: '400px' }}></div>
              </div>
            </div>
           </div>
    );
  }
}