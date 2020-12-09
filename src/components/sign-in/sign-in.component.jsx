import React from "react";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { auth, signInWithGoogle } from "../../firebase/firebase.utils";

import "./../form-input/form-input.styles.scss";
import "./sign-in.styles.scss";

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.passwordInput = React.createRef();
    this.state = {
      email: "",
      password: "",
      disablePassword: true,
    };
  }

  handleOnFocusPassword = (target) => {
    this.setState({
      disablePassword: false,
    });
    target.setSelectionRange(0, 9999);
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

          <div className="group">
            <input
              className="form-input"
              name="password"
              type="password"
              ref={this.passwordInput}
              readOnly={this.state.disablePassword}
              onFocus={(event) => {
                const target = event.target;
                setTimeout(() => {
                  this.setState({
                    disablePassword: false,
                  });
                  target.setSelectionRange(0, 9999);
                }, 0);
              }}
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
                {"PasswordAsync12"}
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
