import React, {Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, FormGroup, FormControl, Grid, Row, Col } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap';

import Home from './Home';
import TopRated from './TopRated';
import MovieDetails from './MovieDetails';
import NowPlaying from './NowPlaying';
import Upcoming from './Upcoming';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    id: ""
    }
   
  
  }

 render(){
  return (
<div className="App">
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="/"><i class="fas fa-film"></i> MOVIES</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarColor02">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="/">Popular
          <span class="sr-only">(current)</span>
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/now_playing">Now Playing</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/top_rated">Top Rated</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/upcoming">Upcoming</a>
      </li>
      
    </ul>
    {/* <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="text" placeholder="Search"></input>
      <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
    </form> */}
  </div>
</nav>
{/* <Navbar>
 
 <Navbar.Brand>
 DB Movies
 </Navbar.Brand>

</Navbar> */}
<BrowserRouter>

 <Switch>
<Route exact path ="/" render={()=>( <Home/> )} />
<Route path= "/now_playing" render={()=>(<NowPlaying/>)} />
<Route path= "/top_rated" render={()=>(<TopRated/>)} />
<Route path= "/upcoming" render={()=>(<Upcoming/>)} />
<Route path = "/:id" render={(props)=>(<MovieDetails id={props.match.params.id}/>)} />

</Switch>
 </BrowserRouter>
<footer>
  <p class="author">Made by <a href="https://bakyt-resume.online/"><i class="fab fa-bootstrap"></i><i class="fab fa-korvue"></i></a></p>
</footer>
 
</div>
  );
          
}

}
export default App;
