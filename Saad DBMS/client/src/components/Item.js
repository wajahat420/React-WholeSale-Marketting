import React, { Component } from 'react';
import '../index.css'

import Cart from './Cart/Cart';
import ProductGrid from './Cart/ProductGrid.js';
import FilterTabs from './Cart/FilterTabs.js';
import TitleBar from './Cart/TitleBar.js';

import {connect} from "react-redux";
import axios from 'axios';

class App extends Component {
    constructor() {
        super();

        this.sendToCart = this.sendToCart.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
        this.state = {
            images : [],
            imagesData : [],
            products: []
        }


    }

    gatheringDataWithImg = () => {
        const {images,imagesData} = this.state
        const temp = []
        images.forEach((image) => {
            imagesData.forEach((imagedata)=> {
                if(image.public_id === imagedata.imageID){
                    const completeImgObj = {
                        name : imagedata.name,
                        price : imagedata.price,
                        stock : imagedata.stock,
                        category : imagedata.category,
                        img : image.url,
                        id:image.public_id
                    }
                    temp.push(completeImgObj)
                }
            })
        })
        this.props.imagesData(temp)

    }
    componentDidMount(){
        axios.get("/getImages")
        .then(res=>{

            console.log("images",res.data.images)
            console.log("images.Data",res.data.imagesData)
            const images = []
            res.data.images.forEach((elem) => {
                // console.log("number",1)
                const obj = {
                    public_id : elem.public_id,
                    url : elem.url
                }
                images.push(obj)
            })
            this.setState({images : images,imagesData : res.data.imagesData },()=>{
                this.gatheringDataWithImg()
            })
            // console.log("kk")
        })
        .catch(err => console.log("error",err))
    }

    sendToCart(newProduct) {
        this.setState({
            products: [...this.state.products, newProduct]
        })
    }
    applyFilter(category) {
        this.setState({
                ...this.state,
            productsToFilter: category
        })
    }
    deleteProduct(productToDelete) {
        console.log(`product to delete is ${productToDelete}`);
        console.log(productToDelete);
        this.setState({
            ...this.state,
            products: this.state.products.filter((singleProduct, key) => {
                return key !== productToDelete.productKey;
            })
        })
    }
      render() {
        return (
                <div className="container">
                            <TitleBar title="E - Dealers | Items"></TitleBar>
                            <FilterTabs />
                            <div className="app-container container">
                                <div className="inner-container">
                                <ProductGrid filterProducts={this.state.productsToFilter} onAddToCart={this.sendToCart}
                                            ProductsDatabase={this.props.ProductsDatabase} categoryToFilter={this.props.categoryToFilter}/>
                                </div>

                                <Cart />
                            </div>
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
    return {
        imagesData : (arr)  => {
            dispatch({
                type : "IMAGES_DATA",
                imagesArr : arr
            }) 
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

