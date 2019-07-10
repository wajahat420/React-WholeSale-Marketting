/**
 * Created by lenovo on 2017-06-23.
 */
import React from 'react';
import {connect} from 'react-redux';
import '../../css/Cart.css';
class CartButton extends React.Component {
    render() {
        return (
            <button onClick={this.props.toggleCartStatus.bind(this)} className="cart-switcher">
                {this.props.isCartOpened ? 'Close' : 'Cart'}
            </button>
        )
    }

};

const mapStateToProps = (state) => {
    return {
        isCartOpened: state.isCartOpened
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleCartStatus: () => dispatch({
            type: 'TOGGLE_CART_STATUS'
    })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CartButton);