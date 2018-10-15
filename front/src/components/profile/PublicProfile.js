import React from 'react';
import Service from './Services'
import './profile.scss'
import { Link } from 'react-router-dom';

class PublicProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null,
            items: [],
        }
        this.username = props.match.params.username
        this.service = new Service()
        console.log(this.username);
    }

    getProfile () {
        this.service.getPublicProfile(this.username)
            .then((res) => {
                this.setState({ user: res })
            })
    }

     componentDidMount() {
       this.getProfile()
    }  
    

    render() {
        return (
            <div className='profileContent'>
                {/* <div>

                    <div className="container bootstrap-snippet header-container">
                        <div className="bg-white">
                            <div className="container py-5">
                                <div className="media col-md-10 col-lg-8 col-xl-7 p-0 my-4 mx-auto">
                                    <img src="https://image.flaticon.com/icons/png/512/559/559378.png" alt='' className="d-block ui-w-100 rounded-circle" />
                                    <div className="media-body ml-5">
                                        <h4 className="font-weight-bold mb-4">{this.props.userInSession.username}</h4>
                                        <div className="text-muted mb-4">
                                            {this.props.userInSession.location.city} <br /> {this.props.userInSession.location.country}
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <hr className="m-0" />
                            <ul className="nav nav-tabs tabs-alt justify-content-center">
                                <li className="nav-item">
                                    <Link to='#' className='nav-link py-4'>Rating: 5/5</Link>
                                </li>

                                <li className="nav-item">
                                    <Link to='#' className='nav-link py-4'>Sold: 1</Link>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div> */}



                <div className='profileItems'>
                    {
                        this.state.items.length === 0 ? <h1>NO ITEMS YET</h1>
                            :
                            <div className='card items'>
                                {
                                    this.state.items.map((e, i) => {
                                        return (
                                            <div key={i} id={e._id}>
                                                <div>
                                                    <img className="card-img-top" src={`${e.photo}`} alt="" />

                                                    <button type="button" value={e._id} className="close" style={{ color: 'red' }} aria-label="Close" onClick={(k) => this.handleDelete(k)}>
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <p>{e.productName}</p>
                                                <p>{e.productDescription}</p>
                                                <p>{e.productPrice}</p>
                                                <hr />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                    }
                </div>
            </div>
        );
    }
}

export default PublicProfile;