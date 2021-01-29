
export default class Chat extends React.PureComponent { 

  constructor(props) {
    super(props);
    this.state = {
      random: false
    };
  }


  render() {


    return (
    <div className="container-fluid" style={{backgroundColor: '#f7f7f7', marginTop: '-20px', paddingTop: '30px', minHeight: '100vh'}}>

      <div className="col-12">

      <p>Chat</p>

      </div>
    </div>
    );
  }
}