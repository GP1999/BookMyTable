import React from 'react';
import {useParams} from 'react-router-dom';
import './SingleRestaurant.css';
class SingleRestaurant extends React.Component{
    constructor(props)
    {
        super(props);
        this.state={
            restaurants_name:this.props.match.params.id,
            data:"",
            email:"",
            AM_PM:"",
            seats:"",
            contact:"",
            time:"",
            name:"",
            message:""


        }
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleChange=this.handleChange.bind(this);
    }
    componentDidMount()
    {
        let doc=this;
        
    
        fetch('/restaurants/'+this.props.match.params.id)
        .then(function(res){
            return res.json();
        }).then(function(res){
           doc.setState({
               data:res
           });       
        })
    }
    handleChange(event)
    {
        this.setState({
            [event.target.name]:event.target.value
        })
    }
    handleSubmit(event){
        event.preventDefault();
        let doc=this;
        let data={email:this.state.email,AM_PM:this.state.AM_PM,contact:this.state.contact,
            name:this.state.name,seats:this.state.seats,time:this.state.time,restaurants_name:this.state.restaurants_name};
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        if(this.state.email&&this.state.AM_PM&&this.state.contact&&this.state.name&&this.state.seats&&this.state.time)
      {
        fetch('/restaurants/Book',requestOptions)
        .then(function(res){
            if(res.status===200)
            {
                doc.setState({message:"Booked successfully "});

            }else
            {
                doc.setState({message:"Error! Something is wrong"});
            }
        });
    }else
    {
        doc.setState({message:"Enter missing field"});
    }
       

    }
   
    render()
    {
        if(this.state.data){
        return(
            <React.Fragment>
            <section>

                        <h3 className="text-center ">{this.state.data.Name}</h3>
                            <div className="carousal_container">
                                <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                    <img className="d-block w-100 imgsize" src={"http://127.0.0.1:9000/"+this.state.data.ImgPath[0]} alt="First slide"/>
                    </div>
                    <div className="carousel-item">
                    <img className="d-block w-100 imgsize" src={"http://127.0.0.1:9000/"+this.state.data.ImgPath[1]} alt="Second slide"/>
                    </div>
                    <div className="carousel-item">
                    <img className="d-block w-100 imgsize " src={"http://127.0.0.1:9000/"+this.state.data.ImgPath[2]} alt="Third slide"/>
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
                </div>
                </div>
                 <div className="information">
                <h5>Address:{this.state.data.Address}</h5>
                <h5>Email:{this.state.data.Email}</h5>
                <h5>Available Seats:{this.state.data.Seats}</h5>
                <h5>Contact:{this.state.data.Contact}</h5>
                 </div>
                </section>
               <section className="form_container">
                  <h6 className="text-center text-success">{this.state.message}</h6>
                   <h4>Booking Details</h4>
                   <form onSubmit={this.handleSubmit}>
                <div className="form-row">
                    <div className="form-group col-md-6">
                    <label htmlFor="inputEmail4">Email</label>
                    <input type="email" className="form-control" id="inputEmail4" placeholder="Email" value={this.state.email} onChange={this.handleChange} name="email"/>
                    </div>
                    <div className="form-group col-md-6">
                    <label htmlFor="Name">Name</label>
                    <input type="text" className="form-control" id="inputPassword4" placeholder="Name" name="name" value={this.state.name} onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="contact">Contact</label>
                    <input type="text" className="form-control" id="inputAddress" placeholder="contact" name="contact" value={this.state.contact} onChange={this.handleChange}/>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                    <label htmlFor="seats">Seats</label>
                    <input type="text" className="form-control" id="inputCity" name="seats" value={this.state.seats} onChange={this.handleChange}/>
                    </div>
                    <div className="form-group col-md-4">
                    <label htmlFor="inputState">time</label>
                    <select id="inputState" className="form-control" value={this.state.time} name="time" onChange={this.handleChange}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                    </select>
                    </div>
                    <div className="form-group col-md-4">
                    <label htmlFor="inputState">AM/PM</label>
                    <select id="inputState2" className="form-control" name="AM_PM" value={this.state.AM_PM} onChange={this.handleChange}>
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                       
                    </select>
                    </div>
                    
                </div>
                <button type="submit" className="btn btn-primary">Book</button>
                </form>
            </section>
       </React.Fragment>
          
        );
        }else
        return <h1>Sorry for inconvinience</h1>

    }
}
 export default SingleRestaurant;