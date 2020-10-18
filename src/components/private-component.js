import React from "react";
import { history } from "./routers/routers";
import { store } from "../redux/store";

function PrivateComponent(WrappedComponent) {
  return class extends React.Component {
    checkToken() {
      const { id } = store.getState().authDetails;

      if (!id) {
        history.push("/signin");
      }
    }

    componentWillMount() {
      // check for token, if no token redirect user to login
      this.checkToken();
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}

export default PrivateComponent;
