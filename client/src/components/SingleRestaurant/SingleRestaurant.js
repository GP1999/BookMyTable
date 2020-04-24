import React from 'react';
import {useParams} from 'react-router-dom';
import './SingleRestaurant.css';
class SingleRestaurant extends React.Component{
    constructor(props)
    {
        super(props);
        this.state={
            data:""
        }
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
    render()
    {
        if(this.state.data){
        return(
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

          
        );
        }else
        return <h1>Sorry for inconvinience</h1>

    }
}
 export default SingleRestaurant;