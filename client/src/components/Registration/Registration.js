import React from 'react';
import './Registration.css';

class Registration extends React.Component{
    constructor(props){
        super(props);
        this.state={
            registered:false,
            Message:"",
            email:"",
            password:"",
            name:"",
            Mobile_no:""
            
        }
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleChange=this.handleChange.bind(this);
    }
    handleSubmit(event)
    {
        event.preventDefault();
        let doc=this;
        let data={email:this.state.email,password:this.state.password,
            name:this.state.name,Mobile_no:this.state.Mobile_no};
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
       fetch('/register',requestOptions)
       .then(function(res){
           if(res.status===20)
           {
               doc.setState({registered:true});
           }
           return res.text();
           
       })
       .then(function(res){
           doc.setState({
                Message:res
           })
       })

    }
    handleChange(event)
   {
       this.setState({
           [event.target.name]:event.target.value
       })
   }
    render()
    {
        return (
            <React.Fragment>
               
            <div className="register-photo">
            <h6 className="text-center text-info">{this.state.Message}</h6>
             <div className="form-container">
             
            <div className="image-holder"></div>
            <form method="post" onSubmit={this.handleSubmit}>
                <h2 className="text-center"><strong>Create</strong> an account.</h2>
                <div className="form-group"><input className="form-control" value={this.state.email} onChange={this.handleChange}
                type="email" name="email" placeholder="Email"/></div>
                <div className="form-group"><input className="form-control" value={this.state.password} onChange={this.handleChange} type="password" name="password" placeholder="Password"/></div>
                <div className="form-group"><input className="form-control" value={this.state.name} onChange={this.handleChange} type="text" name="name" placeholder="Name"/></div>
                <div className="form-group"><input className="form-control" value={this.state.Mobile_no} onChange={this.handleChange} type="text" name="Mobile_no" placeholder="Mobile No."/></div>
                <div className="form-group">
                    <div className="form-check"><label className="form-check-label"><input className="form-check-input" type="checkbox"/>I agree to the license terms.</label></div>
                </div>
                <div className="form-group"><button className="btn btn-primary btn-block" type="submit">Sign Up</button></div><a className="already" href="/Login">You already have an account? Login here.</a></form>
        </div>
    </div>
    </React.Fragment>

        );

    }
}

export default Registration;