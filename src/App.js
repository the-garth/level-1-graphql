import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import "./App.css";
import Posts from "./Posts/Posts";
import Post from "./Posts/Post";
import NewPost from "./Posts/NewPost";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="App-header">
            <Link to="/">
              <h2>GraphQL is awesome</h2>
            </Link>
          </div>

          <main className="container">
            <Switch>
              <Route exact path="/" component={Posts} />
              <Route path="/post/new" component={NewPost} />
              <Route path="/post/:id" component={Post} />
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
