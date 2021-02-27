import React, { PureComponent } from 'react';

export default class MissedConfirmation extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      sys: '',
      dia: '',
    };
  }

  handleBloodPressureChangeSys = (e) => {
    this.setState({ sys: e.target.value })
  }

  handleBloodPressureChangeDia = (e) => {
    this.setState({ dia: e.target.value })
  }


  onBlurSys = (e) => { // change field input to a float of max two digits after comma
    if(this.state.sys.length === 0) return
    this.setState({ sys: parseFloat(e.target.value.replace(',', '.')).toFixed(2) })
  }

  onBlurDia = (e) => { // change field input to a float of max two digits after comma
    if(this.state.dia.length === 0) return
    this.setState({ dia: parseFloat(e.target.value.replace(',', '.')).toFixed(2) })
  }

  render() {
    return (
    <div className="container-fluid" style={{backgroundColor: '#f7f7f7', marginTop: '-20px', paddingTop: '30px', minHeight: '100vh'}}>
      <p className="patient_back" style={{marginTop: '0px', marginLeft: '20px'}} onClick={() => this.props.goBack() }>&#10230;</p>
      <p className="patient_tasks" style={{marginLeft: '25px'}}>Did you measured your blood pressure between {this.props.popupMissedTimestampFrom} and {this.props.popupMissedTimestampTo} ?</p>
      <input className="userinput" type="text" placeholder="sys" name="blood_pressure" value={this.state.sys} onChange={this.handleBloodPressureChangeSys} style={{width: '100%', marginTop: '30px'}} onBlur={ this.onBlurSys } />
      <input className="userinput" type="text" placeholder="dia" name="blood_pressure" value={this.state.dia} onChange={this.handleBloodPressureChangeDia} style={{width: '100%', marginTop: '30px'}} onBlur={ this.onBlurDia } />
      <button className="no_im_not" onClick={e => this.props.addBloodPressureMissed(this.state.blood_pressure, false)}>I Forgot</button>
        {this.state.blood_pressure !== '' ? (<button className="yes_im_sure" onClick={e => this.props.addBloodPressureMissed(this.state.sys, this.state.dia, true)}>Yes, my is blood pressure is {this.state.blood_pressure}</button>) : (<button className="yes_im_sure_gray">Yes</button>)}
    </div>
    );
  }
}