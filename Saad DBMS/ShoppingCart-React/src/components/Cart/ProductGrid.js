import React, { Component } from 'react';
import '../../css/productGrid.css';

import Product from './Product.js';

import {connect} from "react-redux";
class ProductGrid extends Component {
	
	render() {
		return (
			<div className="product-grid">
				{ this.props.ProductsDatabase.map((product, key) => {
               		if (product.category === this.props.categoryToFilter || this.props.categoryToFilter === 'all') {
                        return (
							<Product key={key} name={product.name} img={product.img} stock={product.stock} price={product.price}
									 category={product.category} /> )
                    }

				})}
			</div>
		)
	}
}
const mapStateToProps = (state) => {
    return {
        ProductsDatabase: state.ProductsDatabase,
		categoryToFilter: state.categoryToFilter
    }
};

// const mapDispatchToProps = (dispatch) => {
//     return {}
// };

export default connect(mapStateToProps)(ProductGrid);
