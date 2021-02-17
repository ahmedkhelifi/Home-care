import React from 'react';
import Cookies from 'js-cookie';

import Patient         from  '../Patient';
import Doctor         from  '../Doctor';
import Pharamcy         from  '../Pharamcy';
import Login         from  '../../components/Login';

export default class RoutingLogic extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,

      user: {},
      authenticated: false,
    };
  }

  componentDidMount(){
    var cookies = Cookies.get()
    if(cookies.hasOwnProperty('authenticated') && cookies.hasOwnProperty('user')) {
      if(cookies.authenticated) this.setState({authenticated: true, user: JSON.parse(Cookies.get('user'))})
    }
  }

  loggedIn = (user) => {
    this.setState({authenticated: true, user: user})
    Cookies.set('user', user)
    Cookies.set('authenticated', true)
    
  }

  logout = () => {
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
