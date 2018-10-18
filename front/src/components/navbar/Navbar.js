import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../auth/AuthService';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = { loggedInUser: null };
        this.service = new AuthService();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ ...this.state, loggedInUser: nextProps["userInSession"] })
    }

    handleLogout = (e) => {
        this.props.logout()
    }

    render() {
        if (this.state.loggedInUser) {
            return (

                <nav className="navbar navbar-dark bg-dark">
                    <h2 className='brand'>
                        <Link style={{ textDecoration: 'none' }} to='/main'>
                            BitWalla
                        </Link>
                    <br/>
                    <p className='btcPrice'> BTC/EUR {this.props.btcPrice}</p>
                    </h2>
                    
                    <div className="btn-group">
                        <button type="button" className="btn btn-primary dropdown-toggle downArrow" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        </button>
                        <div className="dropdown-menu dropdown-menu-right">
                            <Link to={`/profile/${this.state.loggedInUser.username}`}><button className="dropdown-item" type="button">Profile</button></Link>
                            <Link to={`/wallet/info`}><button className="dropdown-item" type="button">Wallet</button></Link>
                            <Link to='/profile/new'><button className="dropdown-item" type="button">Add Product</button></Link>
                            <Link to='/private/chat/:id'><button className="dropdown-item" type="button">Inbox</button></Link>
                            <Link to='/transaction'><button className="dropdown-item" type="button">Transaction</button></Link>
                            <a href='/main' className='dropdown-item' onClick={this.handleLogout}>Logout</a>
                        <img width='50' style={{float: 'right'}} src="https://static.cryptorival.com/imgs/coins/LSK.svg" alt=""/>
                        </div>
                    </div>

                    {/* <a href='/main' onClick={this.handleLogout}>Logout</a> */}
                </nav>
            )
        } else {
            return (
                <div>
                    <nav className="navbar navbar-dark bg-dark">
                        <h2 className='brand'>BitWalla</h2>
                        <div className='NavbarNewGhest'>
                            <Link to='/signup'>Signup</Link>
                            <Link to='/login'>Login</Link>
                        </div>
                    </nav>
                </div>
            )
        }
    }
}

export default Navbar;