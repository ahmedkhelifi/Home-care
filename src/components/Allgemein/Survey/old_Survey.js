import React from 'react';

// import Raphael from 'raphael';
// import 'morris.js/morris.js';
// import 'morris.js/morris.css';

import { LineChart, PieChart } from 'react-chartkick'
import 'chart.js'


class Survey extends React.Component {
  
    constructor(props) {
    super(props);
    // window.Raphael = Raphael;
    
    this.state = {
      surveys            :            [],
      vote               :            [],
      showSurvey         :            false,
      openedSurvey       :            -1,
      openedVote         :            0,
      openedConsultation :            0,
      lineChartLoaded    :            false,
      lineChartData      :            {}
    }

  }

  componentDidMount(){
      fetch('/api/survey/')
          .then(blob => blob.json())
          .then(
              (blob) => {
                  
                  if (blob.length === 0) {
                      this.setState({ showSurvey: false });
                  } else {
                    // eslint-disable-next-line
                    var opened = 0;
                    // eslint-disable-next-line
                    var not_opened = 0;

                    for (var i = 0; i < blob.length; i++){
                      // console.log(blob[i])
                      if(blob[i].opened === 'true') {
                        opened++
                      }
                    }

                    this.setState({ surveys: blob, showSurvey: true, openedSurvey: opened });

                    var today = new Date();
                    today = today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate()
                    
                    // eslint-disable-next-line
                    var yesterday = new Date(new Date().setDate(new Date().getDate()-1))
                    yesterday = yesterday.getFullYear() + "/" + (yesterday.getMonth() + 1) + "/" + yesterday.getDate()
                    
                    // eslint-disable-next-line
                    var twoDaysAgo = new Date(new Date().setDate(new Date().getDate()-2))
                    twoDaysAgo = twoDaysAgo.getFullYear() + "/" + (twoDaysAgo.getMonth() + 1) + "/" + twoDaysAgo.getDate()
                    
                    // eslint-disable-next-line
                    var threeDaysAgo = new Date(new Date().setDate(new Date().getDate()-3))
                    threeDaysAgo = threeDaysAgo.getFullYear() + "/" + (threeDaysAgo.getMonth() + 1) + "/" + threeDaysAgo.getDate()

                    var data = {"2017-05-13": 12, "2017-05-14": 5, yesterday: 0, today: 7}
                    data[today] = 10

                    this.setState({ lineChartData: data });

                  }
              },
          )

      fetch('/api/vote/')
          .then(blob => blob.json())
          .then(
              (blob) => {
                  
                  if (blob.length === 0) {
                    //nothing
                  } else {
                    // eslint-disable-next-line
                    var opened = 0;
                    // eslint-disable-next-line
                    var not_opened = 0;

                    for (var i = 0; i < blob.length; i++){
                      // console.log(blob[i])
                      if(blob[i].opened === 'true') {
                        opened++
                      }
                    }

                    this.setState({ votes: blob, openedVote: opened });

                  }
              },
          )
  }



  render() {
    if (this.state.showSurvey){
        return (
          <div className="col-12" style={{marginTop: '40px'}}>
            <div className="row">

                <div className="col-4">
                             <div className="card" style={{minHeight: '200px', boxShadow: '0 0 28px -16px #888888'}}>
                                <div className="card-header">
                                      <h4 className="card-title" style={{fontSize: '22px', marginBottom: '20px', textAlign: 'center'}}>Umfragen</h4>
                                </div>
                                <h1 className="survey_count">{this.state.openedSurvey}</h1>
                                <p className="survey_count_underline">offen</p>
                            </div>
                </div> 

                <div className="col-4" >
                             <div className="card" style={{minHeight: '200px', boxShadow: '0 0 28px -16px #888888'}}>
                                <div className="card-header">
                                      <h4 className="card-title" style={{fontSize: '22px', marginBottom: '20px', textAlign: 'center'}}>Abstimmungen</h4>
                                </div>
                                <h1 className="survey_count">{this.state.openedVote}</h1>
                                <p className="survey_count_underline">offen</p>
                            </div>
                </div> 

                <div className="col-4">
                             <div className="card" style={{minHeight: '200px', boxShadow: '0 0 28px -16px #888888'}}>
                                <div className="card-header">
                                      <h4 className="card-title" style={{fontSize: '22px', marginBottom: '20px', textAlign: 'center'}}>Konsultationen</h4>
                                </div>
                                <h1 className="survey_count">0</h1>
                                <p className="survey_count_underline">offen</p>
                            </div>
                </div>
            </div>  

            <div className="row">
                    <div className="col-12" style={{marginTop: '40px'}}>

                      <div className="card" style={{boxShadow: '0 0 28px -16px #888888'}}>
                          <div className="card-header">
                          <div className="row">
                              <div className="col-6">
                                <select className="select_noarrow" style={{fontSize: '22px !important'}}>
                                  <option value="Umfragen" defaultValue>Kommentare</option>
                                  <option value="Abstimmungen">Abstimmungen</option>
                                  <option value="Konsultationen">Konsultationen</option>
                                </select>
                              </div>
                              <div className="col-6">
                                <span style={{float: 'right'}}>
                                  <p style={{display: 'inline-block'}}> 15 Tage übersicht</p>
                                </span>
                              </div>
                            </div>
                          </div>
                          <LineChart data={this.props.lineChart} />

                      </div>
                    </div>  
          </div> 
          </div>  

        ); 
    } else {
      return (null)}
  }
}

export default Survey;