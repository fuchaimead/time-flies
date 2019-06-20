import Account from "./pages/flights/account";
import FetchUser from "./fetchUser";
import Flash from "./flash";
import Form from "./pages/flights/form";
import Homepage from "./pages/flights/homepage";
import Login from "./register/login";
import NavBar from "./navbar";
import NoMatch from "./noMatch";
import ProtectedRoute from "./protectedRoute";
import Register from "./register/register";
import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="background">
        <FetchUser>
        <NavBar/>
        <Flash/>
          <Switch>
            <ProtectedRoute exact path="/" component={Homepage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/new" component={Form} />
            <Route exact path="/:id/edit" component={Form} />
            <Route exact path="/account" component={Account} />
            <Route component={NoMatch} />
          </Switch>
        </FetchUser>
      </div>
    );
  }
}

export default App;
