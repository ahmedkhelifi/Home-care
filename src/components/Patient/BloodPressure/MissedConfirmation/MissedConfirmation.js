import React, { PureComponent } from 'react';

export default class MissedConfirmation extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      blood_pressure: ''
    };
  }

  handleBloodPressureChange = (e) => {
    this.setState({ blood_pressure: Number(e.target.value) })
  }

  render() {
    return (
    <div className="container-fluid" style={{backgroundColor: '#f7f7f7', marginTop: '-20px', paddingTop: '30px', minHeight: '100vh'}}>
      <p className="patient_back" style={{marginTop: '0px', marginLeft: '20px'}} onClick={() => this.props.goBack() }>&#10230;</p>
      <p className="patient_tasks" style={{marginLeft: '25px'}}>Did you measured your blood pressure between {this.props.popupMissedTimestampFrom} and {this.props.popupMissedTimestampTo} ?</p>
      <input className="userinput" type="text" placeholder="blood_pressure" name="blood_pressure" value={this.state.blood_pressure} onChange={this.handleBloodPressureChange} style={{width: '100%', marginTop: '30px'}}/>
              <button className="no_im_not" onClick={e => this.props.addBloodPressureMissed(this.state.blood_pressure, false)}>I Forgot</button>
              {this.state.blood_pressure !== '' ? (<button className="yes_im_sure" onClick={e => this.props.addBloodPressureMissed(this.state.blood_pressure, true)}>Yes, my is blood pressure is {this.state.blood_pressure}</button>) : (<button className="yes_im_sure_gray">Yes</button>)}
    </div>
    );
  }
}