import React from 'react';
import './MyBooking.css';

class Card extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="col-lg-3 col-md-5 mb-3 mb-lg-3">
            
            <div className="card rounded shadow-mm border-1">
                <div className="card-body p-1">
                    <h6 className="small text-muted font-italic ml-3">Restaurant:{this.props.RT_Name}</h6>
                    	<h6 className="small text-muted font-italic ml-3">Booked BY:{this.props.Name}</h6>
                        <h6 className="small text-muted font-italic ml-3">Booked  Seats:{this.props.Seats}</h6>
                        <h6 className="small text-muted font-italic ml-3">Contact Number Given:{this.props.contact}</h6>
                        <h6 className="small text-muted font-italic ml-3">Time:{this.props.Time}</h6>
                        <h6 className="small text-muted font-italic ml-3">Email:{this.props.Email}</h6>
                </div>
            </div>
        </div>             
     
        );
    }
}

class MyBooking extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:null
        }
    }
    componentDidMount(){
        let doc=this;
        fetch('/MyBookings')
        .then(function(res){
            return res.json();
        }).then(function(res){
            console.log(res);
                doc.setState({data:res});
        })
    }
    render()
    {
        if(this.state.data){
        return (
            <div className="bootstrap_cards2">
            <div className="container py-5">
            <div className="row pb-5 mb-4">
                {
                    this.state.data.map(function(element,index){  
                        
                    return <Card RT_Name={element.Restaurants_name} Email={element.Email}  Seats={element.Seats} Time={element.Time} Name={element.Name} contact={element.Contact} key={index}/>
                    
                })
                }
            </div>    
            </div>     
            </div> 
            

        );
        }else
        return <h1>No Bookings</h1>
    }
}
export default MyBooking;