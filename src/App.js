import React, { Component } from "react";
import Movies from "./components/movies";

class App extends Component {
  state = {};
  render() {
    return (
      <main role="main" className="container mt-2">
        <Movies />
      </main>
    );
  }
}

export default App;
