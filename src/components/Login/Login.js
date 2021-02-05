import React from 'react';
import './style.css';

// colors: #466d95a1 (blue), #ffca8fc9 (orange)

class Login extends React.Component { // eslint-disable-line react/prefer-stateless-function
  
  constructor(props) {
    super(props);
    this.state={
      username:         '',
      password:         '',
      wrong:            false, 
    }

    this.logme                 = this.logme.bind(this)
    this.handleUsernameChange  = this.handleUsernameChange.bind(this)
    this.handlePasswordChange  = this.handlePasswordChange.bind(this)
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value })
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value })
  }

  logme(){
    var new_user={ username: this.state.username, password: this.state.password}
    fetch('/api/login', {
                method: 'post',
                headers: { 
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(new_user)
            })
    .then(res => res.json())
    .then(res => {
      console.log('res')
      console.log(res)
        if(res.authenticated) {
          this.props.loggedIn(res.user)
        } else {
          this.setState({wrong: true})
          return
        }
    })
  }

  render() { 
    document.title = "Login - HomeCareApp"
    return (
              <div className="pagebody"> 

                             <div className="blob_gray"> 

                                <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" width="100%" id="blobSvg">
                                  <path id="blob" d="M422.5,290.5Q403,331,352.5,328Q302,325,284,354Q266,383,219,419Q172,455,138,417.5Q104,380,61,343.5Q18,307,67,262Q116,217,138.5,194Q161,171,162.5,97.5Q164,24,216,62.5Q268,101,316,92.5Q364,84,409.5,113.5Q455,143,448.5,196.5Q442,250,422.5,290.5Z" fill="#e9dfd3c4"></path>
                                </svg>

                              </div>

                             <div className="blob_orange"> 

                                <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" width="100%" id="blobSvg">
                                  <path id="blob" d="M384.5,266Q312,282,307,304Q302,326,281,330.5Q260,335,240.5,331.5Q221,328,156,359.5Q91,391,127,331.5Q163,272,118,239Q73,206,68.5,145.5Q64,85,124,80.5Q184,76,224.5,99.5Q265,123,328,84.5Q391,46,414.5,99Q438,152,447.5,201Q457,250,384.5,266Z" fill="#466d9582"></path>
                                </svg>

                            </div>


         

                    <div className="row" style={{marginLeft: '0'}}>
                     <div className="col-12" style={{height:'100vh', backgroundColor: 'rgb(250 244 220 / 47%)'}}>
                              <div className="centerVertical_fdsafsdfsdf" style={{textAlign:'center', zIndex: '100'}}>
                                {/*<img  src={Logo} alt="logo DKG" style={{width:'190px'}} className=""/>*/}
                                <h6 className="center_text marginTop" style={{color: 'black', fontSize: '28px', textAlign: 'center', marginBottom:'40px'}}>Homecare App</h6>
                                <p style={{fontSize: '20px'}}>Please enter your login details:</p>
                                {this.state.wrong ? (<p style={{fontSize: '16px', color: 'red', padding: '10px 0'}}>Wrong login details!</p>) : (null)}


                                    <div className="formular" style={{marginTop: '0px'}}>
                                      <form style={{display: 'inline-block', width: '66vw'}}>
                                          <div className="form-group col-12" style={{display: 'inline-block', padding: '0 10px'}}>
                                            {/*<label htmlFor="Firstname">Username:</label> <br/>*/}
                                            <input type="text" placeholder=" username" className="input_username" value={this.state.username} onChange={this.handleUsernameChange}/>
                                          </div>

                                          <div className="form-group col-xs-6" style={{display: 'inline-block', padding: '0 10px'}}>
                                            {/*<label htmlFor="E-Mail">Password</label>  <br/>*/}
                                            <input type="password" placeholder=" password" className="input_username" style={{marginBottom: '30px'}} autoComplete="on" value={this.state.password} onChange={this.handlePasswordChange}/> <br/>
                                          </div>
                                      </form>
                                    </div>

                              </div>

                            <a className="teilnehmen-btn" style={{cursor: 'pointer', marginTop: '40px', zIndex: '99999999', backgroundColor: '#000000'}} onClick={(e) => {this.logme(e)}}>Login</a>
                          
                      </div>

                    </div>
              </div>

    );
  }
}

export default Login;