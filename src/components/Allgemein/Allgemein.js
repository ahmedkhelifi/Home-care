import React from 'react';
// import ReactDOM from 'react-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ReactTooltip from "react-tooltip";
import './style.css';


class Allgemein extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoaded              :            false
    }
  }

  componentDidMount(){

  }

  render() {
    document.title = "Dashboard"

    return (
              <div className="container-fluid">
                <div className="row">

                  {(!this.state.dataLoaded) ? (
                    <div className="myBox height75" style={{marginLeft: '30px'}}>
                        <div className="loading">
                          <div>
                            <div className="c1"></div>
                            <div className="c2"></div>
                            <div className="c3"></div>
                            <div className="c4"></div>
                          </div>
                          <span>Loading patient's data..</span>
                        </div>
                    </div>

                  ) : (null)}



                  </div> 
              </div>
    );
  }
}

export default Allgemein;
