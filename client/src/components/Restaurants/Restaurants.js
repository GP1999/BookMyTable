import React from 'react';
import './Restaurants.css';
import Login from '../Login/Login';

class Card extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
        
        <div className="col-lg-3 col-md-5 mb-3 mb-lg-3">
            
            <div className="card rounded shadow-mm border-1">
                <div className="card-body p-1"><img src={"http://127.0.0.1:9000/"+this.props.ImgPath[0]} alt="" className="img-fluid d-block mx-auto mb-3"/>
        <h5   className="card-title text-dark text-center"> <a href={"restaurants/"+this.props.Name} className="card-title text-dark text-center ">{this.props.Name}</a></h5>
                       
                    	<h6 className="small text-muted font-italic ml-3">Address:{this.props.Address}</h6>
                        <h6 className="small text-muted font-italic ml-3">Available Seats:{this.props.Seats}</h6>
                </div>
            </div>
        </div>             
     
   
      
        );

    }
}

class Restaurants extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:""
        }
    }
    componentDidMount(){
        let doc=this;
       fetch('/restaurants/')
       .then(function(res){
           return res.json();
       })
       .then(function(res){
           doc.setState({data:res});
       });
    }
    render(){
       
        if(this.state.data){
        return (
            <div className="bootstrap_cards2">
            <div className="container py-5">
            <div className="row pb-5 mb-4">
                {
                    this.state.data.map(function(element,index){  
                        
                    return <Card Name={element.Name} ImgPath={element.ImgPath} Seats={element.Seats} Address={element.Address} key={index}/>
                    
                })
                }
            </div>    
            </div>     
            </div>          
        );
            }
            else{
                return  <h1></h1>;
                
            }
    }




  
}



export default Restaurants;