import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';


class Allgemein extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoaded              :            false
    }
  }

  componentDidMount(){
        fetch('/api/doctor/getPatients/health/risk')
            .then(blob => blob.json())
            .then(
                (blob) => {
                    console.log(blob)
                    this.setState({dataLoaded: true})
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

                    Loaded



                  </div> 
              </div>
      )
    }
  }
}

export default Allgemein;