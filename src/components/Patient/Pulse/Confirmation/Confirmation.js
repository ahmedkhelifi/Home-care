import React, { PureComponent } from 'react';

export default class Confirmation extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      pulse: '',
    };
  }

  handlePulseChange = (e) => {
    this.setState({ pulse: e.target.value })
  }


  onBlur = (e) => { // change field input to a float of max two digits after comma
    this.setState({ pulse: parseFloat(e.target.value.replace(',', '.')).toFixed(2) })
  }

  render() {
    return (
    <div className="container-fluid" style={{backgroundColor: '#f7f7f7', marginTop: '-20px', paddingTop: '30px', minHeight: '100vh'}}>
      <p className="patient_back" style={{marginTop: '0px', marginLeft: '20px'}} onClick={() => this.props.goBack() }>&#10230;</p>
      <p className="patient_tasks" style={{marginLeft: '25px'}}>What was your pulse today:</p>
      <input className="userinput" type="text" placeholder="pulse" name="pulse" value={this.state.pulse} onChange={this.handlePulseChange} style={{width: '100%', marginTop: '30px'}} onBlur={ this.onBlur } />
              <button className="no_im_not" onClick={e => this.props.goBack()}>Go back</button>
              {this.state.pulse !== '' ? (<button className="yes_im_sure" onClick={e => this.props.addPulsePending(this.state.pulse)}>Yes, my is pulse is {this.state.pulse}</button>) : (<button className="yes_im_sure_gray">Yes</button>)}
              


    </div>
    );
  }
}