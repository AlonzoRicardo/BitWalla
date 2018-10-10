import React from 'react';
import PhotoService from './PhotoService'

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
        })
    }



render() {
    return (
        <div className='profileContent'>
            <div className='profileTop'>
                <img src="https://www.joispot.com/assets/img/user.jpg" className='img-circle' alt="some" />
                <div style={{ float: 'left', textAlign: 'start' }}>
                    <h1>{this.props.userInSession.username}</h1>
                    <p>kokoland</p>
                </div>
            </div>

            <hr />

            <div className='profileItems'>
                {
                    this.props.userInSession.items.length === 0 ? <h1>NO ITEMS YET</h1>
                        :
                        <div className='card items'>
                            {
                                this.state.items.map(e => { 
                                    return (
                                    <div>
                                        <img className="card-img-top" src={`${e.photo}`} alt=""/>
                                        <p>{e.productName}</p>
                                        <p>{e.productDescription}</p>
                                        <p>{e.productPrice}</p>
                                        <hr/>
                                    </div>
                                    )})
                            }
                        </div>
                }
            </div>
        </div>
    );
}
}

export default Profile;