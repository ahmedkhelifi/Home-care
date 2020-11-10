import React from 'react';
import Cookies from 'js-cookie';

import Login         from  '../../components/Login';
import Allgemein     from  '../../components/Allgemein';
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
    this.addSurveyTab      = this.addSurveyTab.bind(this)
    this.findSurveyID      = this.findSurveyID.bind(this)
    
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
               this.setState({ openedTab: 'Allgemein', survey: {}});
               break;

            case "UserList": 
               //this.tabOpened = <UserList refresh={this.state.openedTab === target} />
               this.setState({ openedTab: 'UserList', survey: {}});
               break;

            default:
               this.setState({ openedTab: 'Allgemein', survey: {}});
               break;
    }
  }

  findSurveyID(id){
    this.state.survey_tabs.forEach(survey => {
      if(survey.id === id) {
        this.setState({ openedTab: 'stickySurvey', survey: survey});
        return
      }
        
    })
  }

  addSurveyTab(survey){
    //maximum 3 tabs open
    if(this.state.survey_tabs.length < 4){

        //if already exists, don't add
        let bool = false
        this.state.survey_tabs.forEach(temp => {
          if (temp.id === survey.id) bool = true
        })

        if(!bool){
          let survey_tabs = this.state.survey_tabs
          survey_tabs.push(survey)
          let settings = this.state.settings
          settings.surveys.pinned = JSON.stringify(survey_tabs)
          this.setState({survey_tabs: survey_tabs, settings: settings})
          this.forceUpdate()
        }

    }
   

  }

  loggedIn(user){
    delete user['settings'];
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
        if(this.state.user.role !== 'pharmacist') {
          return (
            <section>

              <div className="wrapper">

                  <AdminSidebar firstname={this.state.user.firstname} tabClicked={this.tabClicked} openedTab={this.state.openedTab} logout={this.logout} survey_tabs={this.state.survey_tabs} survey={this.state.survey}/>

                  <div className="main-panel" style={{backgroundColor: '#f5f6f8', minHeight: '100vh'}}>

                      <div className="content">

                          {this.state.openedTab === 'Allgemein'     ? (<Allgemein    refresh={this.state.refresh} />) : (null)}
                          {/*this.state.openedTab === 'UserList'      ? (<UserList     refresh={this.state.refresh} />) : (null)*/}


                      </div>
                      
                  </div>
              </div>


            </section>
          )
        } else {
           // return (<pharmcist logout={this.logout} user={this.state.user}/>)
        }
      } else {
        return(<Login loggedIn={this.loggedIn}/>)
      }
  }
}
