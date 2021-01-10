import React, { PureComponent } from 'react';

export default class MissedConfirmation extends PureComponent {
  render() {
    return (
    <div className="container-fluid" style={{backgroundColor: '#f7f7f7', marginTop: '-20px', paddingTop: '30px', minHeight: '100vh'}}>
      <p className="patient_tasks" style={{marginLeft: '25px'}}>Did you miss taking your apropriate dose of {this.props.popupMedication} ?</p>
              <button className="no_im_not" onClick={e => this.props.goBack()}>Not Yet</button>
              <button className="yes_im_sure" onClick={e => this.props.iTookMedicationMissed()}>I have taken my Medication!</button>
    </div>
    );
  }
}