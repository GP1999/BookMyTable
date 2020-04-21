import React from 'react';
import {useParams} from 'react-router-dom';
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
        
    
        fetch('/restaurants/')
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
        return(
          <h1>Inside Gaurav</h1>
        );

    }
}
 export default SingleRestaurant;