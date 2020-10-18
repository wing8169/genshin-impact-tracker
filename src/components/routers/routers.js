import React, { Component } from "react";
import { Route, Router, Switch } from "react-router-dom";
import { Map } from "../";
import { auth } from "../../services/firebase";
import { SignIn } from "../sign-in";
import { persistor } from "../../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { createBrowserHistory } from "history";
import { clearAuthDetails, setAuthDetails } from "../../redux/dispatchers";
import { connect } from "react-redux";

export const history = createBrowserHistory();

class Routers extends Component {
  componentDidMount() {
    auth().onAuthStateChanged((user) => {
      if (!user) {
        clearAuthDetails();
      } else setAuthDetails("", "", user.displayName, user.uid);
    });
  }

  render() {
    return (
      <Router history={history}>
        <PersistGate persistor={persistor}>
          <Switch>
            <Route exact path="/" component={Map} />
            <Route exact path="/signin" component={SignIn} />
          </Switch>
        </PersistGate>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({ id: state.authDetails.id });

export default connect(mapStateToProps)(Routers);
