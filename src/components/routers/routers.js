import React, { Component } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import { Map } from "../";
import { auth } from "../../services/firebase";
import { SignIn } from "../sign-in";
import { persistor } from "../../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { clearAuthDetails, setAuthDetails } from "../../redux/dispatchers";
import { connect } from "react-redux";
import { ExperienceCalculator } from "../experience-calculator";

function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/signin", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

function PublicRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === false ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}

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
      <Router>
        <PersistGate persistor={persistor}>
          <Switch>
            <PrivateRoute
              exact
              path="/"
              component={Map}
              authenticated={!!this.props.id}
            />
            <Route exact path="/experience" component={ExperienceCalculator} />
            <PublicRoute
              exact
              path="/signin"
              component={SignIn}
              authenticated={!!this.props.id}
            />
          </Switch>
        </PersistGate>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({ id: state.authDetails.id });

export default connect(mapStateToProps)(Routers);
