import React from 'react';
import './Navbar.css';
import { useHistory } from "react-router-dom";
  

class Navbar extends React.Component{
    constructor(props){
        super(props);
        this.state={
            Authenticate:false
        }
       // this.handleClick=this.handleClick.bind(this);

    }
    componentDidMount(){
        let doc=this;
        fetch('/Authenticate')
        .then(function(res){
         
            
            if(res.status===200)
            doc.setState({Authenticate:true});
            else
            doc.setState({Authenticate:false});
        });
        
    }
    AuthenticateOrNot(){
       
            if(this.state.Authenticate)
            return <span></span>;
            else
            return <span className="navbar-text actions"> <a className="login" href="/Login" >Log In</a><a className="btn btn-light action-button" role="button" href="/register">Sign Up</a></span>;
    
       
    }

    render(){
        return(
           
        <nav className="navbar navbar-dark navbar-expand-sm p-0 navigation-clean-button">
        <div className="container"><a className="navbar-brand" href="#">BookMyTable</a><button data-toggle="collapse" className="navbar-toggler" data-target="#navcol-1"><span className="sr-only">Toggle navigation</span><span className="navbar-toggler-icon"></span></button>
            <div className="collapse navbar-collapse"
                id="navcol-1">
                <ul className="nav navbar-nav mr-auto">
                    <li className="nav-item" role="presentation"><a className="nav-link" href="/" >Home</a></li>
                    <li className="nav-item" role="presentation"><a className="nav-link" href="About/">About</a></li>
                    <li className="nav-item dropdown"><a className="dropdown-toggle nav-link" data-toggle="dropdown" aria-expanded="false" href="#">Account</a>
                        <div className="dropdown-menu" role="menu"><a className="dropdown-item" role="presentation" href="#">Profile</a><a className="dropdown-item" role="presentation" href="#">My Booking</a></div>
                    </li>
                   
        </ul>{this.AuthenticateOrNot()}</div>
        </div>
    </nav>
    
        );
    
    }
}

export default Navbar;