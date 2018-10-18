import React, { Component } from 'react';
import axios from 'axios'
import './App.scss';
import { Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import AuthService from './components/auth/AuthService';
import Profile from './components/profile/Profile'
import New from './components/profile/New'
import PhotoService from './components/profile/Services'
import MainPage from './components/main/MainPage'
import ProductDetail from './components/main/ProductDetail'
import DetailsService from './components/main/DetailsService'
import ChatRoom from './components/chat/ChatRoom'
import Wallet from './components/wallet/Wallet'
import PublicProfile from './components/profile/PublicProfile'
import Transaction from './components/transactions/transaction'


class App extends Component {

  constructor(props) {
    super(props)
    this.state = { loggedInUser: null, items: null, detail: null, btc_usd: null, redirect: false };
    this.service = new AuthService();
    this.photoService = new PhotoService();
    this.DetailsService = new DetailsService();
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

  componentDidMount() {
    this.photoService.getAllProducts()
      .then((res) => {
        this.setState({ items: res });
      })
    this.getBitcoinPrice()
    setInterval(() => {
      this.getBitcoinPrice()
    }, 5000000)

    this.setRedirect()
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

  getBitcoinPrice = () => {
    axios.get('https://api.coinmarketcap.com/v2/ticker/1/?convert=EUR')
      .then((response) => this.setState({ btc_usd: Math.round(response.data.data.quotes.EUR.price) }))
      .then(() => { console.log(this.state.btc_usd) })
  }


  render() {
    this.fetchUser()
    if (this.state.loggedInUser) {
      return (

        <div className="App">
          {/* this.state.redirect && this.renderRedirect() */}
          <Navbar userInSession={this.state.loggedInUser} btcPrice={this.state.btc_usd} logout={this.logout} />

          <Switch>
            <Route exact path='/' render={() => <MainPage items={this.state.items} btcPrice={this.state.btc_usd} />} />

            <Route path={`/public/profile/:username`} component={PublicProfile} />

            <Route exact path={`/wallet/info`} render={() => <Wallet userInSession={this.state.loggedInUser} />} />

            <Route exact path={`/profile/new`} render={() => <New userInSession={this.state.loggedInUser} />} />

            <Route exact path={`/transaction`} render={() => <Transaction userInSession={this.state.loggedInUser} />} />

            <Route exact path={`/main`} render={() => <MainPage items={this.state.items} btcPrice={this.state.btc_usd} />} />

            <Route path={'/product/id/:id'} component={ProductDetail} />

            <Route exact path={`/profile/${this.state.loggedInUser.username}`}
              render={() => <Profile
                userInSession={this.state.loggedInUser}
              />} />

            <Route exact path={`/private/chat/:id`} render={(props) => <ChatRoom userInSession={this.state.loggedInUser} msgTo={props} />} />
          </Switch>

        </div>
      );
    } else {
      return (
        <div className="App">
          {/* this.state.redirect && this.renderRedirect() */}
          <Navbar userInSession={this.state.loggedInUser} logout={this.logout} />
          <header className="App-header">
            <Switch>
              <Route exact path='/' render={() => <MainPage items={this.state.items} btcPrice={this.state.btc_usd} />} />
              <Route exact path='/main' render={() => <MainPage items={this.state.items} />} />
              <Route exact path='/signup' render={() => <Signup getUser={this.getTheUser} />} />
              <Route path={'/product/id/:id'} component={ProductDetail} />
              <Route exact path='/login' render={(props) => <Login getUser={this.getTheUser} getProps={props} />} />
            </Switch>
          </header>
        </div>
      );
    }
  }
}

export default App;