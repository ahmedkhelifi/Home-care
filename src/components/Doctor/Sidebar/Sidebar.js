import React from 'react';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.isOpened   = this.isOpened.bind(this)
  }

  isOpened(tab){ //if tab is opened, this makes it in bold
    if(this.props.openedTab === tab)
      return "menu_tab"
  }

  get_unread_messages_number = () => {
    let number =  0
    this.props.chatrooms.forEach(chatroom =>  {
      if (chatroom.messages.messages[chatroom.messages.messages.length-1].fromType !== 'doctor' && !chatroom.messages.messages[chatroom.messages.messages.length-1].read){
        number += 1
      }
    })

    return number
  }

  render() {
    return (
      <div className="sidebar-admin" >
            <div className="sidebar-wrapper-admin">
                <div className="logo" style={{paddingLeft: '10px'}}>
                    <a>
                        Homecare
                    </a>
                </div>

                <ul className="menu">
                  <li>Patient Data</li>
                  <li id="Allgemein" className={this.isOpened("Allgemein")} onClick={(e) => this.props.tabClicked(e)}>Dashboard</li>
                  <li id="PatientList" className={this.isOpened("PatientList")} onClick={(e) => this.props.tabClicked(e)}>All Patients</li>
                </ul>

                <ul className="menu">
                  <li>Chat</li>
                  <li id="Chat" className={this.isOpened("Chat")} onClick={(e) => this.props.tabClicked(e)} >Inbox {this.get_unread_messages_number() > 0 ? (<span>({this.get_unread_messages_number()})</span>) : (null) }</li>
                </ul>

                <ul className="menu">
                  <li className="log_me_out" onClick={(e) => this.props.logout(e)}>log out</li>
                </ul>
            </div>
        </div>

    );
  }
}
export default Sidebar;