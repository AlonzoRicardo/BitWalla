import React, {Component} from 'react';

export default class New extends Component {
    constructor(){
        super()
        this.state = {
            productName: '',
            productDescription: '',
            productPrice: 0,
            photo: '',
            error: ''
        }
    }

    handleSubmit(){
        let { productName, productDescription, productPrice, error} = this.state;
        if(productName === '') return this.setState({error:'Empty product name'});
        if(productDescription === '') return this.setState({error:'Empty product Description'});
        if(productPrice === 0) return this.setState({error:'Empty product Price'});

        console.log("FORM OK");
        this.setState({error: '', productName:'', productDescription:'', productPrice:0});
        this.props.movieReady({productName, productDescription, productPrice});
    }

    render(){
        let { productName, productDescription, productPrice, error} = this.state;
        return (
            <div>
                <p style={{color:"red"}}>{error}</p>
                <label>productName</label>
                <input type="text" value={productName} onChange={(e) => this.setState({productName:e.target.value})} />
                <label>productDescription</label>
                <input type="text" value={productDescription} onChange={(e) => this.setState({productDescription:e.target.value})}/>
                <label>productPrice</label>
                <input type="text" value={productPrice} onChange={(e) => this.setState({productPrice:e.target.value})}/>
                <label>Photo</label>
                <input type="text" value={productPrice} onChange={(e) => this.setState({productPrice:e.target.value})}/>
                <button onClick={this.handleSubmit.bind(this)}>Add movie</button>
            </div>
        )
    }
}