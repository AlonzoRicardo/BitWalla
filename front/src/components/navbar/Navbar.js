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
                    <h2>Welcome, <Link to={`/profile/${this.state.loggedInUser.username}`}>{this.state.loggedInUser.username}</Link></h2>
                    <Link to='/profile/new'>+</Link>
                    <a onClick={this.handleLogout}>Logout</a>
                </nav>
            )
        } else {
            return (
                <div>
                    <nav className="navbar navbar-dark bg-dark">
                        <h2>BitWalla</h2>
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