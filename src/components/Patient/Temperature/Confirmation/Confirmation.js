import React, { PureComponent } from 'react';

export default class Confirmation extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      temperature: '',
      focus: false,
    };
  }

  handleTemperatureChange = (e) => {
    this.setState({ temperature: e.target.value })
  }


  onBlur = (e) => {
    this.setState({ temperature: parseFloat(e.target.value.replace(',', '.')).toFixed(2) })
  }

  render() {
    return (
    <div className="container-fluid" style={{backgroundColor: '#f7f7f7', marginTop: '-20px', paddingTop: '30px', minHeight: '100vh'}}>
      <p className="patient_back" style={{marginTop: '0px', marginLeft: '20px'}} onClick={() => this.props.goBack() }>&#10230;</p>
      <p className="patient_tasks" style={{marginLeft: '25px'}}>What was your temperature today:</p>
      <input className="userinput" type="text" placeholder="temperature" name="temperature" value={this.state.temperature} onChange={this.handleTemperatureChange} style={{width: '100%', marginTop: '30px'}} onBlur={ this.onBlur } />
              <button className="no_im_not" onClick={e => this.props.goBack()}>Go back</button>
              {this.state.temperature !== '' ? (<button className="yes_im_sure" onClick={e => this.props.addTemperaturePending(this.state.temperature)}>Yes, my is temprature is {this.state.temperature}</button>) : (<button className="yes_im_sure_gray">Yes</button>)}
              


    </div>
    );
  }
}