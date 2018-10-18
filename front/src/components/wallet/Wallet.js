import React from 'react';
import axios from 'axios'


class Wallet extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pending: null,
            balance: null,
            unconfirmedBalance: null,
            confirmedTransactions: null,
            hidden: true
        }
        this.wallet = this.props.walletInfo;
    }

    getBalance = (id) => {
        axios.get(`https://api.blockcypher.com/v1/btc/test3/addrs/${id}`)
            .then((response) => {
                console.log(response.data);
                this.setState({
                    balance: response.data.balance,
                    pending: response.data.unconfirmed_n_tx,
                    unconfirmedBalance: response.data.unconfirmed_balance,
                    confirmedTransactions: response.data.n_tx
                })
            })
            .then(() => { console.log(this.state.balance) })
    }

    copyToClipboard = (id) => {
        let inputPk = document.getElementById(id);
        inputPk.focus()
        inputPk.select()
        document.execCommand('copy')
    };

    handleHidden() {
        this.setState({ hidden: false })
    }

    render() {
        return (
            <div className='wallet'>
                <button onClick={() => this.getBalance(this.props.userInSession.wallet.public.publicKey)} className='btn'>Request Balance</button>
                <hr/>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                <div className='walletBalance'>
                    <p>Balance: {this.state.balance}</p>
                    <p>Pending: {this.state.pending}</p>
                </div>
                <div className='walletBalance'>
                    <p>Unconfirmed: {this.state.unconfirmedBalance}</p>
                    <p>Confirmed Transactions: {this.state.confirmedTransactions}</p>
                </div>
                <hr />
                <div>
                    <h1>PublicKey</h1>
                    <input id='copyPublic' value={this.props.userInSession.wallet.public.publicKey} readOnly></input>
                    <br />
                    <button onClick={e => this.copyToClipboard('copyPublic')} className='btn'><i className="fa fa-folder"></i> Copy</button>
                    <img src={this.props.userInSession.wallet.public.publicQR} alt="" />
                </div>
                <hr />
                {
                    this.state.hidden === true ? <button onClick={() => this.handleHidden()} className='btn'>Show Private Key</button>
                        :
                        <div>
                            <h1>PrivateKey</h1>
                            <input value={this.props.userInSession.wallet.private.privateKey} id='copyPrivate' readOnly></input>
                            <br />
                            <button onClick={e => this.copyToClipboard('copyPrivate')} className='btn'><i className="fa fa-folder"></i> Copy</button>
                            <img src={this.props.userInSession.wallet.private.privateQR} alt="" />
                            <hr />
                        </div>
                }
            </div>
        )
    }
}

export default Wallet;