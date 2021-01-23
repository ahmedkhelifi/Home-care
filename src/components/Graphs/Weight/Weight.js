import React from 'react';

// import ECharts
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import'echarts/lib/component/grid' ;
import 'echarts/lib/component/markLine';
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
    this.create_graph()
  }

  create_graph = () => {
    let history = this.props.weights.history;
    let jsonData = {weight: history}
    //  currentDate
    var currentDate = new Date();
    // old7Datetimestample
    var days7before = currentDate.setDate( currentDate.getDate() - 7 );     //  最终获得的 old7Date 是时间戳    
    
    var truejsonData = jsonData.weight.filter(obj => {return obj.timestamp>days7before});



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
                    hilfsweight=(item.weight).toFixed(2) 
            }//first keine Aenderung erst ab zweite, wenn erste value hat dann hilfswert weist hinzu
            else if(item.measured!==false){
                if (hilfsweight===null){
                    hilfsweight=(item.weight).toFixed(2) 
                }
                else {
                    templist2[i]=((item.weight-hilfsweight)*10).toFixed(2)
                    hilfsweight=(item.weight).toFixed(2) 
                  }
            }
        }
    })

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

        var myChart = echarts.init(document.getElementById('weight_graph'));
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
           <div className="patient_health_status_doctor" style={{marginTop: '50px', paddingRight: '0', paddingLeft: '0'}}>
             <div className="row">
              <div className= 'col-md-12 col-xs-12 col-sm-12' style={{padding: '0'}}>
                 <div id="weight_graph" style={{ width:'100%', minHeight: '400px' }}></div>
              </div>
            </div>
           </div>


    </div>
    );
  }
}