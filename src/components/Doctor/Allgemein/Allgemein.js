import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';


class Allgemein extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoaded       :     false,
      rist_patients    :     [],                
    }
  }

  componentDidMount(){
        fetch('/api/doctor/getPatients/health/risk')
            .then(blob => blob.json())
            .then(
                (blob) => {
                    console.log(blob)
                    let patients = 
                    this.setState({dataLoaded: true, rist_patients: blob.sort((a,b) => (a.health.points > b.health.points) ? 1 : ((b.health.points > a.health.points) ? -1 : 0)).reverse() })
                    // this.setState({ patients: blob.sort(function(a, b){ if(a.firstname < b.firstname) { return -1; } if(a.firstname > b.firstname) { return 1; } return 0; }), isLoaded: true });
                    // this.baseState.patient = blob.sort(function(a, b){ if(a.firstname < b.firstname) { return -1; } if(a.firstname > b.firstname) { return 1; } return 0; })
                    // this.baseState.isLoaded = true
                    // if (blob.length > 0){
                    //     this.setState({ noPatients: false });
                    //     this.baseState.noPatients = true
                    // }
                }
            ).catch(error => this.setState({errorPatientLoad: true}));
  }

  render() {
    document.title = "Dashboard"
    if(!this.state.dataLoaded){
    return (
              <div className="container-fluid">
                <div className="row">

                    <div className="myBox height75" style={{marginLeft: '30px'}}>
                        <div className="loading">
                          <div>
                            <div className="c1"></div>
                            <div className="c2"></div>
                            <div className="c3"></div>
                            <div className="c4"></div>
                          </div>
                          <span>Loading patient's data..</span>
                        </div>
                    </div>



                  </div> 
              </div>
    ); } else {
      return (
              <div className="container-fluid">
                <div className="row">

                    {this.state.rist_patients.map(patient => {
                      return (
                        <div  className="col-12" style={{backgroundColor: 'white', marginTop: '20px'}}>
                          <p> Patient name: {patient.firstname + ' ' + patient.lastname}</p>
                          <p> Patient status: {patient.health.points > 3 ? (<span style={{color: 'red'}}>red</span>) : (<span style={{color: 'yellow'}}>yellow</span>)}</p>
                          <p> Points: {patient.health.points}</p>
                        </div>
                      )
                    })}



                  </div> 
              </div>
      )
    }
  }
}

export default Allgemein;