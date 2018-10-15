import React from 'react';
import axios from 'axios'


class Wallet extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            balance: null,
            hidden: true
        }
    }

    getBalance = (id) => {
        axios.get(`https://blockchain.info/q/addressbalance/${id}`)
          .then((response) => this.setState({ balance: response.data }))
          .then(() => {console.log(this.state.balance)})
      }

    copyToClipboard = (id) => {
        let inputPk = document.getElementById(id);
        inputPk.focus()
        inputPk.select()
        document.execCommand('copy')
    };

    handleHidden() {
        this.setState({hidden: false})
    }
    
    componentDidMount(){
        this.getBalance(this.props.userInSession.wallet.public.publicKey)
    }

    render() {
        return (
            <div className='wallet'>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                <div className='walletBalance'>
                    <p>Balance: {this.state.balance}</p>
                    <p>Pending transactions: {this.state.balance}</p>                    
                </div>
                <hr/>
                <div>
                    <h1>PublicKey</h1>
                    <input id='copyPublic'  value={this.props.userInSession.wallet.public.publicKey} readOnly></input>
                    <br/>
                    <button onClick={e => this.copyToClipboard('copyPublic')} className='btn'><i className="fa fa-folder"></i> Copy</button>
                    <img src={this.props.userInSession.wallet.public.publicQR} alt="" />
                </div>
                <hr/>
                {   
                    this.state.hidden === true ? <button onClick={() => this.handleHidden()} className='btn'>Show Private Key</button>
                    :
                    <div>
                    <h1>PrivateKey</h1>
                    <input  value={this.props.userInSession.wallet.private.privateKey} id='copyPrivate' readOnly></input>
                    <br/>
                    <button onClick={e => this.copyToClipboard('copyPrivate')} className='btn'><i className="fa fa-folder"></i> Copy</button>
                    <img src={this.props.userInSession.wallet.private.privateQR} alt="" />
                    <hr/>
                    </div>
                }
                
            </div>
        )
    }
}

export default Wallet;