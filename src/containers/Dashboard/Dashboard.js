import React from 'react';
import Cookies from 'js-cookie';

import Patient         from  '../Patient';
import Doctor         from  '../Doctor';
import Pharamcy         from  '../Pharamcy';


import Login         from  '../../components/Login';
import Allgemein     from  '../../components/Doctor/Allgemein';
import PatientList     from  '../../components/Doctor/PatientList';
import AdminSidebar     from  '../../components/Doctor/AdminSidebar';
import Chat     from  '../../components/Doctor/Chat';

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
               this.setState({ openedTab: 'Allgemein'});
               break;

            case "PatientList": 
               this.setState({ openedTab: 'PatientList'});
               break;
            case "Chat": 
               this.setState({ openedTab: 'Chat'});
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

      if(this.state.authenticated && this.state.user !== {}) {
        // console.log(this.state.user.type)
        if(this.state.user.type === 'doctor') {
          return(<Doctor firstname={this.state.user.firstname} user={this.state.user} logout={this.logout}/>)
        } else if(this.state.user.type === 'patient') {
          return (<Patient user={this.state.user} logout={this.logout} />)
        } else if(this.state.user.type === 'pharmacy') {
          return (<Pharamcy user={this.state.user} logout={this.logout} />)
        }
      } else {
        return(<Login loggedIn={this.loggedIn}/>)
      }
  }
}
