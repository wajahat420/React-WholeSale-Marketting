import React, { Component } from 'react';
import swal from "sweetalert"
import { Redirect } from 'react-router'
import {connect} from "react-redux";
import axios from "axios"

import '../../css/productGrid.css';
import Product from './Product.js';

// import history from "history"



class ProductGrid extends Component {
	
	state = {
		redirect : ""
	}

	deleteItem = (itemName) => {
		swal({
            title: "Confirm Deletion ??",
            text: "Your will not be able to recover this imaginary Item!!",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Yes",
            closeOnConfirm: true
          },
          function(){
                // console.log("this",this)
				axios.post("/deleteItem",{
					name : itemName
				})
				.then(res=>{
					console.log("delete res",res.data)
					if(res.data){
						this.setState({redirect : <Redirect to="/"  />})
					}else{
						swal("Item not Deleted!","Try Again","error")
					}
					
				})

            
        }.bind(this));
		console.log("name",itemName)
	}
	updateItem = (itemName) => {
		console.log("name",itemName)
	}

	render() {
		// this.state = ""		

		// this.props.history.push('/') 
		// return(<Redirect go= "-1" />)

		// return(<Redirect to="/"  />)

		return (
			<div className="product-grid">
				{this.state.redirect}
				{ this.props.ProductsDatabase.map((product, key) => {
               		if (product.category === this.props.categoryToFilter || this.props.categoryToFilter === 'all') {
                        return (
							<Product key={key} name={product.name} img={product.img} stock={product.stock} price={product.price}
									category={product.category} deleteItem={() => this.deleteItem(product.name)}
									updateItem ={() => this.updateItem(product.name)} /> )
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
