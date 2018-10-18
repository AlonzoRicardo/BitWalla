import React from 'react';
import { Link } from 'react-router-dom';
import './main.scss'

class MainPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            selected: null,
            search: '',
            btc_usd: 0,
        }
        
    }

    updateSearch = event => {
        return this.setState({ search: event.target.value });
    };


    render() {        
        let filtered = this.props.items && this.props.items.filter(item => {
            return (
                item.productName.toLowerCase().indexOf(this.state.search) !== -1
            )
        })

        
        return (
            <div className='profileContent'>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <button className="btn btn-outline-secondary dropdown-toggle " type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Categories</button>
                        <div className="dropdown-menu ">
                            <p className="dropdown-item" href="#">Electronics</p>
                            <div role="separator" className="dropdown-divider"></div>
                            <p className="dropdown-item" href="#">Furniture</p>
                            <div role="separator" className="dropdown-divider"></div>
                            <p className="dropdown-item" href="#">Clothing</p>
                            <div role="separator" className="dropdown-divider"></div>
                            <p className="dropdown-item" href="#">Art</p>
                            <div role="separator" className="dropdown-divider"></div>
                            <p className="dropdown-item" href="#">Home</p>
                            
                        </div>
                    </div>
                    <input type="text" className="form-control" value={this.state.search.toLowerCase()}
                    onChange={this.updateSearch} aria-label="Text input with dropdown button" />
                </div>


                <div className='profileItems'>
                    <div className='items'>
                        {
                            this.props.items &&
                            filtered.map(e => {
                                return (
                                    <div className='card text-left mainProductsCard' key={e._id}>
                                        <Link to={`/product/id/` + e._id} ><img className="card-img-top prod-img frame" src={`${e.photo}`} alt="" /></Link>
                                        <div className='card-body'>
                                            <Link to={`/public/profile/${e.ownerName}`}> <p className='text-right'>{e.ownerName}</p> </Link> 
                                            <h5 className='card-title'>{e.productName}</h5>
                                            <p>€uro: {e.productPrice}</p>
                                            <p>Ƀitcoin: {e.productPrice / this.props.btcPrice}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                </div>
            </div>);
    }
}

export default MainPage;