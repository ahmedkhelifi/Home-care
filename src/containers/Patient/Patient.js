import React from 'react';
import AddHealthData from './AddHealthData';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import Logout from'../../images/logout.png';

export default class Patient extends React.PureComponent { 

  constructor(props) {
    super(props);
    this.state = {
      error:             false,
      isLoaded:          false,
      addHealthData:     false,
      status:            '',
      backgroundColor:   '',
      medication:        [],
      missedMedication:  [],
      pendingMedication: []
    };

    this.removeMedFromPending    = this.removeMedFromPending.bind(this)
  }


  componentDidMount() {
    fetch('/api/patient/health/'+this.props.user.username)
      .then(blob => blob.json())
      .then(blob => {
        console.log(blob)
        this.setState({isLoaded: true, status: blob.status, backgroundColor: blob.backgroundColor, medication: blob.medication, missedMedication: blob.missedMedication, pendingMedication: blob.pendingMedication})
      })
      .catch(error => this.setState({error: true}));
  }

  removeMedFromPending(med_title){
    let pendingMedication = this.state.pendingMedication
    const index = pendingMedication.findIndex(x => x.title === med_title);
    if (index !== -1 && index !== undefined) 
      pendingMedication.splice(index, 1);
        this.setState({ pendingMedication: pendingMedication })
  }

  render() {

    document.title = "Homecare App"

    if(!this.state.isLoaded){
      return(<p></p>)
    }

    if(this.state.addHealthData){
      return(<AddHealthData pendingMedication={this.state.pendingMedication} username={this.props.user.username} removeMedFromPending={this.removeMedFromPending}/>)
    }

    return (
    <span>
        <div className="patient_header" style={{backgroundColor: this.state.backgroundColor}}>

            <p className="patient_hello">Hello {this.props.user.name}</p>
            <img  src={Logout} alt="logout" className="patient_logout" onClick={(e) => this.props.logout(e)}/>
            <h3 className="patient_status">your  health  <br/> status is <span style={{color: '#58ada5'}}>stable</span></h3>
            {this.state.pendingMedication.length > 0 ? (<p style={{fontSize: '13px'}}>have you taken your medication?</p>) : (null)}
            <div style={{textAlign: 'center'}}>
              {this.state.pendingMedication.length > 0 ? (
              <button className="new_entry" onClick={e => this.setState({addHealthData: true})}>New Entry</button>
              ) : (<p style={{fontSize: '18px'}}>All medication taken. Good Job!</p>)}
            </div>
        </div>

    <Tabs>
      <TabList>
        <Tab>Your prescription</Tab>
      </TabList>

      <TabPanel>

      {this.state.medication.map ((med,i) => {return (
        <div key={i} className="row" style={{marginTop: '15px'}}>  
          <div className="col-4">  
            <p className="patient_med_number">{med.ammount}x <br/> day</p>
          </div>
          <div className="col-8">  
            <p className="patient_med">{med.title}</p>
          </div>
        </div>
      )})}

      </TabPanel>
    </Tabs>

    </span>
    );
  }
}