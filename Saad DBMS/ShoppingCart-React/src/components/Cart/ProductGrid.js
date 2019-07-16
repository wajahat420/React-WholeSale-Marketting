import React, { Component } from 'react';
import swal from "sweetalert"
import { Redirect } from 'react-router'
import {connect} from "react-redux";
import axios from "axios"

import '../../css/productGrid.css';
import Product from './Product.js';
import Update from "./update"

// import history from "history"



class ProductGrid extends Component {
	
	state = {
		updateDIV : false,
		itemName : "",
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


	render() {
		
		let update = null
		if(this.state.updateDIV){
			update = <Update name={this.state.itemName} 
						// update={this.state.itemName}
						cancle={() => this.setState({updateDIV : false})}/>
		}
		// this.state = ""		

		// this.props.history.push('/') 
		// return(<Redirect go= "-1" />)

		// return(<Redirect to="/"  />)

		return (
			<div className="product-grid">
				{this.state.redirect}
				{update}
				{ this.props.ProductsDatabase.map((product, key) => {
               		if (product.category === this.props.categoryToFilter || this.props.categoryToFilter === 'all') {
                        return (
							<Product key={key} name={product.name} img={product.img} stock={product.stock} price={product.price}
									category={product.category} deleteItem={() => this.deleteItem(product.name)}
									updateItem ={() => this.setState({updateDIV : true,itemName : product.name})} /> )
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

const mapDispatchToProps = (dispatch) => {
    return {}
};

export default connect(mapStateToProps,mapDispatchToProps)(ProductGrid);
