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

    create_graph = ()  => {
                //get Jsondata from select Patient with his weights in history
                let history = this.props.weights.history;
                //format
                let jsonData = {weight: history}
                if(jsonData.weight.length === 0) return
                    
                //  currentDate
                var currentDate = new Date();
                //earlist date in the database
                var firstdate=jsonData.weight[0].timestamp

                //time intervall
                var today=currentDate.getTime()
                var diffday=Math.floor((today-firstdate)/(24*60*60*1000))+1;
                var truejsonData=jsonData.weight.filter(obj => {return obj.timestamp});
                

                //timeformater function    
                function timeformater(ts){
                    let date = new Date(ts);
                    let Y = date.getFullYear() + '.';
                    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '.';
                    let D = date.getDate() ;
                    let result = Y+M+D
                    return result; 
                }

                //x-axis
                var timelist=new Array(diffday);
                for(let i=0;i<diffday;i++){
                    let currentDate = new Date();
                    let data = currentDate.setDate( currentDate.getDate() - i); 
                    timelist[i]=timeformater(data)
                }
                timelist=timelist.reverse()

                //y-axis
                //templist1: weight templist2: differ    
                var templist1=new Array(diffday)
                var templist2=new Array(diffday)
                var hilfsweight=null
                truejsonData.forEach(function(item,index,arr){
                    let i=timelist.indexOf(timeformater(item.timestamp))
                    if(i>-1){
                        if (item.measured!==false){ 
                        templist1[i]=(item.weight*0.1).toFixed(2)   
                        }
                        if (i===0 && item.measured!==false){
                            hilfsweight=item.weight 
                        }
                        else if(item.measured!==false){
                            if (hilfsweight===null||hilfsweight===undefined){
                                hilfsweight=((item.weight)).toFixed(2)
                            }
                            else {
                                templist2[i]=((item.weight-hilfsweight)).toFixed(2)
                            }
                        }

                    }
                })

                //for the obere Schrank und untere Schrank
                var pos=(hilfsweight*0.1).toFixed(2)
                var neg=-(hilfsweight*0.1).toFixed(2)
                //graph infos
                var option ={
                                title: { 
                                    left: 'center',
                                    text: 'Weightgain'
                                },
                                xAxis: {

                                    axisTick: {show: false},
                                    data: timelist
                                    
                                },
                                yAxis: {
                                    axisLine:{show:false},
                                    axisLabel: {show: false},
                                    splitLine: {show: false},
                                    axisTick: {show: false},
                                    type: 'value' ,
                                    min:extent=> extent.min<=neg? extent.min : neg ,
                                    max:extent=> extent.max>=pos? extent.max : pos
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
                                series: [
                                {
                                    name: 'change',
                                    type: 'bar',
                                    data: templist2,
                                    markLine:{
                                        symbol:"none",
                                        data:[{
                                            lineStyle:{
                                                type:"solid",
                                                color:"FA3934",
                                            },
                                            label:{
                                                textstyle:{
                                                    fontWeight:"bolder",
                                                    fontSize:"7",
                                                    color:"#fff",
                                                },
                                            position:"start",  
                                            formatter:"+10%"  
                                            },
                                            yAxis:pos
                                        },
                                        {
                                            lineStyle:{
                                                type:"solid",
                                                color:"FA3934",
                                            },
                                            label:{
                                                textstyle:{
                                                    fontWeight:"bolder",
                                                    fontSize:"7",
                                                    color:"#fff",
                                                },
                                            position:"start",  
                                            formatter:"-10%"  
                                            },
                                            yAxis:neg
                                        }]
                                    }
                                },
                                ],
                                
                            }
        //set graph id
        var myChart = echarts.init(document.getElementById('weight_graph'));
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