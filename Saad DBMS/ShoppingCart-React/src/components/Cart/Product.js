import React, { Component } from 'react';
import sweetAlert from 'sweetalert';
import '../../css/product.css';
import {connect} from "react-redux";

class Product extends Component {
	constructor() {
		super();
		this.state = {
			quantity: 1
		}

		this.handleChange = this.handleChange.bind(this);
		this.isQuantityLessThanStock = this.isQuantityLessThanStock.bind(this);
		this.isOutOfStock = this.isOutOfStock.bind(this);
	}
	handleChange(event) {
    	this.setState({quantity: event.target.value});
  	}

	isQuantityLessThanStock() {
		return this.state.quantity <= this.props.stock;
	}

	isOutOfStock() {
		return this.props.stock <= 0;
	}
    addProductToCart() {
		if (this.state.quantity > this.props.stock) {
			sweetAlert('Error', 'Stock is to small')
		} else if (this.state.quantity <= 0) {
			sweetAlert('Error', 'You cannot choose quantity less than or equal 0')
		} else {
            this.props.addProductToCart({
				img: this.props.img,
                name: this.props.name,
                totalPrice: +this.props.price * +this.state.quantity,
                quantity: this.state.quantity
            });
            this.props.removeQuantity({
			  name: this.props.name,
                quantity: this.state.quantity
            });
		}

        this.setState({
            quantity: 1
        })
	}
	render() {
		return (
			<div className="card-product">
				<div className="card-header">
					<h5 className="prodname"> { this.props.name } </h5>
					<p className="prodprice"> Rs. { this.props.price } /-  </p>
					
				</div>
				<div className="vertpan itemimage">
				<img src={this.props.img} alt={this.props.alt} />
				</div>	
				<div className="card-content">
					<label> Quantity </label>
					<input className="inputtext" onChange={this.handleChange} value={+this.state.quantity} type="number" />
		{/*	<p> Price {this.props.price * this.state.quantity} /- </p> */}
				</div>
				<div className="card-footer">
					<p className="product_stock"> Stock: { this.props.stock } </p>
					<p className="card-footer-item">
						<button onClick={this.addProductToCart.bind(this)} className={"product_add-to- cartbutton is-primary" + (this.isOutOfStock() ? 'button' : 'button is-primary')  + ""}> Add to cart?</button>
					</p>


				</div>
			</div>
			)
	}
}
const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = (dispatch) => {
    return {
        addProductToCart: (newProduct) => dispatch({
            type: 'ADD_PRODUCT_TO_CART',
			productToAdd: newProduct
        }),

		removeQuantity: (productDetails) => dispatch({
			type: 'REMOVE_PRODUCT_QUANTITY',
			productDetails
		})
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);