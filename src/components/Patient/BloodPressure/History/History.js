import React, { PureComponent } from 'react';

export default class History extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      temperature: ''
    };
  }

  render() {
    return (
    <div className="container-fluid" style={{backgroundColor: '#f7f7f7', marginTop: '-20px', paddingTop: '30px', minHeight: '100vh'}}>
    <p className="patient_tasks" style={{marginLeft: '25px'}} >My Temprature History</p>
      {this.props.temperature.reverse().map ((temperature,i) => {return (
        <div key={i} className="row" style={{padding: '0 20px'}}>  
          <div className="col-12" style={{padding: '0'}}>
            <div className="row" style={{borderRadius: '20px', padding: '10px 0'}}>  
              <div className="col-8">  
                <p className="patient_med">{temperature.temperature}</p>
                <p className="">{temperature.date}</p>
              </div>
              <div className="col-4"> 
              </div>
            </div>
          </div>
        </div>
      )})}
              


    </div>
    );
  }
}