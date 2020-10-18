import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./service-worker";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Routers } from "./components/routers";

const THEME = createMuiTheme({
  typography: {
    fontFamily: ["Axiforma", "Roboto", "Helvetica", "Arial", "sans-serif"].join(
      ","
    ),
  },
});

ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={THEME}>
      <Provider store={store}>
        <Routers />
      </Provider>
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about services workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
