import React from "react";
import {
  Route,
  BrowserRouter,
  Switch,
  Redirect,
  NavLink,
} from "react-router-dom";
import Home from "./components/layout/Home";
import Gallery from "./components/layout/Gallery";
import "./App.css";
import logo from "./assets/flickr-logo.png";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div className="App">
        <nav className="navbar navbar-light">
          <NavLink className="navbar-brand" to="/groups">
            <img
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt=""
            />
            Flickr
          </NavLink>
        </nav>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/groups" />} />
          <Route exact path="/groups" component={Home} />
          <Route exact path="/groups/:groupId" component={Gallery} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
