import React, { Component } from "react";
import { signInWithGoogle } from "../../services/auth";
import { history } from "../routers/routers";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import genshinImg from "../../images/genshin-impact.png";
import { Helmet } from "react-helmet";

const styles = {
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflow: "hidden",
    paddingTop: "150px",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: 8,
  },
  submit: {
    margin: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  info: {
    position: "absolute",
    bottom: 20,
    marginLeft: "auto",
    marginRight: "auto",
    left: 0,
    right: 0,
    textAlign: "center",
  },
  bg: {
    width: "100vw",
    height: "100vh",
    position: "fixed",
    top: 0,
    left: 0,
    objectFit: "cover",
    zIndex: -1,
    margin: 0,
  },
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (!!this.props.id) history.push("/");
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ error: "" });
    try {
      await signInWithGoogle();
      history.push("/");
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  render() {
    return (
      <>
        <Helmet>
          <title>
            Genshin Impact Tracker | Track Your Resources and Study the Respawn
            Time
          </title>
          <meta
            name="description"
            content="Genshin Impact Tracker is a personal application to track and study the resources respawn time.
          This is a research-based project and requires data entry to study whether the respawn time of Genshin Impact is
          a complete RNG or there is a logic behind."
          />
        </Helmet>
        <img src={genshinImg} alt={"bg"} className={this.props.classes.bg} />
        <div className={this.props.classes.paper}>
          <Typography
            component="h1"
            variant="h5"
            align="center"
            style={{ marginBottom: 20 }}
          >
            Genshin Impact Tracker
          </Typography>
          <Typography variant="body2" color="textSecondary" align="center">
            A tool built to record respawn time of resources and <br />
            study whether there is a logic behind or it is simply RNG.
          </Typography>
          {this.state.error ? <p>{this.state.error}</p> : null}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={this.props.classes.submit}
            onClick={this.handleSubmit}
          >
            Google Sign In
          </Button>
        </div>
        <Typography
          className={this.props.classes.info}
          variant="body2"
          color="textSecondary"
          align="center"
        >
          GitHub:
          <Link
            href={
              "https://github.com/wing8169/genshin-impact-tracker/tree/master"
            }
            target="_blank"
          >
            wing8169/genshin-impact-tracker
          </Link>
        </Typography>
      </>
    );
  }
}

const mapStateToProps = (state) => ({ id: state.authDetails.id });

export default withStyles(styles)(connect(mapStateToProps)(Login));
