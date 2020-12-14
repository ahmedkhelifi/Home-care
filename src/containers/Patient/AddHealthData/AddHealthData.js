import React from 'react';

export default class AddHealthData extends React.PureComponent { 

  constructor(props) {
    super(props);
    this.state = {
      pendingMedication:        this.props.pendingMedication,
      confirmPopup:             false,
      popupMedication:          ''
    };

    this.iTookMedication        = this.iTookMedication.bind(this)
  }


  iTookMedication() {
    fetch('/api/patient/medication/'+this.props.username+'/'+this.state.popupMedication)
      .then(blob => blob.json())
      .then(blob => {
        console.log(blob)
      })
      .catch(error => this.setState({error: true}));

        fetch('/api/patient/medication/'+this.props.username+'/'+this.state.popupMedication, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({})
            })
        .then(blob => blob.json())
        .then(blob => {
          console.log(blob)
          this.props.removeMedFromPending(this.state.popupMedication)
          this.setState({confirmPopup: false, popupMedication: ''})
        })
        // .then(res => this.props.closesignup())
  }



  render() {

  let pendingMedication = this.props.pendingMedication

    return (
    <div className="row">
    {this.state.confirmPopup ? (
        <div id="myModal" class="modal">
          <div className="modal-content">
            <span className="close" onClick={e => this.setState({confirmPopup: false, popupMedication: ''})}>&times;</span>
            <p>Are  you sure you took the appropriate dose of {this.state.popupMedication}</p>
            <button className="took_med_ja" onClick={e => this.iTookMedication()}>Ja</button>
          </div>
        </div>
    ) : (null)}
      <div className="col-12">
        <h1>My Medication:</h1>
      </div>

      {pendingMedication.map ((med,i) => {return (
        <div key={i} className="row" style={{marginTop: '15px', padding: '0 20px'}}>  
          <div className="col-12">
            <div className="row" style={{backgroundColor: '#ffd17d', borderRadius: '20px', padding: '10px 0'}}>  
              <div className="col-4">  
                <p className="patient_med_number">{med.ammount}x <br/> day</p>
              </div>
              <div className="col-4">  
                <p className="patient_med">{med.title}</p>
              </div>
              <div className="col-4">  
                <p className="medicationtaken" onClick={e => this.setState({confirmPopup: true, popupMedication: med.title})}></p>
              </div>
            </div>
          </div>
        </div>
      )})}

    </div>
    );
  }
}