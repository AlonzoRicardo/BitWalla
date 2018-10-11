import React, { Component } from 'react';
import './App.scss';
import { Switch, Route } from 'react-router-dom';
// import ProjectList from './components/projects/ProjectList';
import Navbar from './components/navbar/Navbar';
// import ProjectDetails from './components/projects/ProjectDetails';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import AuthService from './components/auth/AuthService';
import Profile from './components/profile/Profile'
import New from './components/profile/New'
import PhotoService from './components/profile/PhotoService'
import MainPage from './components/main/MainPage'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = { loggedInUser: null };
    this.service = new AuthService();
    this.photoService = new PhotoService()
  }


  getTheUser = (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }

  logout = () => {
    this.service.logout()
      .then(() => {
        this.setState({ loggedInUser: null });
      })
  }

  fetchUser() {
    if (this.state.loggedInUser === null) {
      this.service.loggedin()
        .then(response => {
          this.setState({
            loggedInUser: response
          })
        })
        .catch(err => {
          this.setState({
            loggedInUser: false
          })
        })
    }
  }

  render() {
    this.fetchUser()

    if (this.state.loggedInUser) {
      return (
        <div className="App">
          <Navbar userInSession={this.state.loggedInUser} logout={this.logout} />
          <Switch>
            <Route exact path={`/profile/new`} render={() => <New userInSession={this.state.loggedInUser} />} />

            <Route exact path={`/main`} render={() => <MainPage />} />

            <Route exact path={`/profile/${this.state.loggedInUser.username}`}
              render={() => <Profile
                userInSession={this.state.loggedInUser}
              />} />
          </Switch>
        </div>
      );
    } else {
      return (
        <div className="App">
          <Navbar userInSession={this.state.loggedInUser} logout={this.logout} />
          <header className="App-header">
            <Switch>
              <Route exact path={`/main`} render={() => <MainPage />} />
              <Route exact path='/signup' render={() => <Signup getUser={this.getTheUser} />} />
              <Route exact path='/login' render={() => <Login getUser={this.getTheUser} />} />
            </Switch>
          </header>
        </div>
      );
    }
  }
}

export default App;