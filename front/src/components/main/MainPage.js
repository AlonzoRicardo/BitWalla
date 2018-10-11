import React from 'react';
import PhotoService from '../profile/PhotoService'

class MainPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: []
        }
        this.photoService = new PhotoService()
    }

    componentDidMount() {
        this.photoService.getAllProducts()
            .then((res) => {
                console.log(res, 'here');
                this.setState({ items: res })
            })
            
    }

    render() {
        return (
            <div className='profileContent'>
                <div className='profileItems'>
                    <div className='items'>
                        {
                            this.state.items.map(e => {
                                return (
                                    <div className='card text-left'>
                                        <img className="card-img-top" src={`${e.photo}`} alt="" />
                                        <div className='card-body'>
                                            <h5 className='card-title'>{e.productName}</h5>
                                            <p className='card-text'>{e.productDescription}</p>
                                            <p>{e.productPrice}</p>
                                            <p>{e.ownerName}</p>
                                        </div>
                                        <hr />
                                    </div>
                                )
                            })
                        }
                    </div>

                </div>
            </div>
        );
    }
}

export default MainPage;