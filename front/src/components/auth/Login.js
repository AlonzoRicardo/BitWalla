// auth/Signup.js
import React, { Component } from 'react';
import AuthService from './AuthService'
import { Redirect } from 'react-router-dom';
import './auth.scss'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '', redirect: false, error: true};
    this.service = new AuthService();
  }


  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    this.service.login(username, password)
      .then(response => {
        this.setState({
          username: username,
          password: password,
          error: false
        });

        this.props.getUser(response)
      })
      .catch(error => {
        this.setState({
          username: username,
          password: password,
          error: true
        });
      })
  }


  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/main' />
    }
  }


  render() {
    return (<div className='loginForm'>
      <h3>Enter Your Credentials</h3>
      <form onSubmit={this.handleFormSubmit} className='signup'>
      {!this.state.error && this.renderRedirect()}

        <div className="form-group">
          <label >Username: </label>
          <input type="text" name="username" value={this.state.username} onChange={e => this.handleChange(e)} className="form-control"  aria-describedby="emailHelp" placeholder="Type your username" />
        </div>

        <div className="form-group">
          <label >Password: </label>
          <input type="password" name="password" value={this.state.password} onChange={e => this.handleChange(e)} className="form-control"  placeholder="Type your password" />
          <small id="emailHelp" className="form-text text-muted">We'll never share your password with anyone else.</small>
        </div>

        <input type="submit" className="btn btn-primary" value="Login" onClick={this.setRedirect}/>

      </form>

      <h1>{this.state.error ? 'Error' : ''}</h1>
    </div>)
  }
}

export default Login;