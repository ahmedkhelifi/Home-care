import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import Logout from'../../images/logout.png';

export default class Patient extends React.PureComponent { 

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      guidelines: []
    };
  }


  componentDidMount() {
  }

  render() {

    return (
    <span>
        <div className="patient_header">

            <p className="patient_hello">Hello {this.props.user.name}</p>
            <img  src={Logout} alt="logout" className="patient_logout" onClick={(e) => this.props.logout(e)}/>
            <h3 className="patient_status">your  health  <br/> status is <span style={{color: '#58ada5'}}>stable</span></h3>
            <p style={{fontSize: '13px'}}>have you taken your medication?</p>
            <div style={{textAlign: 'center'}}>
              <button className="new_entry">New Entry</button>
            </div>
        </div>

    <Tabs>
      <TabList>
        <Tab>Your prescription</Tab>
      </TabList>

      <TabPanel>

        <div className="row" style={{marginTop: '15px'}}>  
          <div className="col-4">  
            <p className="patient_med_number">2x <br/> day</p>
          </div>
          <div className="col-8">  
            <p className="patient_med">Basiliximab <br/> <span className="patient_med_type">Induction immunosuppression</span></p>
          </div>
        </div>

        <div className="row" style={{marginTop: '15px'}}>  
          <div className="col-4">  
            <p className="patient_med_number">1x <br/> day</p>
          </div>
          <div className="col-8">  
            <p className="patient_med">Azathioprine <br/> <span className="patient_med_type">Maintenance immunosuppression</span></p>
          </div>
        </div>

        <div className="row" style={{marginTop: '15px'}}>  
          <div className="col-4">  
            <p className="patient_med_number">1x <br/> week</p>
          </div>
          <div className="col-8">  
            <p className="patient_med">Methylprednisolone <br/> <span className="patient_med_type">Anti-rejection immunosuppression</span></p>
          </div>
        </div>
      </TabPanel>
    </Tabs>

    </span>
    );
  }
}