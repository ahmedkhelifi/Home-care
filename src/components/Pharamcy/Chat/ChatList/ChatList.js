import React, { Component } from 'react'

class ChatList extends Component {

  render() {
    return (
    	 <div className="row">
    	 	<div className="col-12">
		        <div className="row chat_list_bubble">
		          <div className="col-3" style={{justifyContent: 'center', alignItems: 'center'}}>
		            <div className="circle" style={{justifyContent: 'center', alignItems: 'center'}}> 
		              <p style={{color: 'white', textAlign: 'center', fontWeight: 'bold', paddingTop: '17px', fontSize: '30px'}}>T</p>
		            </div>
		          </div>
		          <div className="col-9" style={{justifyContent: 'center', alignItems: 'center'}}>
		            <p style={{color:'white', fontWeight: 'bold'}} >Dr. Thiel</p>
		            <p style={{color:'#ffffffc2', marginTop: '-18px'}} >take your medication dummy!</p>
		          </div>
		        </div>



		        <div className="row chat_list_bubble">
		          <div className="col-3" style={{justifyContent: 'center', alignItems: 'center'}}>
		            <div className="circle" style={{justifyContent: 'center', alignItems: 'center'}}> 
		              <p style={{color: 'white', textAlign: 'center', fontWeight: 'bold', paddingTop: '17px', fontSize: '30px'}}>T</p>
		            </div>
		          </div>
		          <div className="col-9" style={{justifyContent: 'center', alignItems: 'center'}}>
		            <p style={{color:'white', fontWeight: 'bold'}} >Dr. Thiel</p>
		            <p style={{color:'#ffffffc2', marginTop: '-18px'}} >take your medication dummy!</p>
		          </div>
		        </div>



		        <div className="row chat_list_bubble">
		          <div className="col-3" style={{justifyContent: 'center', alignItems: 'center'}}>
		            <div className="circle" style={{justifyContent: 'center', alignItems: 'center'}}> 
		              <p style={{color: 'white', textAlign: 'center', fontWeight: 'bold', paddingTop: '17px', fontSize: '30px'}}>T</p>
		            </div>
		          </div>
		          <div className="col-9" style={{justifyContent: 'center', alignItems: 'center'}}>
		            <p style={{color:'white', fontWeight: 'bold'}} >Dr. Thiel</p>
		            <p style={{color:'#ffffffc2', marginTop: '-18px'}} >take your medication dummy!</p>
		          </div>
		        </div>
		    </div>
		</div>
    )
  }
}

export default ChatList