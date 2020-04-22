import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './components/Login/Login.js';
import Restaurants from './components/Restaurants/Restaurants.js';
import Navbar from './components/Navigation/Navbar.js';
import SingleRestaurant from './components/SingleRestaurant/SingleRestaurant.js';
import * as serviceWorker from './serviceWorker';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Navbar/>
    <Router>
    <Switch>
          <Route exact path="/">
            <Restaurants />
          </Route>
          <Route exact path="/Login">
            <Login />
          </Route>
          <Route exact path="/restaurants/:id" render={(props)=> <SingleRestaurant {...props}/>}/>
            
          
        </Switch>
    </Router>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
