// auth/Signup.js
import React, { Component } from 'react';
import transactionService from './transactionService'
//import { Redirect } from 'react-router-dom';
import axios from 'axios';

class Transaction extends Component {
  constructor(props) {
    super(props);
    this.state = { from:'', to: 'mtvDPivxzaQjGe4dNCfiZz1z4hW87sabjJ', amount: 0, balance: 0, fees: 0, redirect: false, error: true };
    this.transaction = transactionService;
  }

  sendTransaction = () => {
    let { from, to, amount, balance, fees } = this.state;
    this.transaction(
      from, to, amount,
      this.props.userInSession.wallet.private.privateKey,
      balance,
      fees
    )
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  componentDidMount() {
    this.setState({ from: this.props.userInSession.wallet.public.publicKey })
    //this.getFoucet()
    this.getBalance(this.props.userInSession.wallet.public.publicKey);
  }

  getBalance = (id) => {
    axios.get(`https://api.blockcypher.com/v1/btc/test3/addrs/${id}`)
      .then((response) => {
        this.setState({
          balance: response.data.balance
        })
      })
  }

  /* setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/wallet' />
    }
  } */



render() {
  return (<div className='loginForm'>
    <h3>Build your transaction</h3>
    <form className='signup'>
      {/* !this.state.error && this.renderRedirect() */}
      <small>balance: {this.state.balance}</small>

      <div className="form-group">
        <label >From: </label>
        <input type="text" name="from" value={this.state.from} onChange={e => this.handleChange(e)} className="form-control" aria-describedby="emailHelp" placeholder="Enter your address" />
        <small id="emailHelp" className="form-text text-muted">This is your public address</small>
      </div>

      <div className="form-group">
        <label >To: </label>
        <input type="text" name="to" value={this.state.to} onChange={e => this.handleChange(e)} className="form-control" placeholder="Enter receiver address" />
        <small id="emailHelp" className="form-text text-muted">Receiver</small>
      </div>

      <div className="form-group">
        <label >Amount: </label>
        <input type="text" name="amount" value={this.state.amount} onChange={e => this.handleChange(e)} className="form-control" placeholder="enter amount" />
        <small id="emailHelp" className="form-text text-muted">Amount you want to send</small>
      </div>

      <div className="form-group">
        <label >Miner Fees: </label>
        <input type="text" name="fees" value={this.state.fees} onChange={e => this.handleChange(e)} className="form-control" placeholder="Enter Miner fees" />
        <small id="" className="form-text text-muted">The higher, the faster.</small>
      </div>


      <input type="input" className="btn btn-primary" onClick={() => this.sendTransaction()} />

    </form>

    {/* <h1>{this.state.error ? 'Error' : ''}</h1> */}
  </div>)
}
}

export default Transaction;

///* onClick={this.setRedirect} */

//onSubmit={this.handleFormSubmit}

/* axios.post('https://api.blockcypher.com/v1/bcy/test/faucet?token=$cf49d1cf3d234efc86aff156c947a0d5', JSON.stringify(data))
    .then(function (d) { console.log(d) }); */

    /* getFoucet() {
  var data = { "address": "CDCTV4vNnW6RtPGFgtRx9bodZhxsfHD9UM", "amount": 100000 }
  console.log(data);
     axios.post('https://api.blockcypher.com/v1/bcy/test/addrs')
    .then((response) => {console.log(response)}) 
} */