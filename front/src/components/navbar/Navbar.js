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
                        <Link to='/main'>
                            BitWalla
                        </Link>
                        <Link
                            to={`/profile/${this.state.loggedInUser.username}`}>{this.state.loggedInUser.username}
                        </Link>
                    </h2>

                    <div class="btn-group">
                        <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            +
                        </button>
                        <div class="dropdown-menu dropdown-menu-right">
                            <a href='/main' className='dropdown-item' onClick={this.handleLogout}>Logout</a>
                            <button class="dropdown-item" type="button">Action</button>
                            <button class="dropdown-item" type="button">Another action</button>
                            <button class="dropdown-item" type="button">Something else here</button>
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