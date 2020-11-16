import React from 'react';
import ReactHtmlParser from 'react-html-parser';

import './style.css';

class Profile extends React.Component {
  componentDidMount(){
    window.scrollTo(0, 0);
  }

  render() {

    return (
        <div className="container-fluid" style={{padding: '0 0'}}>
              <div className="row" style={{marginLeft: '0', minHeight: '100px', marginTop: '-30px'}}>
                <div className="col-12" style={{marginBottom: '20px', boxShadow: '0 0 28px -16px #888888', backgroundColor: 'rgba(242, 148, 0, 0.09)'}} >
                        <span style={{padding: '50px'}}>
                        <h2 style={{marginTop: '35px', textAlign: 'center'}}>{this.props.user.firstname + ' ' + this.props.user.lastname}</h2> 
                        <p style={{fontSize: '13px', textAlign: 'center'}}>Letztes aktiv am {this.props.timeSince(this.props.user.last_login)}</p>
                        </span>
                </div>
              </div>
              <div className="row" style={{padding: '0px 30px'}}>
                <div className="col-12">
                    <h3 style={{marginBottom: '20px'}}>Verlauf:</h3> 
                </div>
                <div className="col-12">
                                    {JSON.parse(this.props.user.guidelines).length === 0 ? 
                                      
                                      (<p>leer...</p>):
                                      
                                      (<span>
                                       <p style={{color: '#f79136'}} ></p>
                                       {JSON.parse(this.props.user.guidelines).map(guideline => (
                                        <span>
                                            {guideline.comments.length > 0 ? (
                                        <span>
                                         <h5 style={{marginBottom: '6px'}}><span style={{textDecoration: 'underline'}}>Leitlinie:</span> {guideline.name}</h5>
                                        {guideline.comments.map(comment => (
                                            <div key={comment.created_on} className="card" style={{boxShadow: '0 0 28px -16px #888888', marginBottom: '15px'}}>
                                             <div className="card-header">
                                              <div className="row">
                                                  <div className="col-6">
                                                    {ReactHtmlParser(comment.commented)}
                                                  </div>
                                                  <div className="col-6">
                                                    {comment.comment}
                                                  </div>

                                                  <div className="col-12" style={{marginTop: '10px'}}>
                                                      <h6><span style={{textDecoration: 'underline'}}>Kapitel:</span> {comment.chapter}</h6>
                                                      <h6><span style={{textDecoration: 'underline'}}>Datum:</span> {this.props.timeSince(comment.created_on)}</h6>
                                                  </div>

                                                </div>
                                              </div>
                                              </div>
                                              )
                                            )}
                                        </span>)
                                             : (null)}
                                            
                                        </span>))}
                                       </span>)}


                </div>

              </div>
        </div>

    );
  }
}

export default Profile;