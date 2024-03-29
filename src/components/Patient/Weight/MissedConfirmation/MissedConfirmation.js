import React, { PureComponent } from 'react';

export default class MissedConfirmation extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      weight: ''
    };
  }

  handleWeightChange = (e) => {
    this.setState({ weight: e.target.value })
  }

  onBlur = (e) => { // change field input to a float of max two digits after comma
    this.setState({ weight: parseFloat(e.target.value.replace(',', '.')).toFixed(2) })
  }

  render() {
    return (
    <div className="container-fluid" style={{backgroundColor: '#f7f7f7', marginTop: '-20px', paddingTop: '30px', minHeight: '100vh'}}>
      <p className="patient_back" style={{marginTop: '0px', marginLeft: '20px'}} onClick={() => this.props.goBack() }>&#10230;</p>
      <p className="patient_tasks" style={{marginLeft: '25px'}}>Have you measured your weight on {this.props.popupMissedTimestampFrom} ?</p>
      <input className="userinput" type="text" placeholder="weight" name="weight" value={this.state.weight} onChange={this.handleWeightChange} style={{width: '100%', marginTop: '30px'}} onBlur={ this.onBlur }/>
              <button className="no_im_not" onClick={e => this.props.addWeightMissed(this.state.weight, false)}>I Forgot</button>
              {this.state.weight !== '' ? (<button className="yes_im_sure" onClick={e => this.props.addWeightMissed(this.state.weight, true)}>Yes, my is weight is {this.state.weight}</button>) : (<button className="yes_im_sure_gray">Yes</button>)}
    </div>
    );
  }
}