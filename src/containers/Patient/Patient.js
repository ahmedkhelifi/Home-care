import React from 'react';

export default class Patient extends React.PureComponent { 

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      guidelines: []
    };
  }


  componentDidMount() {
    console.log('aaaa')
  }

  render() {

    return (
      <div className="patient_header">
      <p>patient</p>
      </div>
    );
  }
}