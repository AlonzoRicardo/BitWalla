import React from 'react';
import PhotoService from './PhotoService'
import './profile.scss'
import { Link } from 'react-router-dom';
class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: []
        }
        this.photoService = new PhotoService()
    }

    componentDidMount() {
        this.photoService.getProfileProducts(this.props.userInSession.username)
            .then((res) => {
                this.setState({ items: res.items })
                console.log(this.state.items);
                console.log(this.props.userInSession.location.city)
            })
    }

    render() {
        return (
            <div className='profileContent'>
                <div>
                    <div className="container bootstrap-snippet header-container">
                        <div className="bg-white">
                            <div className="container py-5">
                                <div className="media col-md-10 col-lg-8 col-xl-7 p-0 my-4 mx-auto">
                                    <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt='' className="d-block ui-w-100 rounded-circle" />
                                    <div className="media-body ml-5">
                                        <h4 className="font-weight-bold mb-4">{this.props.userInSession.username}</h4>
                                        <div className="text-muted mb-4">
                                        {this.props.userInSession.location.city} <br/> {this.props.userInSession.location.country}
                                         </div>
                                       
                                    </div>
                                </div>
                            </div>
                            <hr className="m-0" />
                            <ul className="nav nav-tabs tabs-alt justify-content-center">
                                <li className="nav-item">
                                    <Link to='#' className='nav-link py-4'>Sold</Link>
                                </li>

                                <li className="nav-item">
                                    <Link to='#' className='nav-link py-4'>Selling</Link>
                                </li>

                                <li className="nav-item">
                                    <Link to='#' className='nav-link py-4'>Rating</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/*  <div className='profileTop'>
                <img src="https://www.joispot.com/assets/img/user.jpg" className='img-circle' alt="some" />
                <div style={{ float: 'left', textAlign: 'start' }}>
                    <h1>{this.props.userInSession.username}</h1>
                    <p>{this.props.userInSession.location.city} <br/> {this.props.userInSession.location.country}</p>
                </div>
            </div> */}


                <div className='profileItems'>
                    {
                        this.props.userInSession.items.length === 0 ? <h1>NO ITEMS YET</h1>
                            :
                            <div className='card items'>
                                {
                                    this.state.items.map((e, i) => {
                                        return (
                                            <div key={i}>
                                                <img className="card-img-top" src={`${e.photo}`} alt="" />
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

export default Profile;