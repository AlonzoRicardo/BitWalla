import React from 'react';
import { Link } from 'react-router-dom';

class MainPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            selected: null,
            search: ''
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
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <button className="btn btn-outline-secondary dropdown-toggle " type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Categories</button>
                        <div className="dropdown-menu ">
                            <p className="dropdown-item" href="#">Chemicals</p>
                            <div role="separator" className="dropdown-divider"></div>
                            <p className="dropdown-item" href="#">Drugs</p>
                            <div role="separator" className="dropdown-divider"></div>
                            <p className="dropdown-item" href="#">Weapons</p>
                            <div role="separator" className="dropdown-divider"></div>
                            <p className="dropdown-item" href="#">Malicious Software</p>
                            <div role="separator" className="dropdown-divider"></div>
                            <p className="dropdown-item" href="#">Services</p>
                            
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
                                    <div className='card text-left' key={e._id}>
                                        <Link to={`/product/id/` + e._id} ><img className="card-img-top" src={`${e.photo}`} alt="" /></Link>
                                        <div className='card-body'>
                                            <p className='text-right'>{e.ownerName}</p>
                                            <h5 className='card-title'>{e.productName}</h5>
                                            <p>{e.productPrice}</p>
                                        </div>
                                        <hr />
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