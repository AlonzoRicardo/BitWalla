import React from 'react';
import DetailsService from '../main/DetailsService'
import { Link } from 'react-router-dom'

class ProductDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = { item: null };
        this.id = props.match.params.id
        this.service = new DetailsService();
    }

   

    handleItem() {
        this.service.getSingleProduct(this.id)
            .then((res) => {
                this.setState({ item: res });
            })
    }

    componentDidMount() {
        this.handleItem()
    }

    render() {
        return (
            <div className='productDetails' >
                {
                    this.state.item !== null &&
                    <div className='card text-left'>
                        <div className='card-body'>
                            
                            <img className="card-img-top" src={`${this.state.item.photo}`} alt="" />
                            <p className='text-right'><Link to={`/main`}> Contact {this.state.item.ownerName}</Link></p>
                            <h5 className='card-title'>{this.state.item.productName}</h5>
                            <p className='card-text'>{this.state.item.productDescription}</p>
                            <p>{this.state.item.productPrice}</p>

                        </div>
                        <hr />
                    </div>
                }

            </div>
        )

    }
}

export default ProductDetail;