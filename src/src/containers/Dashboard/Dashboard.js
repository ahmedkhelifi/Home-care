import React from 'react';
import Cookies from 'js-cookie';

import Patient         from  '../Patient';


import Login         from  '../../components/Login';
import Allgemein     from  '../../components/Allgemein';
import PatientList     from  '../../components/PatientList';
import AdminSidebar     from  '../../components/AdminSidebar';

import './style.css';

export default class UserDashboard extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      openedTab: 'Allgemein',

      user: {},
      authenticated: false,


      survey_tabs : [],
      survey: {},
      survey_data: {},
      settings: {general: {}, surveys: {pinned: []}, votes: {}, consultations: {}}
    };

    this.tabClicked        = this.tabClicked.bind(this)
    this.loggedIn          = this.loggedIn.bind(this)
    this.logout            = this.logout.bind(this)
    
    this.tabOpened         = <Allgemein refresh={false} />
  }

  componentDidMount(){
    var cookies = Cookies.get()
    if(cookies.hasOwnProperty('authenticated') && cookies.hasOwnProperty('user')) {
      if(cookies.authenticated) this.setState({authenticated: true, user: JSON.parse(Cookies.get('user'))})
    }
  }

  /*
  *     Call right component when Admin Dashboard sidebar tabs are clicked
  */

  tabClicked(e, id){
    var target = e.target.id
    this.setState({refresh: this.state.openedTab === target})

    switch (target) {
           case "Allgemein":
               //this.tabOpened = <Allgemein refresh={this.state.openedTab === target} />
               this.setState({ openedTab: 'Allgemein'});
               break;

            case "UserList": 
               //this.tabOpened = <UserList refresh={this.state.openedTab === target} />
               this.setState({ openedTab: 'PatientList'});
               break;

            default:
               this.setState({ openedTab: 'Allgemein'});
               break;
    }
  }

  loggedIn(user){
    this.setState({authenticated: true, user: user})
    Cookies.set('user', user)
    Cookies.set('authenticated', true)
    
  }

  logout(){
    this.setState({authenticated: false, user: {}})
    Cookies.remove('authenticated')
    Cookies.remove('user')
  }

  render() {
    var survey = this.state.survey

      if(this.state.authenticated && this.state.user !== {}) {
        console.log(this.state.user.type)
        if(this.state.user.type === 'doctor') {
          return (
            <section>

              <div className="wrapper">

                  <AdminSidebar firstname={this.state.user.firstname} tabClicked={this.tabClicked} openedTab={this.state.openedTab} logout={this.logout} survey_tabs={this.state.survey_tabs} survey={this.state.survey}/>

                  <div className="main-panel" style={{backgroundColor: '#f5f6f8', minHeight: '100vh'}}>

                      <div className="content">

                          {this.state.openedTab === 'Allgemein'        ? (<Allgemein    refresh={this.state.refresh} />) : (null)}
                          {this.state.openedTab === 'PatientList'      ? (<PatientList     refresh={this.state.refresh} />) : (null)}


                      </div>
                      
                  </div>
              </div>


            </section>
          )
        } else if(this.state.user.type === 'patient') {
          return (<Patient user={this.state.user} logout={this.logout} />)
        }
      } else {
        return(<Login loggedIn={this.loggedIn}/>)
      }
  }
}
