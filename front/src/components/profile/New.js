import React, { Component } from 'react';
import PhotoService from './PhotoService'

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
        this.service = new PhotoService();
    }

    handleChange(e) {
        console.log('handleChange');
        console.log('DEBUG e.target.files[0]', e.target.files[0]);
        this.setState({
          photo: e.target.files[0]
        })
      }
    
    handleSubmit(e) {
        console.log(this.state);
        e.preventDefault()
        let { productName, productDescription, productPrice, error } = this.state;
        if (productName === '') return this.setState({ error: 'Empty product name' });
        if (productDescription === '') return this.setState({ error: 'Empty product Description' });
        if (productPrice === 0) return this.setState({ error: 'Empty product Price' });
        this.service.addPicture(this.state.photo, productName, productDescription, productPrice)

        this.setState({ error: '', productName: '', productDescription: '', productPrice: 0 });
    }

    render() {
        let { productName, productDescription, productPrice, error } = this.state;
        return (
            <div>
                <form onSubmit={(e)=>this.handleSubmit(e)}>
                    <p style={{ color: "red" }}>{error}</p>
                    <label>productName</label>
                    <input type="text" name='productName' placeholder='Product Name' value={productName} onChange={(e) => this.setState({ productName: e.target.value })} />
                    <label>productDescription</label>
                    <input type="text" name='productDescription' placeholder='Product Description' value={productDescription} onChange={(e) => this.setState({ productDescription: e.target.value })} />
                    <label>productPrice</label>
                    <input type="text" name='productPrice' placeholder='Product Price' value={productPrice} onChange={(e) => this.setState({ productPrice: e.target.value })} />
                    <label>Photo</label>
                    <input type="file" name='photo' placeholder='Product Photo' onChange={(e)=>this.handleChange(e)} />
                    <button onClick={this.handleSubmit.bind(this)}>Submit</button>
                </form>
            </div>
        )
    }
}