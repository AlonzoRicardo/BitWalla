// auth/Signup.js
import React, { Component } from 'react';
import AuthService from './AuthService'
import countries from './countries.min.json'

class Signup extends Component {
  constructor(props) {
    super(props);
    this.allCountries = Object.keys(countries)
    this.state = { username: '', password: '', phone: 0, country: '', city: ''};
    this.service = new AuthService();
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    const { phone, country, city } = this.state

    this.service.signup(username, password, phone, country, city)
      .then(response => {
        this.setState({
          username: "",
          password: "",
        });
        this.props.getUser(response.user)
      })
      .catch(error => console.log(error))
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value })
  }


  render() {
    return (
      <div className='loginForm'>
        <h3>Welcome!, create your account next:</h3>

        <form onSubmit={this.handleFormSubmit} className='signup'>


    <fieldset>
      <label>Country:</label>
      <select name="country" form='signup' value={this.state.country} onChange={e => this.handleChange(e)}>
        {
          this.allCountries.map((e,i) => <option key={i+e} value={e} >{e}</option>) 
        }
      </select>
    </fieldset>

    <fieldset>
      <label>City:</label>
      <select name="city" form='signup' value={this.state.city} onChange={e => this.handleChange(e)}>
        {
          this.state.country 
          ? 
          countries[this.state.country].map((e,i) =>  <option key={i+e} value={e} >{e}</option>)
          :
          console.log('err')
        }
      </select>
    </fieldset>

          <fieldset>
            <label>Username:</label>
            <input type="text" name="username" value={this.state.username} onChange={e => this.handleChange(e)} />
          </fieldset>

          <fieldset>
            <label>Password:</label>
            <input type="password" name="password" value={this.state.password} onChange={e => this.handleChange(e)} />
          </fieldset>

          <fieldset>
            <label>Phone:</label>
            <input type="text" name="phone" value={this.state.phone} onChange={e => this.handleChange(e)} />
          </fieldset>

          <input type="submit" value="Sign up" />
        </form>
      </div>
    )
  }
}

export default Signup;