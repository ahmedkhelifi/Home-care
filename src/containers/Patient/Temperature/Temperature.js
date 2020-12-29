import React from 'react';
import Confirmation from './Confirmation';
import History from './History';


import Tasks_temperature from'../../../images/tasks_temperature.png';
import My_History from'../../../images/my_history.png';
export default class Temperature extends React.PureComponent { 

  constructor(props) {
    super(props);
    this.state = {
      pendingMedication:        this.props.pendingMedication,
      confirmPopup:             false,
      history_bool:             false,
    };
  }


  componentDidMount(){
    window.scrollTo({ top: 0 });
  }


  addTemperate = (temperature) => {

        fetch('/api/patient/addTemprature/'+this.props.username+'/', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({temperature: temperature})
            })
        .then(blob => blob.json())
        .then(blob => {
          console.log(blob)
          this.setState({confirmPopup: false,})
        })
        // .then(res => this.props.closesignup())
  }



  render() {

  let pendingMedication = this.props.pendingMedication

  if(this.state.confirmPopup){
    return (<Confirmation addTemperate={this.addTemperate} goBack={e => this.setState({confirmPopup: false})}/>)
  }

  if(this.state.history_bool){
    return (<History temperature={this.props.temperature} goBack={e => this.setState({history_bool: false})}/>)
  }

    return (
    <div className="container-fluid" style={{backgroundColor: '#f7f7f7', marginTop: '-20px', paddingTop: '30px', minHeight: '100vh'}}>

      <div className="col-12">
            <p className="patient_back" onClick={() => this.props.backToDashboard() }>&#10230;</p>
           <div className="patient_health_status" style={{marginTop: '40px'}}>
             <div className="row">
              <div className="col-9">
                      <h3 className="patient_status">My Temperature</h3>
                      {pendingMedication.length > 0 ? (<p className="patient_status_task">You have some opened Tasks..</p>) : (<p className="patient_status_task">You have completed all your tasks for today</p>)}
                      
              </div>
              <div className="col-3">
                      <img style={{marginTop: '30px'}}  src={Tasks_temperature} alt="medication pill" className="tasks_pill" />
              </div>
            </div>
           </div>
      </div>


      {true > 0 ? (<p className="patient_tasks" style={{marginLeft: '25px'}} >Pending Task</p>) : (null)}

        <div className="row" style={{padding: '0 20px'}}>  
          <div className="col-12" style={{padding: '0'}}>
            <div className="row" style={{borderRadius: '20px', padding: '10px 0'}}>  
              <div className="col-3">  
               <img style={{marginTop: '21px'}}  src={Tasks_temperature} alt="medication pill" className="tasks_pill" />
              </div>
              <div className="col-5">  
                <p className="add_temprature">Add today's Temprature</p>
              </div>
              <div className="col-4" onClick={e => this.setState({confirmPopup: true})}> 
                <span className="go">&#10230;</span>
              </div>
            </div>
          </div>
        </div>


      <p className="patient_tasks" style={{marginLeft: '25px'}} >History</p>

          {this.props.temperature.length > 0 ? (<span className="view_history" onClick={e => this.setState({history_bool: true})}> View full history &#10230;</span>) : (null)}
           <div className="patient_health_status" style={{marginTop: '50px'}}>
             <div className="row">
              <div className="col-12">
                      <p className="patient_status_task" style={{height: '150px'}}>Hier ein schöne Graph</p>                 
              </div>
            </div>
           </div>


    </div>
    );
  }
}