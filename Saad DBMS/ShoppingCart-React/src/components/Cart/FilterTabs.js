import React from 'react';
// import ProductDatabase from '../../store/ProductsDatabase';
import {connect} from "react-redux";

class FilterTabs extends React.Component{
    constructor  (props)  {
        super(props);

        let categories = this.props.ProductsDatabase.map(singleProduct => {
            return singleProduct.category;
        });
        // console.log("category",categories)
        this.state = {
            categories: Array.from(new Set(categories))
        }
    }

 
    componentDidUpdate = () => {
        let categories = this.props.ProductsDatabase.map(singleProduct => {
            return singleProduct.category;
        });
        // console.log("should",categories)
        if(this.state.categories.length !== categories.length){
            this.setState({categories : Array.from(new Set(categories))})
        }
        // console.log("did update",this.props.ProductsDatabase)
    }
    
    render() {

        // console.log("categories",this.state.categories)

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
        ProductsDatabase : state.ProductsDatabase ,
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