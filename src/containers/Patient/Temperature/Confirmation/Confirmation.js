import React, { PureComponent } from 'react';

export default class Confirmation extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      temperature: ''
    };
  }

  handleTemperatureChange = (e) => {
    this.setState({ temperature: Number(e.target.value) })
  }

  render() {
    return (
    <div className="container-fluid" style={{backgroundColor: '#f7f7f7', marginTop: '-20px', paddingTop: '30px', minHeight: '100vh'}}>
      <p className="patient_tasks" style={{marginLeft: '25px'}}>Are  you sure you took the appropriate dose of {this.props.popupMedication}</p>
      <input className="userinput" type="text" placeholder="temperature" name="temperature" value={this.state.temperature} onChange={this.handleTemperatureChange} style={{width: '100%', marginTop: '30px'}}/>
              <button className="no_im_not" onClick={e => this.props.goBack()}>Not Yet</button>
              {this.state.temperature !== '' ? (<button className="yes_im_sure" onClick={e => this.props.addTemperate(this.state.temperature)}>Yes, my is temprature is {this.state.temperature}</button>) : (<button className="yes_im_sure_gray">Yes</button>)}
              


    </div>
    );
  }
}