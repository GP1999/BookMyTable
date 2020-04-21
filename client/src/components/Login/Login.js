import React from 'react';

import {

    Redirect
    
  } from "react-router-dom";
  

import  './Login.css';



  class Login extends React.Component{
      constructor(props){
           super(props);
           let Authorized=false;
           this.state={
               email:"",
               password:"",
               Authorized:false
           }
           this.handleInputChange = this.handleInputChange.bind(this);
           this.handleSubmit = this.handleSubmit.bind(this);
        

      }
     
    handleInputChange(event)
    {
        let target=event.target;
      
        this.setState({
            [target.name]:target.value
        })
    }
    handleSubmit(event){
        event.preventDefault();
        let doc=this;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state)
        };
         fetch('/Login', requestOptions)
         .then(function(res){
           if(res.status===200)
           {
            doc.setState({Authorized:true});

           }
           else
           {
               res.text().then(function(message){
                   alert(message);
               });
               
           }
        });
        

    }

      render(){
          
          if(this.state.Authorized)
         {
             return <Redirect to='/'/>
         }
          else{
          return(
              
              

            <div className="login-clean">
            <form onSubmit={this.handleSubmit}>
                <h2 className="sr-only">Login Form</h2>
                <div className="illustration">
                    <i className="icon ion-android-person"></i>
                </div>
                <div className="form-group">
                    <input className="form-control" type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleInputChange} />

                 </div>
                <div className="form-group">
                    <input className="form-control" type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleInputChange}/>
                
                 </div>
                <div className="form-group">
                    <button className="btn btn-primary btn-block" type="submit">Log In</button>
                </div>
                <a className="forgot" href="#">Forgot your email or password?</a>
                                   <br></br>         
                <a className="forgot" href="#">New User ? Register Here</a>
            </form>
             </div> 
          )
          }
      }
  }

  export default Login;