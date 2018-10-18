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
            rating: 5
        }
        this.username = props.match.params.username
        this.service = new Service()
    }

    getProfile() {
        this.service.getPublicProfile(this.username)
            .then((res) => {
                this.setState({ user: res })
            })
    }

    handleRating(ths, sno) {
        this.setState({ rating: sno })
        for (var k = 1; k <= 5; k++) {
            let cur = document.getElementById("star" + k)
            cur.className = "fa fa-star"
        }

        for (var i = 1; i <= sno; i++) {
            var cur = document.getElementById("star" + i)
            if (cur.className === "fa fa-star") {
                cur.className = "fa fa-star checked"
            }
        }
    }

    componentDidMount() {
        this.getProfile()
    }


    render() {
        return (
            <div className='profileContent'>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                {this.state.user !== null ? <div>
                    <div>

                        <div className="container bootstrap-snippet header-container">
                            <div className="bg-white">
                                <div className="container py-5">
                                    <div className="media col-md-10 col-lg-8 col-xl-7 p-0 my-4 mx-auto">
                                        <img src="https://image.flaticon.com/icons/png/512/559/559378.png" alt='' className="d-block ui-w-100 rounded-circle" />

                                        <div className="media-body ml-5">
                                            <h4 className="font-weight-bold mb-4">{this.state.user.username}</h4>
                                            <div className="text-muted mb-4">
                                                {this.state.user.location.city} <br /> {this.state.user.location.country}
                                            </div>

                                            <div className=''>
                                                <span className="fa fa-star" id="star1" onClick={() => this.handleRating(this, 1)}></span>
                                                <span className="fa fa-star" id="star2" onClick={() => this.handleRating(this, 2)}></span>
                                                <span className="fa fa-star" id="star3" onClick={() => this.handleRating(this, 3)}></span>
                                                <span className="fa fa-star" id="star4" onClick={() => this.handleRating(this, 4)}></span>
                                                <span className="fa fa-star" id="star5" onClick={() => this.handleRating(this, 5)}></span>
                                            </div>

                                            <Link to={'/private/chat/' + this.state.user.username}>Send Message</Link>

                                        </div>
                                    </div>

                                </div>
                                <hr className="m-0" />
                                <ul className="nav nav-tabs tabs-alt justify-content-center">
                                    <li className="nav-item">

                                        <Link to='#' className='nav-link py-4'>Rating: {this.state.rating}/5</Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link to='#' className='nav-link py-4'>Sold: 1</Link>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>



                    <div className='profileItems'>
                        {
                            this.state.user.items.length === 0 ? <h1>NO ITEMS YET</h1>
                                :
                                <div className='card items'>
                                    {
                                        this.state.user.items.map((e, i) => {
                                            return (
                                                <div key={i} id={e._id}>
                                                    <div>
                                                        <img className="card-img-top" src={`${e.photo}`} alt="" />
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
                    :
                    <div>No user yet</div>
                }
            </div>
        );
    }
}

export default PublicProfile;