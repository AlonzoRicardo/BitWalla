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
        console.log(this.props);
        
          /* let filtered = this.props.items.filter(item => {
                return (
                  item.productName.toLowerCase().indexOf(this.state.search) !== -1
                )
              })  */
        
        
        return (

            <div className='profileContent'>
                <input
                    class="input"
                    value={this.state.search.toLowerCase()}
                    onChange={this.updateSearch}
                    type="text"
                    placeholder="Find a Product"
                />
                <div className='profileItems'>
                    <div className='items'>
                        {
                            this.props.items &&
                            this.props.items.map(e => {
                                return (
                                    <div className='card text-left'>
                                        <Link to={`/product/id/` + e._id} key={e._id}><img className="card-img-top" src={`${e.photo}`} alt="" /></Link>
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
            </div>
        );
    }
}

export default MainPage;