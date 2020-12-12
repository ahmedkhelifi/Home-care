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
      medicaments: [],


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
    this.checkboxClassname          = this.checkboxClassname.bind(this)
    this.checkChecked               = this.checkChecked.bind(this)
    this.weiter                     = this.weiter.bind(this);
    this.zuruck                     = this.zuruck.bind(this);
    this.handleAdviceChange         = this.handleAdviceChange.bind(this)
    this.handleMedicineAmmount      = this.handleMedicineAmmount.bind(this)
    this.handleMedicineDuration     = this.handleMedicineDuration.bind(this)

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
    console.log(item)
    let bool = this.state.medicaments.some(chapter => chapter.title === item.title)
    if(bool) {
            let medicaments = this.state.medicaments
            const index = medicaments.findIndex(x => x.title === item.title);
            if (index !== -1 && index !== undefined) 
              medicaments.splice(index, 1);
            this.setState({ medicaments: medicaments })
            // this.props.handleSelectedChapters(selectedChapters)
    } else {
      let medicaments = this.state.medicaments
      item.ammount = 0
      item.duration = 0
      item.history = []
      medicaments.push(item)
      this.setState({ medicaments: medicaments })
      // this.props.handleSelectedChapters(selectedChapters)
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
                body: JSON.stringify({ firstname: this.state.firstname, lastname: this.state.lastname, birthdate: this.state.birthday,  email: this.state.email, username: this.state.username, password: this.state.password, medication: this.state.medicaments
              })
            })
        .then(res => console.log('response ', res.json()))
        .then(res => this.props.closesignup())
  }

  checkboxClassname(item){
    if (this.state.medicaments.some(medicament => medicament.title === item.title))
      return "radioholder activeradioholder"
    else
      return "radioholder"
  }

  handleMedicineAmmount(e, item){
    if(isNaN(e.target.value))
      return
    let medicaments = this.state.medicaments
    medicaments.forEach(medicament => {
      if(medicament.title === item.title){
        medicament.ammount = Number(e.target.value)
      }
    })
    this.setState({ medicaments: medicaments });
  }

  handleMedicineDuration(e, item){
    if(isNaN(e.target.value))
      return
    let medicaments = this.state.medicaments
    medicaments.forEach(medicament => {
      if(medicament.title === item.title){
        medicament.duration = Number(e.target.value)
      }
    })
    this.setState({ medicaments: medicaments });
  }


  render() {
  let allmedicaments = [
    {title: 'Azathioprine'},
    {title: 'Ciclosporin'},
    {title: 'Mycophenolate mofetil'},
    {title: 'Cyclophosphamide'},
    {title: 'Azathioprine tablets'},
    {title: 'Prednisone tablets'},
    {title: 'Mycophenolate capsule'},
    {title: 'Methotrexate'},
    {title: 'Methotrexate injection'},
    {title: 'Tacrolimus'},
    {title: 'Cyclosporine'},
    {title: 'Mycophenolate Mofetil'},
    {title: 'Imuran'},
    {title: 'Rapamune'},
    {title: 'Cyclosporine'},
    {title: 'Tacrolimus'},
    {title: 'Prednisolone'},
    {title: 'Budesonide'},
    {title: 'Everolimus'},
    {title: 'Sirolimus'},
    {title: 'Adalimumab'},
    {title: 'Anakinra'},
    {title: 'Certolizumab'},
    {title: 'Etanercept'},
    {title: 'Golimumab'},
    {title: 'Ixekizumab'},
    {title: 'Natalizumab'},
    {title: 'Rituximab'},
    {title: 'Secukinumab'},
    {title: 'Tocilizumab'},
    {title: 'Ustekinumab'},
    {title: 'Vedolizumab'},
    {title: 'Basiliximab'}
  ]

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





                      <div className="row">
                          <div className="col-12">

                                    <div id="checks" className="myBox" style={{height: '55vh', overflow: 'scroll'}}>
                                    {allmedicaments.map(item => (
                                       <span style={{display: 'block', paddingBottom: '20px'}}>

                                              <div className={this.checkboxClassname(item)} onClick={e => this.handleCheckbox(item)}>
                                                <span className="tick"></span>
                                                <input type="radio" uid={item.uid} title={item.title} value={item.title}
                                                checked={this.state.medicaments.some(medicament => medicament.title === item.title)} style={{display: 'none'}}/> 
                                                {' ' + item.title}
                                              </div>

                                              {this.state.medicaments.some(medicament => medicament.title === item.title) ? (
                                                <span style={{fontSize: '18px', paddingLeft:'60px'}}>
                                                  <p style={{display: 'inline'}}>Take </p> 
                                                  <input className="medicationinput" type="text" value={this.state.medicaments.filter(medicament => { return medicament.title === item.title})[0].ammount} onChange={ e => this.handleMedicineAmmount(e, item)}/> 
                                                  <p style={{display: 'inline'}}> every </p> 
                                                  <input className="medicationinput" type="text" value={this.state.medicaments.filter(medicament => { return medicament.title === item.title})[0].duration} onChange={ e => this.handleMedicineDuration(e, item)}/>  <p style={{display: 'inline'}}> days </p>
                                                </span>) : (null)}


                                    </span>
                                    ))}
                                      <br/>
                                    </div>
                           </div>
                      </div>







          
                  <div className="row" style={{marginTop: '20px'}}>
                      <div className="col-12 margin_top" style={{textAlign: 'center'}}>
                      <button className="importbutton_dkg" style={{display: 'inline-block'}} onClick={this.zuruck}>back</button>
                        <button type="submit"className="signupbtn margin_right button_dkg" style={{fontSize: '20px'}}
                         onClick={this.registerPatient}>Add Patient</button>
                      </div>
                    </div>

          </div>
        </div>
        </div>

    )

  }
}

export default Signup;