/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import { Link } from "react-router-dom";
import Header from  '../../components/Header';

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      guidelines: []
    };
  }


  componentDidMount() {
    const { username, onSubmitForm } = this.props;
    if (username && username.trim().length > 0) {
      onSubmitForm();
    }
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
    targetUrl = 'https://backend.leitlinien.krebsgesellschaft.de/get_guidelines?version_id=public'
    //, {mode: 'no-cors'}
     fetch(proxyUrl + targetUrl)
     .then(blob => blob.json())
      .then(
        (blob) => {
          this.setState({
            isLoaded: true,
            guidelines: blob
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      ).then( (blob) =>
        document.getElementById('loading').parentNode.removeChild(document.getElementById('loading'))
        //document.getElementById('loading').parentNode.removeChild(document.getElementById('loading'));
      )
      // .then(res => console.log('response: ', res))
      // .then(res => res.json())
      // .then(
      //   (result) => {
      //     this.setState({
      //       isLoaded: true,
      //       guidelines: result
      //     });
      //   },
      //   // Note: it's important to handle errors here
      //   // instead of a catch() block so that we don't swallow
      //   // exceptions from actual bugs in components.
      //   (error) => {
      //     this.setState({
      //       isLoaded: true,
      //       error
      //     });
      //   }
      // )
  }

  render() {
    const {
      loading, error, repos, username, onChangeUsername, onSubmitForm
    } = this.props;
    const { guidelines } = this.state;
    const reposListProps = {
      loading,
      error,
      repos
    };

    var guideline = { marginBottom: '30px', borderRadius: '4px', boxShadow: '0 1px 5px -2px #cccccc',
    marginLeft: '1%', marginRight: '1%'}
    var heading = {padding: '20px', backgroundColor: '#f29402', borderRadius: '4px 4px 0 0', fontSize: '18px'}

    return (
      <section style={{marginTop: '-60px'}}>
        <Helmet>
          <title>Guidelines</title>
          <meta name="Guidelines" content="contains all Guidelines" />
        </Helmet>

        <div className="container">
          <div className="row" style={{padding: '0 0 34px 18px'}}>
            <h2>Verfügbare Leitlinien</h2>
          </div>

          <div className="row">

          <h3 id="loading" style={{alignContent: 'center'}}>loading...</h3>
          
          {guidelines.map(item => (
            <div className="col-4" style={{height: '100%'}}>
            <div style={guideline} key={item.uid}>
            <div style={heading}>
              <Link to= {"guideline/"+item.id} style={{color: 'white'}}>
                  {item.short_title}
              </Link> 
            </div>
              <div className="description">
                <div className="inner">{item.title}</div>
            </div>
            </div>
            </div>
          ))}
         
         </div>
        </div>

      </section>
    );
  }
}