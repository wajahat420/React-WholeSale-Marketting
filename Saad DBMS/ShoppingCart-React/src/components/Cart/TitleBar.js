/**
 * Created by lenovo on 2017-06-23.
 */
import React from 'react';
import CartButton from './CartButton.js';
import '../../css/TitleBar.css';
const TitleBar = (props) => {
    return (
        <div className="title-bar-wrapper">
            <h1 style={{marginTop: 45}} className="title1">
                {props.title}
            </h1>
            <CartButton/>
        </div>

    );
};

export default TitleBar