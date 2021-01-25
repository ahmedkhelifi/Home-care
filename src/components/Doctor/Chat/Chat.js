import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';


class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }


  componentDidMount(){

  }



  render() {
    document.title = "Chat"
      return (
              <div className="container-fluid">
                <div className="row">
                  <div className="col-6">

                    <h3 style={{marginLeft: '15px'}} >Chat</h3>

                  </div>



                  </div> 
              </div>
      )
    }
}

export default Chat;