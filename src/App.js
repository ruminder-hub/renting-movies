import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Movies from "./components/movies";
import MovieForm from "./components/movieForm";
import Customers from "./components/customer";
import NotFound from "./components/notFound";
import Rentals from "./components/rentals";
import NavBar from "./components/common/navBar";

class App extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main role="main" className="container mt-2">
          <Switch>
            <Route path="/movies/:id" component={MovieForm} />
            <Route path="/movies" component={Movies}></Route>
            <Route path="/customers" component={Customers}></Route>
            <Route path="/rentals" component={Rentals}></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Route path="/" exact component={Movies}></Route>
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
