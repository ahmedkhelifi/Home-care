import React, { PureComponent } from 'react';

export default class Confirmation extends PureComponent {
  render() {
    return (
    <div className="container-fluid" style={{backgroundColor: '#f7f7f7', marginTop: '-20px', paddingTop: '30px', minHeight: '100vh'}}>
      <p className="patient_tasks" style={{marginLeft: '25px'}}>Are  you sure you took the appropriate dose of {this.props.popupMedication}</p>
              <button className="no_im_not" onClick={e => this.props.goBack()}>Not Yet</button>
              <button className="yes_im_sure" onClick={e => this.props.iTookMedicationPending()}>Yes, I'm sure!</button>
    </div>
    );
  }
}