import React from 'react';
import './style.css';

class AdminSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.isOpened   = this.isOpened.bind(this)
  }

  isOpened(tab){
    if(this.props.openedTab === tab)
      return "menu_tab"
  }

  render() {
    return (
      <div className="sidebar-admin" >
            <div className="sidebar-wrapper-admin">
                <div className="logo">
                    <a>
                        Hallo Doctor
                    </a>
                </div>

                <ul className="menu">
                  <li>Patient Data</li>
                  <li id="Allgemein" className={this.isOpened("Allgemein")} onClick={(e) => this.props.tabClicked(e)}>Dashboard</li>
                  <li id="PatientList" className={this.isOpened("PatientList")} onClick={(e) => this.props.tabClicked(e)}>All Patients</li>
                </ul>

                <ul className="menu">
                  <li>Chat</li>
                  <li id="Pharmcists" className={this.isOpened("Pharmcists")} onClick={(e) => this.props.tabClicked(e)} >Inbox</li>
                </ul>

                <ul className="menu">
                  <li>Settings</li>
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