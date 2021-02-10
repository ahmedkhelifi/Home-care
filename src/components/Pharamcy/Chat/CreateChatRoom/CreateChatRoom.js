import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

class CreateChatRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
		step: 1,
		name: '',
		doctor: {},
		patient: {}
    }
  }

  render() {
  	if(this.state.step === 1) {
	    return (
	            <div className="row">
	                <div className="col-12">
	                  <p style={{fontWeight: 'bold'}}>Choose a doctor to add to the chatroom:</p>
	                </div>
	                <div className="col-12">

                    <Tabs>
                        <TabList className="notification_tab_header">
                        <Tab>Doctors</Tab>
                        <Tab>Patients</Tab>
                        </TabList>
                        <TabPanel>

	                      {this.props.doctors.map((doctor, i) => {return(
	                          <div key={i*10} className="row chat_list_bubble" onClick={e => this.setState({step: 2, doctor: doctor})}>
	                            <div className="col-3" style={{justifyContent: 'center', alignItems: 'center'}}>
	                              <div className="circle" style={{justifyContent: 'center', alignItems: 'center'}}> 
	                                <p style={{color: 'white', textAlign: 'center', fontWeight: 'bold', paddingTop: '17px', fontSize: '30px'}}>{doctor.name.split(" ")[1][0]}</p>
	                              </div>
	                            </div>
	                            <div className="col-9" style={{justifyContent: 'center', alignItems: 'center'}}>
	                              <p style={{color:'white', fontWeight: 'bold'}} >{doctor.name}</p>
	                            </div>
	                          </div>
	                      )})}
	                    </TabPanel>
                        <TabPanel>

	                      {this.props.patients.map((patient, i) => {return(
	                          <div key={i*10} className="row chat_list_bubble" onClick={e => this.setState({step: 2, patient: patient})}>
	                            <div className="col-3" style={{justifyContent: 'center', alignItems: 'center'}}>
	                              <div className="circle" style={{justifyContent: 'center', alignItems: 'center'}}> 
	                                <p style={{color: 'white', textAlign: 'center', fontWeight: 'bold', paddingTop: '17px', fontSize: '30px'}}>{patient.name[0]}</p>
	                              </div>
	                            </div>
	                            <div className="col-9" style={{justifyContent: 'center', alignItems: 'center'}}>
	                              <p style={{color:'white', fontWeight: 'bold'}} >{patient.name}</p>
	                            </div>
	                          </div>
	                      )})}
	                    </TabPanel>
	                </Tabs>
	                </div>
	            </div>
	    )
  	}

  	if(this.state.step === 2) {
	    return (
	                 <div className="row">
	                 <div className="col-12">
	                  <p style={{fontWeight: 'bold'}} >Describe the chatroom's topic in few words. Example: 'Late Medication Shipment', 'General Question', 'Health Status Update'...</p>
	                 </div>
	                  <div className="col-12">
				            <input
				              type="text"
				              placeholder={'Enter message...'}
				              value={this.state.name}
				              onChange={e => this.setState({ name: e.target.value })}
				              className="enter_a_message_field"
				            />
				            <button onClick={e => this.props.createChatroom(this.state.patient, this.state.doctor, this.state.name)}>create</button>
	                  </div>
	                </div>
	    )
  	}
  }
}

export default CreateChatRoom