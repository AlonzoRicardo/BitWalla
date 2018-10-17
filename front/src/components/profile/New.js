import React, { Component } from 'react';
import Services from './Services'
import './new.scss'

export default class New extends Component {
    constructor() {
        super()
        this.state = {
            productName: '',
            productDescription: '',
            productPrice: 0,
            photo: null,
            error: ''
        }
        this.service = new Services();
    }

    handleChange(e) {
        this.setState({
            photo: e.target.files[0]
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        let { productName, productDescription, productPrice } = this.state;
        if (productName === '') return this.setState({ error: 'Empty product name' });
        if (productDescription === '') return this.setState({ error: 'Empty product Description' });
        if (productPrice === 0) return this.setState({ error: 'Empty product Price' });
        this.service.addPicture(this.state.photo, productName, productDescription, productPrice)

        this.setState({ error: '', productName: '', productDescription: '', productPrice: 0 });
    }

    render() {
        let { productName, productDescription, productPrice } = this.state;
        return (
            <div className='container b'>
                <form onSubmit={(e) => this.handleSubmit(e)}>

                    <div className="form-group">
                        <label>Product Name</label>
                        <input type="text" name="productName" className="form-control" id="" aria-describedby="emailHelp" placeholder="Enter product name" value={productName} onChange={(e) => this.setState({ productName: e.target.value })} />
                    </div>

                    <div className="form-group">
                        <label>Product Description</label>
                        <input type="text" name='productDescription' className="form-control" id="" placeholder="Enter product description" value={productDescription} onChange={(e) => this.setState({ productDescription: e.target.value })} />
                    </div>

                    <div className="form-group">
                        <label>Product Price</label>
                        <input type="text" name='productPrice' className="form-control" id="" placeholder="Enter product price" value={productPrice} onChange={(e) => this.setState({ productPrice: e.target.value })} />
                    </div>




                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle a" style={{float: 'left'}} type="button" id="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Category
                            </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <p className="dropdown-item">something</p>
                            <p className="dropdown-item">something</p>
                            <p className="dropdown-item">something</p>
                            <p className="dropdown-item">something</p>
                            <p className="dropdown-item">something</p>
                            <p className="dropdown-item">something</p>
                            <p className="dropdown-item">something</p>
                        </div>
                    <div className='form-group a' style={{float: 'left'}}>
                        <label className="btn btn-primary">
                            Browse&hellip; <input type="file" name='photo' className="" style={{ display: 'none' }} placeholder='Product Photo' onChange={(e) => this.handleChange(e)} />
                        </label>
                    </div>
                        <button type="submit"  onClick={this.handleSubmit.bind(this)} className="btn btn-primary a" style={{float: 'left'}}>Submit</button>
                    </div>

                </form>
            </div>
        )
    }
}