import React from 'react';
import './style.css';

class AdminSidebar extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      survey_tabs : this.props.survey_tabs
    }

    this.isOpened   = this.isOpened.bind(this)
  }

  // shouldComponentUpdate(nextProps, nextState){
  //   if(this.state.survey_tabs !== nextState.survey_tabs){
  //     this.forceUpdate()
  //   }
  //   return this.state.survey_tabs !== nextState.survey_tabs || this.props.openedTab !== nextProps.openedTab
  // }

  isOpened(tab){
    if(this.props.survey.hasOwnProperty('data')) { //opened a pinned survey
      if(this.props.survey.id === tab) return "menu_tab"
    } else {
    if(this.props.openedTab === tab)
      return "menu_tab"
    }
  }

  render() {
    var survey_tabs = this.props.survey_tabs
    return (
      <div className="sidebar-admin" >
            <div className="sidebar-wrapper-admin">
                <div className="logo">
                    <a>
                        Hallo Dr. {this.props.lastname}
                    </a>
                </div>

                <ul className="menu">
                  <li>Patient Data</li>
                  <li id="Allgemein" className={this.isOpened("Allgemein")} onClick={(e) => this.props.tabClicked(e)}>Dashboard</li>
                  <li id="UserList" className={this.isOpened("UserList")} onClick={(e) => this.props.tabClicked(e)}>Patients</li>
                </ul>

                <ul className="menu">
                  <li>others</li>
                  <li id="Medikamente" className={this.isOpened("Medikamente")} onClick={(e) => this.props.tabClicked(e)} >Medication</li>
                  <li id="Pharmcists" className={this.isOpened("Pharmcists")} onClick={(e) => this.props.tabClicked(e)} >Pharmacies</li>
                </ul>

                <ul className="menu">
                  <li>Einstellungen</li>
                  {/*<li>Profil</li>*/}
                  {<li id="Settings" className={this.isOpened("Settings")} onClick={(e) => this.props.tabClicked(e)}>Profil</li>}
                  <li className="log_me_out" onClick={(e) => this.props.logout(e)}>log out</li>
                </ul>
            </div>
        </div>

    );
  }
}
export default AdminSidebar;