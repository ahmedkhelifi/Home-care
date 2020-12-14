import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

class Signup extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      step: 1,

      firstname: '',
      lastname: '',
      email: '',
      birthday: '',
      advice: '',
      username: '',
      password: '',

      usersLoaded: false,
      transplants: [],
      selectedChapters: [],


      users: [],
      noUsers: false,
      onlySelected: false,
      showSearch: false,
      search: '',


      selectedTransplant: '',
      selectedTransplantID: '',
      selectedTransplantUID: '',


      checkedUsers: [],

      opened: false,
      url: '',
      urlValid: false,

      noGuideline: false

    };

    this.handleFirstNameChange      = this.handleFirstNameChange.bind(this)
    this.handleLastNameChange       = this.handleLastNameChange.bind(this)
    this.handleEmailChange          = this.handleEmailChange.bind(this)
    this.handleBirthdayChange       = this.handleBirthdayChange.bind(this)
    this.handleUsernameChange       = this.handleUsernameChange.bind(this)
    this.handlePasswordChange       = this.handlePasswordChange.bind(this)
    this.handleDisplayChange        = this.handleDisplayChange.bind(this);
    this.handleCheckbox             = this.handleCheckbox.bind(this);
    this.registerPatient            = this.registerPatient.bind(this);
    this.checkChecked               = this.checkChecked.bind(this);
    this.weiter                     = this.weiter.bind(this);
    this.zuruck                     = this.zuruck.bind(this);
    this.handleAdviceChange         = this.handleAdviceChange.bind(this)

  }

  componentDidMount(){
        window.scrollTo(0, 0);
        fetch('/extern/api/alltransplants/')
            .then(blob => blob.json())
            .then(
                (blob) => {
                    this.setState({
                        guidelineLoaded: true,
                        transplants: blob.data
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        guidelineLoaded: false,
                        error
                    });
                }
            )
  }

  handleFirstNameChange(e) {
    this.setState({ firstname: e.target.value })
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value })
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value })
  }

  handleBirthdayChange(e) {
    this.setState({ birthday: e.target.value })
  }

  handleLastNameChange(e) {
    this.setState({ lastname: e.target.value })
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value })
  }

  handleAdviceChange(e,c) {
    this.setState({ advice: e })
  }

  handleDisplayChange(e) {
        this.setState({ display: e.target.value });
  }

  handleInvitationTextChange(content, editor) {
        this.setState({ invitationText: content });
  }

  handleClosedTextChange(content, editor) {
        this.setState({ closedText: content });
  }

  handleCheckbox(item) {
      if(item.target.getAttribute('class') !== 'tick'){
        this.setState({
          selectedTransplant: item.target.firstChild.nextSibling.getAttribute('title'),
          selectedTransplantID: item.target.firstChild.nextSibling.id,
          selectedTransplantUID: item.target.firstChild.nextSibling.getAttribute('uid')
        });   
      }  else {
        this.setState({
          selectedTransplant: item.target.parentNode.firstChild.nextSibling.getAttribute('title'),
          selectedTransplantID: item.target.parentNode.firstChild.nextSibling.id,
          selectedTransplantUID: item.target.parentNode.firstChild.nextSibling.getAttribute('uid')
        });   
      }

    }

  checkChecked(created_on){
      var check = this.state.checkedUsers
      const index = check.findIndex(x => x.created_on ===  created_on);
      if (index !== -1) {
        return true
      }
      
      return false
  }

  handleOptionChange(title, id) {
    this.setState({
      selectedTransplant: title,
      selectedTransplantID: id
    });
  }

  weiter() {
    if(this.state.selectedTransplant === '') {
      this.setState({noGuideline: true})
      return
    }

    var newStep = this.state.step + 1
    this.setState({ step: newStep, noGuideline: false})
  }

  zuruck() {
    var newStep = this.state.step - 1
    this.setState({ step: newStep, showSearch: false})
    if(newStep === 1){
      this.setState({ checkedUsers: []})
    }
  }

  registerPatient() {
        fetch('/api/patient', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstname: this.state.firstname, lastname: this.state.lastname, birthdate: this.state.birthday,  email: this.state.email, username: this.state.username, password: this.state.password, advice: this.state.advice
              })
            })
        .then(res => console.log('response ', res.json()))
        .then(res => this.props.closesignup())
  }


  render() {
  document.title = "Add New Patient"
  
  let transplants = [
    {title: 'Heart Transplant.'},
    {title: 'Intestinal Transplant.'},
    {title: 'Islet Cell Transplant.'},
    {title: 'Kidney Transplant'},
    {title: 'Liver Transplant'},
    {title: 'Lung Transplant'},
    {title: 'Pancreas Transplant'},
    {title: 'Pediatric Transplant'},
    {title: 'Cornea Transplant'},
    {title: 'Trachea Transplant'},
    {title: 'Skin Transplant'},
    {title: 'Vascular tissues Transplant'}
  ]
  if (this.state.step === 1){
    return (
        <div id="test">

                      <div className="row">
                          <div className="col-12">
                            <h4><b>Choose the type of transplant the patient received</b></h4>
                          </div>
                          <div className="col-12">
                            <div id="checks" className="myBox height90">
                            {transplants.map(item => (
                               <span>
                              { item.title === this.state.selectedTransplant ? 
                                    (
                                      <div className="radioholder activeradioholder">
                                        <span className="tick"></span>
                                        <input type="radio" id={item.id} uid={item.uid} title={item.title} value={item.title}
                                        checked={this.state.selectedOption === item.title} style={{display: 'none'}}/> 
                                        {item.title}
                                      </div>
                                  ) :
                                  (
                                  <div className="radioholder" onClick={this.handleCheckbox}>
                                    <span className="tick"></span>
                                    <input type="radio" id={item.id} uid={item.uid} title={item.title} value={item.title}
                                    checked={this.state.selectedOption === item.title} style={{display: 'none'}}
                                    /> {item.title}
                                  </div>
                                  )
                             }
                            </span>
                            ))}
                              <br/>
                            </div>

                           </div>
                      </div>

                    <div className="row">
                      <div className="col margin_top" style={{textAlign: 'center'}}>
                        <button className="importbutton_dkg" style={{display: 'inline-block'}} onClick={(e) => this.props.closesignup()}>Abrechen</button>
                        <button type="submit"className="signupbtn margin_right button_dkg" style={{fontSize: '20px'}}
                         onClick={this.weiter}>Weiter</button>
                      </div>
                    </div>
      </div>

    );
  }

  if (this.state.step === 2){
    return (
        <div className="row" style={{marginLeft: '0'}}>
          <div className="col-12">
                  <div className="row">

                          <div className="col-6">
                            <h4>Firstname:</h4>
                            <input className="userinput" type="text" placeholder="Firstname" name="firstname" value={this.state.firstname} onChange={this.handleFirstNameChange} style={{width: '100%'}}/>
                          </div>
                          <div className="col-6">
                            <h4>Lastname:</h4>
                            <input className="userinput" type="text" placeholder="Lastname" name="lastname" value={this.state.lastname} onChange={this.handleLastNameChange} style={{width: '100%'}}/>
                          </div>
                          <div className="col-6" style={{paddingTop: '30px', paddingBottom: '30px'}}>
                            <h4>Bithday:</h4>
                            <input className="userinput" type="text" placeholder="Birthdate" name="birthday" value={this.state.birthday} onChange={this.handleBirthdayChange} style={{width: '100%'}}/>
                          </div>
                          <div className="col-6" style={{paddingTop: '30px', paddingBottom: '30px'}}>
                            <h4>Email:</h4>
                            <input className="userinput" type="text" placeholder="Email" name="firstname" value={this.state.email} onChange={this.handleEmailChange} style={{width: '100%'}}/>
                          </div>
                          <div className="col-6" style={{paddingTop: '30px', paddingBottom: '30px'}}>
                            <h4>Username:</h4>
                            <input className="userinput" type="text" placeholder="Username" name="username" value={this.state.username} onChange={this.handleUsernameChange} style={{width: '100%'}}/>
                          </div>
                          <div className="col-6" style={{paddingTop: '30px', paddingBottom: '30px'}}>
                            <h4>Password:</h4>
                            <input className="userinput" type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handlePasswordChange} style={{width: '100%'}}/>
                          </div>

       
       
                  <div className="row white_block" style={{marginTop: '20px'}}>
                     <div  className="col-12">
                       <h4><b>Medical Advice</b></h4>
                       <p>You can add a medical advice to the  patient  here.</p>
                           <Editor
                             apiKey="f2d1xaum5q307ut8fc9k3jv4hzdnq2a671gaz9j6v17m6ioe"
                             initialValue={this.state.advice}
                             init={{
                               height: "50vh",
                               menubar: false,
                               paste_as_text: true,
                               plugins: [
                                 'advlist autolink lists link paste'
                               ],
                               toolbar: 'bold italic underline strikethrough blockformats | forecolor backcolor | alignleft aligncenter alignright | bullist numlist | ',
                             }}
                             onEditorChange={this.handleAdviceChange}
                           />
                        
                       </div>
                      </div>








          
                  <div className="row" style={{marginTop: '20px'}}>
                      <div className="col-12 margin_top" style={{textAlign: 'center'}}>
                      <button className="importbutton_dkg" style={{display: 'inline-block'}} onClick={this.zuruck}>zurück</button>
                        <button type="submit"className="signupbtn margin_right button_dkg" style={{fontSize: '20px'}}
                         onClick={this.registerPatient}>Patient erstellen</button>
                      </div>
                    </div>

          </div>
        </div>
        </div>

    );
  }

  }
}

export default Signup;