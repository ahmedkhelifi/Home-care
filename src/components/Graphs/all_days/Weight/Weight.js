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
                let history = this.props.weights.history;
                let jsonData = {weight: history}
                //  currentDate
                var currentDate = new Date();
                var firstdate=jsonData.weight[0].timestamp
                // for(i =0; i++, i<=currentDate.getDate())
                var today=currentDate.getTime()
                var diffday=Math.floor((today-firstdate)/(24*60*60*1000))+1;// 天
                var truejsonData=jsonData.weight.filter(obj => {return obj.timestamp});
                

                function timeformater(ts){
                    let date = new Date(ts);
                    let Y = date.getFullYear() + '.';
                    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '.';
                    let D = date.getDate() ;
                    let result = Y+M+D
                    return result; 
                }


                var timelist=new Array(diffday);
                for(let i=0;i<diffday;i++){
                    let currentDate = new Date();
                    let data = currentDate.setDate( currentDate.getDate() - i); 
                    timelist[i]=timeformater(data)
                }
                timelist=timelist.reverse()


                var templist1=new Array(diffday)
                var templist2=new Array(diffday)
                var hilfsweight=null
                truejsonData.forEach(function(item,index,arr){//db中近90天的array 可能只有3天
                    let i=timelist.indexOf(timeformater(item.timestamp))//richtige x axis daten value index
                    if(i>-1){//wenn an dem Tag etwas in DB erschienen 
                        if (item.measured!==false){ 
                        templist1[i]=(item.weight*0.1).toFixed(2)   
                        }// wenn measured nicht false dann ersetzt die richtige weight dadrauf
                        if (i===0 && item.measured!==false){
                            hilfsweight=item.weight 
                        }
                        else if(item.measured!==false){
                            if (hilfsweight===null||hilfsweight===undefined){
                                hilfsweight=((item.weight)).toFixed(2)
                            }
                            else {
                                templist2[i]=((item.weight-hilfsweight)).toFixed(2)
                                //hilfsweight=((item.weight)).toFixed(2)//falls den Unterschied je zwei Tage sein solltet
                            }
                        }

                    }
                })
                var pos=(hilfsweight*0.1).toFixed(2)
                var neg=-(hilfsweight*0.1).toFixed(2)
                console.log(pos)
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