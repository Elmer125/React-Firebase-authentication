import React from 'react';
import { withRouter } from 'react-router-dom';
import compose from 'recompose/compose';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { Component } from 'react/cjs/react.production.min';
import { google, Facebook } from '../Firebase/firebase';

const SignInPage = () => (
  <div>
    <h1>SignIn</h1>
    <SignUpLink />
    <SignInForm />
    <PasswordForgetLink />
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email, password } = this.state;
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch((error) => {
        this.setState({ error });
      });
    event.preventDefault();
  };
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onGoogle = (e) => {
    e.preventDefault();
    this.props.firebase
      .doSignInWithPopup(google)
      .then(() => {
        this.props.history.push(ROUTES.HOME);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  onFacebook = (e) => {
    e.preventDefault();
    this.props.firebase
      .doSignInWithPopup(Facebook)
      .then(() => {
        this.props.history.push(ROUTES.HOME);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';
    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>

        {error && <p>{error.message}</p>}

        <button onClick={this.onGoogle}>Sign In with google</button>
        <button onClick={this.onFacebook}>Sign In With Facebook</button>
      </form>
    );
  }
}

const SignInForm = compose(withRouter, withFirebase)(SignInFormBase);

export default SignInPage;

export { SignInForm };
