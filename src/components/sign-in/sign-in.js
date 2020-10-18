import React, { Component } from "react";
import { Link } from "react-router-dom";
import { signInWithGoogle } from "../../services/auth";
import { history } from "../routers/routers";
import { connect } from "react-redux";

class Login extends Component {
  constructor(props) {
    super(props);
    console.log("signin");
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
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>
            Login to
            <Link to="/">Genshin Impact Tracker</Link>
          </h1>
          <div>
            {this.state.error ? <p>{this.state.error}</p> : null}
            <button type="submit">Sign In With Google</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ id: state.authDetails.id });

export default connect(mapStateToProps)(Login);
