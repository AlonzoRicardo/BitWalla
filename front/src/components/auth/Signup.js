// auth/Signup.js
import React, { Component } from 'react';
import AuthService from './AuthService'
import countries from './countries.min.json'
import { Redirect } from 'react-router-dom';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.allCountries = Object.keys(countries)
    this.state = { username: '', password: '', phone: 0, country: '', city: '', redirect: false, error: true};
    this.service = new AuthService();
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    const { phone, country, city} = this.state

    this.service.signup(username, password, phone, country, city)
      .then(response => {
        this.setState({
          username: "",
          password: "",
          error: false
        });
        this.props.getUser(response.user)
      })
      .catch(error => {
        console.log(error) 
      })
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value })
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
    return (
      <div className='container loginForm'>
        {!this.state.error && this.renderRedirect()}
        <h3>Welcome!, we have already created a new wallet for you</h3>
        <small className="form-text text-muted">We'll never share your credentials with anyone else.</small>

        <form onSubmit={this.handleFormSubmit} className='signup'>

          <div className="form-group">
            <label >Country</label>
            <select className="form-control" name="country" form='signup' value={this.state.country} onChange={e => this.handleChange(e)}>
              {
                this.allCountries.map((e, i) => <option key={i + e} value={e} >{e}</option>)
              }
            </select>
          </div>

          <div className="form-group">
            <label >City</label>
            <select className="form-control" name="city" form='signup' value={this.state.city} onChange={e => this.handleChange(e)}>
              {
                this.state.country
                  ?
                  countries[this.state.country].map((e, i) => <option key={i + e} value={e} >{e}</option>)
                  :
                  console.log('err')
              }
            </select>
          </div>

          <div className="form-group">
            <label >Username</label>
            <input type="text" name='username' className="form-control"  placeholder="Username" value={this.state.username} onChange={e => this.handleChange(e)} />
          </div>

          <div className="form-group">
            <label >Password</label>
            <input type="password" name='password' className="form-control" placeholder="Password" value={this.state.password} onChange={e => this.handleChange(e)} />
          </div>

          <div className="form-group">
            <label >Phone Number</label>
            <input type="text" name='phone' className="form-control" placeholder="Phone" value={this.state.phone} onChange={e => this.handleChange(e)} />
          </div>

          <input type="submit" className="btn btn-primary" value="Sign up" onClick={this.setRedirect}/>
        </form>
      </div>
    )
  }
}

export default Signup;