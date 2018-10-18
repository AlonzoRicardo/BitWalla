// auth/Signup.js
import React, { Component } from 'react';
import transactionService from './transactionService'
//import { Redirect } from 'react-router-dom';
import axios from 'axios';
import './transactions.scss'

class Transaction extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      from:'',
      to: 'mtvDPivxzaQjGe4dNCfiZz1z4hW87sabjJ',
      amount: 0,
      balance: null,
      fees: 0,
      redirect: false,
      error: true,
      blockInfo: false
    };
    this.transaction = transactionService;
  }

  sendTransaction = (e) => {
    e.preventDefault();
    let { from, to, amount, balance, fees } = this.state;
    this.transaction(
      from, to, amount,
      this.props.userInSession.wallet.private.privateKey,
      balance,
      fees
    ).then((response) => {
      this.setState({
        blockInfo: `https://testnet.blockchain.info/tx/${response.tx.hash}`
      })
    })
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  componentDidMount() {
    this.setState({ from: this.props.userInSession.wallet.public.publicKey })
  }

  getBalance = (id) => {
    axios.get(`https://api.blockcypher.com/v1/btc/test3/addrs/${id}`)
      .then((response) => {
        this.setState({ 
          balance: response.data.balance
        })
      })
  }

render() {
  let { balance, from, to, amount, fees, blockInfo } = this.state
  return (<div className='loginForm'>
    <h3>Build your transaction</h3>
    <form className='signup'>
      {/* !this.state.error && this.renderRedirect() */}
      {balance !== null ? <small>balance: {balance}</small>
      :
      <big className='requestBalance' onClick={() => this.getBalance(this.props.userInSession.wallet.public.publicKey)}>Request Balance</big>
      }
      <div className="form-group">
        <label >From: </label>
        <input type="text" name="from" value={from} onChange={e => this.handleChange(e)} className="form-control" aria-describedby="emailHelp" placeholder="Enter your address" />
        <small id="emailHelp" className="form-text text-muted">This is your public address</small>
      </div>

      <div className="form-group">
        <label >To: </label>
        <input type="text" name="to" value={to} onChange={e => this.handleChange(e)} className="form-control" placeholder="Enter receiver address" />
        <small id="emailHelp" className="form-text text-muted">Receiver</small>
      </div>

      <div className="form-group">
        <label >Amount: </label>
        <input type="text" name="amount" value={amount} onChange={e => this.handleChange(e)} className="form-control" placeholder="enter amount" />
        <small id="emailHelp" className="form-text text-muted">Amount you want to send</small>
      </div>

      <div className="form-group">
        <label >Miner Fees: </label>
        <input type="text" name="fees" value={fees} onChange={e => this.handleChange(e)} className="form-control" placeholder="Enter Miner fees" />
        <small id="" className="form-text text-muted">The higher, the faster.</small>
      </div>

      <button type="button" className="btn btn-primary" onClick={(e) => this.sendTransaction(e)} > Send </button>

    </form>
    {blockInfo && <a href={blockInfo}>See in block explorer</a>}
  </div>)
 }
}

export default Transaction;