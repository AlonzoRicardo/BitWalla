import React from 'react';
import DetailsService from '../main/DetailsService'


class ProductDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = { item: null };
        this.id = props.match.params.id
        this.service = new DetailsService();
    }

    componentDidMount() {
        this.service.getSingleProduct(this.id)
            .then((res) => {
                this.setState({ item: res });
            })
    }

    render() {
        return (
            <div className='productDetails' >
                {
                    this.state.item !== null &&
                    <div className='card text-left'>
                        <div className='card-body'>
                            <img className="card-img-top" src={`${this.state.item.photo}`} alt="" />
                            <p className='text-right'>{this.state.item.ownerName}</p>
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