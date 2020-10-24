import React, { Component } from 'react';
import {connect} from "react-redux";
import sweetAlert from 'sweetalert';
import axios from "axios"

import '../../css/Cart.css';

class Cart extends Component {
    constructor() {
        super();
        this.orderPrice = this.orderPrice.bind(this);
    }
    orderPrice() {
        // console.log("in order")
        return this.props.cartProducts.reduce((totalPrice, currentProduct) => {
            return totalPrice + currentProduct.totalPrice;
        }, 0);
    }

    toggleCartStatus() {
        this.setState({
            isCartOpened: !this.state.isCartOpened
        })
    }
    confirmOrder(){
        if(!this.props.userLogin){
            sweetAlert('Sorry!!', " Please Login First", 'warning')
        }
        else if(this.props.cartProducts.length === 0){
            sweetAlert('Sorry!!', " You Haven't Buy Anything Please Buy First", 'warning')
        }
        else{
            sweetAlert('Order', 'Thank you for placing your order. We will contact your soon', 'success')
            let totalPrice = this.props.cartProducts.reduce((totalPrice, currentProduct) => {
                return totalPrice + currentProduct.totalPrice;
            }, 0);
            axios.post("/confirmBuying",{
                userEmail : this.props.userEmail,
                buyingList : this.props.cartProducts,
                totalPrice : totalPrice
            })
            .then( res => console.log("send post req"))
            this.props.confirmOrder()
            // console.log("cart-products",this.props.cartProducts)
        }
    }


    render() {
        return (
            <aside className={"cart menu " + (this.props.isCartOpened ? 'cart__is-open' : '')}>
                <div className="cart__title-wrapper">
                    <h3 className="titleis-2"> Your order </h3>
                    <h5 className="tagis-info">
                        Total price: 	Rs.	{ this.orderPrice() } /-
                    </h5>
                </div>

                <table>
                    <thead>
                        <tr className="cart__row">
                            <th>Items</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tfoot></tfoot>
                    <tbody>
                    {this.props.cartProducts.map((product, key) =>
                        <tr className="cart__row" key={key} >
                            <td >{ product.name } </td>
                            <td >{ product.quantity } </td>
                            <td >Rs. { product.totalPrice } /- </td>
                            <td className="" >
								<span className="removebutton">
									Remove
                                <button onClick={this.props.removeProductFromCart.bind(this, key, product.name, product.quantity)} className="delete is-small"></button>
                                </span>
                            </td>
                        </tr>

                    )}
                    </tbody>

                </table>
                <button className="button is-danger cart__order-button" onClick={this.confirmOrder.bind(this)}> Order! </button>

            </aside>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userEmail : state.userEmail,
        userLogin : state.userLogin,
        cartProducts: state.cartProducts,
        isCartOpened: state.isCartOpened
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        removeProductFromCart: (key, productName, productQuantity) => dispatch({
            type: 'REMOVE_PRODUCT_FROM_CART',
            productId: key,
            productName,
            productQuantity
        }),

        confirmOrder: () => {

            dispatch({
                type: 'CONFIRM_ORDER'
            });
            dispatch({
                type: 'TOGGLE_CART_STATUS'
            });
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);