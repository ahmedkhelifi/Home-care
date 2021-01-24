import React from 'react';

export default class PointsOverview extends React.PureComponent { 

  constructor(props) {
    super(props);
  }

  has_missed_medication = (medication) => {
    let bool = false
    Object.values(medication).forEach( med => {
      if (med.missed.length.length > 0) bool =  true
    })

    Object.values(medication).forEach( med => {
      if (med.history.filter( entry => {return !entry.measured}).length > 0 ) bool = true
    })

    return bool
  }

  was_this_med_missed = (med) => {
    if (med.missed.length.length > 0) return true
    if (med.history.filter( entry => {return !entry.measured}).length > 0 ) return true

    return false
  }

  get_total_med_missed = (med) => {
    return (med.missed.length + med.history.filter( entry => {return !entry.measured}).length)
  } 


  render() {
    return (
            <span>
              <p style={{marginTop: '10px', fontSize: '15px', fontWeight: 'bold'}} >Points for bad entered health data:</p>

              

              <div className="container" style={{backgroundColor: '#f7f7f7', paddingTop: '10px', borderRadius: '7px'}}>
                  <div className="row">
                    <div className="col-12">

                    {this.props.health.first_step_points === 0 ? (<p style={{color: 'black', fontStyle: 'italic'}}>no bad health data.</p>) : (null)}


                     { this.props.health.detailed_first_step_points.temperature_low > 0 || this.props.health.detailed_first_step_points.temperature_hight > 0 ? (
                      <span>
                        <p style={{color: 'black'}}>Temperature</p>
                        {this.props.health.detailed_first_step_points.temperature_low > 0 ? ( <p style={{fontSize: '15px', fontStyle: 'italic', marginTop: '-15px', paddingLeft: '20px'}} > - {this.props.health.detailed_first_step_points.temperature_low} days of low risk temerature <span style={{fontSize: '12px'}} > ({this.props.health.detailed_first_step_points.temperature_low} points)</span>. </p>) : (null)}
                        {this.props.health.detailed_first_step_points.temperature_high > 0 ? ( <p style={{fontSize: '15px', fontStyle: 'italic', marginTop: '-15px', paddingLeft: '20px'}} > - {this.props.health.detailed_first_step_points.temperature_high} days of high risk temperature <span style={{fontSize: '12px'}} > (2x{this.props.health.detailed_first_step_points.temperature_high} points)</span>. </p>) : (null)}
                      </span>
                      ) : (null)}


                     { this.props.health.detailed_first_step_points.pulse_low > 0 || this.props.health.detailed_first_step_points.pulse_high > 0 ? (
                      <span>
                      <p style={{color: 'black'}}>Pulse</p>
                        {this.props.health.detailed_first_step_points.pulse_low > 0 ? ( <p style={{fontSize: '15px', fontStyle: 'italic', marginTop: '-15px', paddingLeft: '20px'}} > - {this.props.health.detailed_first_step_points.pulse_low} days of low risk pulse <span style={{fontSize: '12px'}} > ({this.props.health.detailed_first_step_points.pulse_low} points)</span>. </p>) : (null)}
                        {this.props.health.detailed_first_step_points.pulse_high > 0 ? ( <p style={{fontSize: '15px', fontStyle: 'italic', marginTop: '-15px', paddingLeft: '20px'}} > - {this.props.health.detailed_first_step_points.pulse_high} days of high risk pulse <span style={{fontSize: '12px'}} > (2x{this.props.health.detailed_first_step_points.pulse_high} points)</span>. </p>) : (null)}
                      </span>
                      ) : (null)}


                      { this.props.health.detailed_first_step_points.blood_pressure_low > 0 || this.props.health.detailed_first_step_points.blood_pressure_high > 0 ? (
                      <span>
                        <p style={{color: 'black'}}>Blood pressure</p>
                        {this.props.health.detailed_first_step_points.blood_pressure_low > 0 ? ( <p style={{fontSize: '15px', fontStyle: 'italic', marginTop: '-15px', paddingLeft: '20px'}} > - {this.props.health.detailed_first_step_points.blood_pressure_low} days of low risk blood pressure <span style={{fontSize: '12px'}} > ({this.props.health.detailed_first_step_points.blood_pressure_low} points)</span>. </p>) : (null)}
                        {this.props.health.detailed_first_step_points.blood_pressure_high > 0 ? ( <p style={{fontSize: '15px', fontStyle: 'italic', marginTop: '-15px', paddingLeft: '20px'}} > - {this.props.health.detailed_first_step_points.blood_pressure_high} days of high risk blood pressure <span style={{fontSize: '12px'}} > (2x{this.props.health.detailed_first_step_points.blood_pressure_high} points)</span>. </p>) : (null)}
                      </span>
                      ) : (null)}

                      { this.props.health.detailed_first_step_points.blood_pressure_low > 0 ? (
                      <span>
                        <p style={{color: 'black'}}>Weight</p>
                        {this.props.health.detailed_first_step_points.weight > 0 ? ( <p style={{fontSize: '15px', fontStyle: 'italic', marginTop: '-15px', paddingLeft: '20px'}} > - Weight change of more than 10% of total weight in the last 90 days <span style={{fontSize: '12px'}} > (3 points)</span>. </p>) : (null)}
                       </span>
                      ) : (null)}
                    </div>
                  </div>
              </div>

              <p style={{color: 'black', fontStyle: 'italic', fontSize: '16px', marginTop: '20px'}} >Intermediate Points: {this.props.health.first_step_points} </p>
              {this.props.health.first_step_points <= 1 ? (<p style={{color: 'black', fontStyle: 'italic', fontSize: '16px', marginTop:'-18px'}} >Intermediate Status: <span style={{color: 'green'}} >green</span> </p>) : null}
              {this.props.health.first_step_points === 2 || this.props.health.first_step_points === 3 ? (<p style={{color: 'black', fontStyle: 'italic', fontSize: '16px', marginTop:'-18px'}} >Intermediate Status: <span style={{color: '#ffc459'}} >orange</span> </p>) : null}
              {this.props.health.first_step_points > 3 ? (<p style={{color: 'black', fontStyle: 'italic', fontSize: '16px', marginTop:'-18px'}} >Intermediate Status: <span style={{color: 'red'}} >red</span> </p>) : null}















              <p style={{marginTop: '10px', fontSize: '15px', fontWeight: 'bold'}}> Penalties for not entering Data</p>

              { this.has_missed_medication(this.props.health.medication) ? (
                <div className="container" style={{backgroundColor: '#f7f7f7', paddingTop: '10px', borderRadius: '7px'}}>
                <p style={{marginTop: '10px'}} >Missed medication:</p>
                {Object.values(this.props.health.medication).map (med => { if (this.was_this_med_missed(med)) return (
                  <div className="row">
                    <div className="col-12">
                      <p style={{fontSize: '15px', color: 'black'}}> - {med.title} {this.get_total_med_missed(med)} times

                          {med.history.filter( entry => {return !entry.measured}).length > 0 && this.props.health.first_step_points > 5 ? (<span style={{color: 'red', fontSize: '12px'}} > (3 x {this.get_total_med_missed(med)} points)</span>) : (null)} 

                          {med.history.filter( entry => {return !entry.measured}).length > 0 && this.props.health.first_step_points >= 2 && this.props.health.first_step_points <= 5 ? (<span style={{color: '#ffc459', fontSize: '12px'}} > (2 x {this.get_total_med_missed(med)} points)</span>) : (null)} 

                          {med.history.filter( entry => {return !entry.measured}).length > 0 && this.props.health.first_step_points < 2 ? (<span style={{color: 'green', fontSize: '12px'}} > (1 x {this.get_total_med_missed(med)} points)</span>) : (null)} 
                      </p>
                      
                    </div>
                  </div>
                )})}
                </div>
                ) : (null)}


              { this.props.health.detailed_final_step_points.temperature > 0 || this.props.health.detailed_final_step_points.pulse > 0 || this.props.health.detailed_final_step_points.blood_pressure > 0 || this.props.health.detailed_final_step_points.weight > 0 ? (
              <div className="container" style={{backgroundColor: '#f7f7f7', paddingTop: '10px', borderRadius: '7px', marginTop: '15px'}}>
                  <div className="row">
                    <div className="col-12">

                     { this.props.health.detailed_final_step_points.temperature > 0 ? (
                      <span>
                       <p style={{color: 'black'}}>Temperature</p>
                       <p style={{fontSize: '15px', fontStyle: 'italic', marginTop: '-15px', paddingLeft: '20px'}} > - No entry on {this.props.health.detailed_final_step_points.temperature} days 
                          {this.props.health.first_step_points <= 1 ? (<span style={{color: 'green',fontSize: '12px'}}> (1 x {this.props.health.detailed_final_step_points.temperature} points)</span>) : null}
                          {this.props.health.first_step_points === 2 || this.props.health.first_step_points === 3 ? (<span style={{color: '#ffc459', fontSize: '12px'}}> (2 x {this.props.health.detailed_final_step_points.temperature} points)</span>) : null}
                          {this.props.health.first_step_points > 3 ? (<span style={{color: 'red',fontSize: '12px'}}> (3 x {this.props.health.detailed_final_step_points.temperature} points)</span>) : null}
                       .</p>
                      </span>
                      ) : (null)}

                     { this.props.health.detailed_final_step_points.pulse > 0 ? (
                      <span>
                       <p style={{color: 'black'}}>Pulse</p>
                       <p style={{fontSize: '15px', fontStyle: 'italic', marginTop: '-15px', paddingLeft: '20px'}} > - No entry on {this.props.health.detailed_final_step_points.pulse} days 
                          {this.props.health.first_step_points <= 1 ? (<span style={{color: 'green',fontSize: '12px'}}> (1 x {this.props.health.detailed_final_step_points.pulse} points)</span>) : null}
                          {this.props.health.first_step_points === 2 || this.props.health.first_step_points === 3 ? (<span style={{color: '#ffc459', fontSize: '12px'}}> (2 x {this.props.health.detailed_final_step_points.pulse} points)</span>) : null}
                          {this.props.health.first_step_points > 3 ? (<span style={{color: 'red',fontSize: '12px'}}> (3 x {this.props.health.detailed_final_step_points.pulse} points)</span>) : null}
                       .</p>
                      </span>
                      ) : (null)}

                     { this.props.health.detailed_final_step_points.blood_pressure > 0 ? (
                      <span>
                       <p style={{color: 'black'}}>Blood Pressure</p>
                       <p style={{fontSize: '15px', fontStyle: 'italic', marginTop: '-15px', paddingLeft: '20px'}} > - No entry on {this.props.health.detailed_final_step_points.blood_pressure} days 
                          {this.props.health.first_step_points <= 1 ? (<span style={{color: 'green',fontSize: '12px'}}> (1 x {this.props.health.detailed_final_step_points.blood_pressure} points)</span>) : null}
                          {this.props.health.first_step_points === 2 || this.props.health.first_step_points === 3 ? (<span style={{color: '#ffc459', fontSize: '12px'}}> (2 x {this.props.health.detailed_final_step_points.blood_pressure} points)</span>) : null}
                          {this.props.health.first_step_points > 3 ? (<span style={{color: 'red',fontSize: '12px'}}> (3 x {this.props.health.detailed_final_step_points.blood_pressure} points)</span>) : null}
                       .</p>
                      </span>
                      ) : (null)}


                     { this.props.health.detailed_final_step_points.weight > 0 ? (
                      <span>
                       <p style={{color: 'black'}}>Weight</p>
                       <p style={{fontSize: '15px', fontStyle: 'italic', marginTop: '-15px', paddingLeft: '20px'}} > - No entry on {this.props.health.detailed_final_step_points.weight} days 
                          {this.props.health.first_step_points <= 1 ? (<span style={{color: 'green',fontSize: '12px'}}> (1 x {this.props.health.detailed_final_step_points.weight} points)</span>) : null}
                          {this.props.health.first_step_points === 2 || this.props.health.first_step_points === 3 ? (<span style={{color: '#ffc459', fontSize: '12px'}}> (2 x {this.props.health.detailed_final_step_points.weight} points)</span>) : null}
                          {this.props.health.first_step_points > 3 ? (<span style={{color: 'red',fontSize: '12px'}}> (3 x {this.props.health.detailed_final_step_points.weight} points)</span>) : null}
                       .</p>
                      </span>
                      ) : (null)}


                    </div>
                  </div>
              </div>
                ) : (null)  }



              {this.props.health.first_step_points === this.props.health.points ? (
                <div className="container" style={{backgroundColor: '#f7f7f7', paddingTop: '10px', borderRadius: '7px', marginTop: '15px'}}>
                  <div className="row">
                    <div className="col-12">
                       <p style={{color: 'black', fontStyle: 'italic'}}>no penalties.</p>
                    </div>
                  </div>
                </div>
              ) : (null)}



              <p style={{color: 'black', fontStyle: 'italic', fontSize: '16px', marginTop: '20px'}} >Final Points: {this.props.health.points} </p>
              {this.props.health.points <= 2 ? (<p style={{color: 'black', fontStyle: 'italic', fontSize: '16px', marginTop:'-18px'}} >Final Status: <span style={{color: 'green'}} >green</span> </p>) : null}
              {this.props.health.points === 3 || this.props.health.points === 4 || this.props.health.points === 5 ? (<p style={{color: 'black', fontStyle: 'italic', fontSize: '16px', marginTop:'-18px'}} >Final Status: <span style={{color: '#ffc459'}} >orange</span> </p>) : null}
              {this.props.health.points > 5 ? (<p style={{color: 'black', fontStyle: 'italic', fontSize: '16px', marginTop:'-18px'}} >Final Status: <span style={{color: 'red'}} >red</span> </p>) : null}



            </span>
    )
  }
}