import React from 'react';
import ProductDatabase from '../../store/ProductsDatabase';
import {connect} from "react-redux";

class FilterTabs extends React.Component{
    constructor() {
        super();
        let categories = ProductDatabase.map(singleProduct => {
            return singleProduct.category;
        });
        this.state = {
            categories: Array.from(new Set(categories))
        }
    }
    render() {
        return (
            <div className="tabs">
                <ul>

                    <li className={this.props.activeCategory === 'all' ? 'is-active' : ''}><a onClick={this.props.filterProductByCategory.bind(this, 'all')} href='#all'> All Items</a></li>
                    {this.state.categories.map(singleCategory =>
                        <li key={parseInt(Math.random() * 1000)} className={this.props.activeCategory === singleCategory ? 'is-active' : ''}>
                            <a onClick={this.props.filterProductByCategory.bind(this, singleCategory)} href={'#' + singleCategory}> {singleCategory} </a>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        activeCategory: state.categoryToFilter
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        filterProductByCategory: (category) => dispatch({
            type: 'FILTER_PRODUCTS_BY_CATEGORY',
            category
        })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterTabs);