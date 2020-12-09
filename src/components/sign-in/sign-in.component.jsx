import React from "react";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { auth, signInWithGoogle } from "../../firebase/firebase.utils";

import "./../form-input/form-input.styles.scss";
import "./sign-in.styles.scss";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.state = {
      email: "",
      password: "",
      passvalue: "",
      disablePassword: true,
    };
  }

  handleOnFocusPassword = () => {
    this.textInput.current.focus();
    this.setState({
      disablePassword: false,
      passvalue: "abc",
    });
  };

  handleOnBlurPassword = () => {
    this.setState({
      disablePassword: true,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({ email: "", password: "" });
    } catch (error) {
      console.log(error);
    }
  };

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            name="email"
            type="email"
            handleChange={this.handleChange}
            value={this.state.email}
            label="email"
            required
          />
          <h1>Pass - {this.state.disablePassword.toString()}</h1>
          <div className="group">
            <input
              className="form-input"
              name="password"
              type="password"
              ref={this.textInput}
              readOnly={this.state.disablePassword}
              onFocus={this.handleOnFocusPassword}
              onBlur={this.handleOnBlurPassword}
              value={this.state.password}
              onChange={this.handleChange}
              label="password"
              required
            />

            {"Password" ? (
              <label
                className={`${
                  this.state.password.length ? "shrink" : ""
                } form-input-label`}
              >
                {"PasswordAsy"}
              </label>
            ) : null}
          </div>
          <div className="buttons">
            <CustomButton type="submit"> Sign in </CustomButton>
            <CustomButton
              type="button"
              onClick={signInWithGoogle}
              isGoogleSignIn
            >
              Sign in with Google
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
